// DOM Elements
const menu = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");
const searchForm = document.querySelector(".search-box-container");
const searchBox = document.querySelector("#search-box");
const cartIcon = document.querySelector("#cart-icon");
const cartSidebar = document.querySelector("#cart-sidebar");
const closeCart = document.querySelector("#close-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector(".cart-count");
const likedIcon = document.querySelector("#liked-icon");
const likedSidebar = document.querySelector("#liked-sidebar");
const closeLiked = document.querySelector("#close-liked");
const likedItemsContainer = document.querySelector("#liked-items");
const likedTotal = document.querySelector("#liked-total");
const likedCount = document.querySelector(".header .icons .liked-count");

// Check if essential elements exist
if (!cartItems || !cartTotal || !cartCount) {
  console.warn(
    "Some cart elements not found. Cart functionality may not work properly."
  );
}

// Shopping Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Liked Items Data
let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateCartUI();
  updateLikedUI();
  initializeEventListeners();
  loadProducts();
});

// Event Listeners
function initializeEventListeners() {
  // Mobile menu toggle
  if (menu) {
    menu.onclick = () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
    };
  }

  // Close mobile menu on scroll
  window.onscroll = () => {
    if (menu) {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
    }
  };

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Shop Now button functionality
  document.querySelectorAll(".shop-now-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");

      // Scroll to products section
      const productSection = document.querySelector("#product");
      if (productSection) {
        productSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add a subtle highlight effect to the products section
        productSection.style.boxShadow = "0 0 20px rgba(46, 204, 113, 0.3)";
        setTimeout(() => {
          productSection.style.boxShadow = "";
        }, 2000);
      }

      // Optional: Show a toast notification
      showToast(`Browsing ${category} products!`);
    });
  });

  // Search functionality
  const searchBar = document.querySelector("#search-bar");
  const closeIcon = document.querySelector("#close-icon");

  if (searchBar) {
    searchBar.onclick = () => {
      if (searchForm) {
        searchForm.classList.toggle("active");
        if (searchBox) searchBox.focus();
      }
    };
  }

  if (closeIcon) {
    closeIcon.onclick = () => {
      if (searchForm) {
        searchForm.classList.toggle("active");
      }
    };
  }

  // Simple search functionality
  if (searchBox) {
    searchBox.addEventListener("input", handleSimpleSearch);
  }

  // Cart functionality
  if (cartIcon) {
    cartIcon.onclick = (e) => {
      e.preventDefault();
      if (cartSidebar) {
        cartSidebar.classList.add("active");
      }
    };
  }

  if (closeCart) {
    closeCart.onclick = () => {
      if (cartSidebar) {
        cartSidebar.classList.remove("active");
      }
    };
  }

  // Liked items functionality
  if (likedIcon) {
    likedIcon.onclick = (e) => {
      e.preventDefault();
      if (likedSidebar) {
        likedSidebar.classList.add("active");
      }
    };
  }

  if (closeLiked) {
    closeLiked.onclick = () => {
      if (likedSidebar) {
        likedSidebar.classList.remove("active");
      }
    };
  }

  // Close cart and liked sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (cartSidebar && cartIcon) {
      if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove("active");
      }
    }
    if (likedSidebar && likedIcon) {
      if (!likedSidebar.contains(e.target) && !likedIcon.contains(e.target)) {
        likedSidebar.classList.remove("active");
      }
    }
  });

  // Checkout button functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkout-btn")) {
      e.preventDefault();
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
      }
      window.location.href = "checkout.html";
    }
  });

  // Add to cart buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      addToCart(e.target);
    }
  });

  // Like button functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-heart") && !e.target.id) {
      e.preventDefault();
      toggleLike(e.target);
    }
  });

  // Share button functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-share")) {
      e.preventDefault();
      shareProduct(e.target);
    }
  });

  // Preview button functionality
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-eye")) {
      e.preventDefault();
      previewProduct(e.target);
    }
  });

  // Prevent default for other icon links
  document.querySelectorAll(".icons a").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      if (!icon.classList.contains("add-to-cart")) {
        e.preventDefault();
      }
    });
  });
}

// Shopping Cart Functions
function addToCart(button) {
  const productBox = button.closest(".box");
  if (!productBox) {
    console.warn("Product box not found for add to cart button");
    return;
  }

  const productNameElement = productBox.querySelector("h3");
  const imageElement = productBox.querySelector("img");
  const quantityInput = productBox.querySelector('input[type="number"]');

  if (!productNameElement || !imageElement || !quantityInput) {
    console.warn("Required product elements not found for adding to cart");
    return;
  }

  const productName = productNameElement.textContent;
  const productPrice = parseFloat(button.dataset.price) || 0;
  const productImage = imageElement.src;
  const quantity = parseInt(quantityInput.value) || 1;

  const existingItem = cart.find((item) => item.name === productName);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: quantity,
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${productName} added to cart!`);

  // Add animation to button
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 150);
}

// Like button functionality
function toggleLike(heartIcon) {
  const productBox = heartIcon.closest(".box");
  if (!productBox) {
    console.warn("Product box not found for heart icon");
    return;
  }

  const productNameElement = productBox.querySelector("h3");
  const priceElement = productBox.querySelector(".price");
  const imageElement = productBox.querySelector("img");

  if (!productNameElement || !priceElement || !imageElement) {
    console.warn("Required product elements not found");
    return;
  }

  const productName = productNameElement.textContent;
  const priceMatch = priceElement.textContent.match(/\d+/);
  const productPrice = priceMatch ? parseFloat(priceMatch[0]) : 0;
  const productImage = imageElement.src;

  if (heartIcon.classList.contains("liked")) {
    // Remove from liked items
    heartIcon.classList.remove("liked");
    heartIcon.style.color = "";
    removeFromLiked(productName);
    showToast(`${productName} removed from favorites!`);
  } else {
    // Add to liked items
    heartIcon.classList.add("liked");
    heartIcon.style.color = "#e74c3c";
    addToLiked({
      name: productName,
      price: productPrice,
      image: productImage,
    });
    showToast(`${productName} added to favorites!`);
  }
}

// Share button functionality
function shareProduct(shareIcon) {
  const productBox = shareIcon.closest(".box");
  if (!productBox) {
    console.warn("Product box not found for share icon");
    return;
  }

  const productNameElement = productBox.querySelector("h3");
  const priceElement = productBox.querySelector(".price");
  const imageElement = productBox.querySelector("img");

  if (!productNameElement || !priceElement || !imageElement) {
    console.warn("Required product elements not found for sharing");
    return;
  }

  const productName = productNameElement.textContent;
  const productPrice = priceElement.textContent;
  const productImage = imageElement.src;

  const shareData = {
    title: `${productName} - eDairy`,
    text: `Check out this amazing product: ${productName} for ${productPrice}`,
    url: window.location.href,
  };

  if (navigator.share) {
    // Use native share API if available
    navigator
      .share(shareData)
      .then(() => {
        showToast(`${productName} shared successfully!`);
      })
      .catch((error) => {
        console.log("Error sharing:", error);
        fallbackShare(productName, productPrice);
      });
  } else {
    // Fallback for browsers that don't support native share
    fallbackShare(productName, productPrice);
  }
}

// Fallback share function
function fallbackShare(productName, productPrice) {
  const shareText = `Check out this amazing product: ${productName} for ${productPrice} at eDairy!`;
  const shareUrl = window.location.href;

  // Create a temporary textarea to copy the share text
  const textarea = document.createElement("textarea");
  textarea.value = `${shareText}\n${shareUrl}`;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showToast(`${productName} link copied to clipboard!`);
}

// Preview button functionality
function previewProduct(previewIcon) {
  const productBox = previewIcon.closest(".box");
  if (!productBox) {
    console.warn("Product box not found for preview icon");
    return;
  }

  const productNameElement = productBox.querySelector("h3");
  const priceElement = productBox.querySelector(".price");
  const imageElement = productBox.querySelector("img");
  const starsElement = productBox.querySelector(".stars");

  if (!productNameElement || !priceElement || !imageElement || !starsElement) {
    console.warn("Required product elements not found for preview");
    return;
  }

  const productName = productNameElement.textContent;
  const productPrice = priceElement.textContent;
  const productImage = imageElement.src;
  const productStars = starsElement.innerHTML;
  const productDiscount =
    productBox.querySelector(".discount")?.textContent || "";

  // Create modal for product preview
  createProductModal({
    name: productName,
    price: productPrice,
    image: productImage,
    stars: productStars,
    discount: productDiscount,
  });
}

// Create product preview modal
function createProductModal(product) {
  // Remove existing modal if any
  const existingModal = document.querySelector(".product-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Parse the price to extract current price and MRP
  const priceMatch = product.price.match(/₹(\d+)\s*<span>₹(\d+)<\/span>/);
  const currentPrice = priceMatch
    ? priceMatch[1]
    : product.price.match(/\d+/)[0];
  const mrpPrice = priceMatch ? priceMatch[2] : null;

  const modal = document.createElement("div");
  modal.className = "product-modal";
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
            ${
              product.discount
                ? `<div class="modal-discount">${product.discount}</div>`
                : ""
            }
          </div>
          <div class="modal-info">
            <h2>${product.name}</h2>
            <div class="modal-stars">${product.stars}</div>
            <div class="modal-price">
              ₹${currentPrice}${mrpPrice ? ` <span>₹${mrpPrice}</span>` : ""}
            </div>
            <p class="modal-description">
              Fresh and pure dairy product, carefully selected for quality and taste. 
              Perfect for your daily needs and family consumption.
            </p>
            <div class="modal-actions">
              <button class="btn add-to-cart" data-product="${product.name
                .toLowerCase()
                .replace(/\s+/g, "-")}" data-price="${currentPrice}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button class="btn btn-secondary modal-share-btn" data-product-name="${
                product.name
              }" data-product-price="₹${currentPrice}">
                <i class="fas fa-share"></i> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add modal styles
  if (!document.querySelector("#modal-styles")) {
    const style = document.createElement("style");
    style.id = "modal-styles";
    style.textContent = `
      .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display:flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-content {
        position: relative;
        background: #fff;
        border-radius: 1rem;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
      }
      
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #e74c3c;
        color: #fff;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 2rem;
        cursor: pointer;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-close:hover {
        background: #c0392b;
        transform: scale(1.1);
      }
      
      .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
      }
      
      .modal-image {
        position: relative;
      }
      
      .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 1rem;
      }
      
      .modal-discount {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: linear-gradient(135deg, #f39c12, #e67e22);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 1.4rem;
      }
      
      .modal-info h2 {
        font-size: 2.5rem;
        color: var(--black);
        margin-bottom: 1rem;
      }
      
      .modal-stars {
        margin-bottom: 1rem;
      }
      
      .modal-stars i {
        color: #ffd700;
        font-size: 1.6rem;
        margin-right: 0.2rem;
      }
      
      .modal-price {
        font-size: 2.5rem;
        color: var(--green);
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      
      .modal-price span {
        font-size: 1.8rem;
        color: #999;
        text-decoration: line-through;
        margin-left: 0.5rem;
      }
      
      .modal-description {
        font-size: 1.6rem;
        color: #666;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      
      .modal-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      .modal-actions .btn {
        flex: 1;
        min-width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
      
      .btn-secondary {
        background: #6c757d;
        color: #fff;
      }
      
      .btn-secondary:hover {
        background: #5a6268;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .modal-body {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .modal-content {
          width: 95%;
          margin: 1rem;
        }
        
        .modal-actions {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Close modal functionality
  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector(".modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      modal.remove();
    }
  });

  // Handle add to cart in modal
  modal.querySelector(".add-to-cart").addEventListener("click", (e) => {
    e.preventDefault();
    const productName = product.name;
    const productPrice = parseFloat(product.price.match(/\d+/)[0]);
    const productImage = product.image;
    const quantity = 1; // Default quantity for modal

    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,
      });
    }

    saveCart();
    updateCartUI();
    showToast(`${productName} added to cart!`);
    modal.remove();

    // Add animation to button
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 150);
  });

  // Handle share in modal
  modal.querySelector(".modal-share-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const productName = e.target.dataset.productName;
    const productPrice = e.target.dataset.productPrice;

    const shareData = {
      title: `${productName} - eDairy`,
      text: `Check out this amazing product: ${productName} for ${productPrice}`,
      url: window.location.href,
    };

    if (navigator.share) {
      // Use native share API if available
      navigator
        .share(shareData)
        .then(() => {
          showToast(`${productName} shared successfully!`);
        })
        .catch((error) => {
          console.log("Error sharing:", error);
          fallbackShare(productName, productPrice);
        });
    } else {
      // Fallback for browsers that don't support native share
      fallbackShare(productName, productPrice);
    }
  });
}

// Make removeFromCart globally accessible
window.removeFromCart = function (index, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart");
};

// Make updateQuantity globally accessible
window.updateQuantity = function (index, change, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    saveCart();
    updateCartUI();
  }
};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Liked Items Functions
function addToLiked(item) {
  const existingItem = likedItems.find(
    (likedItem) => likedItem.name === item.name
  );

  if (!existingItem) {
    likedItems.push(item);
    saveLikedItems();
    updateLikedUI();
  }
}

function removeFromLiked(productName) {
  likedItems = likedItems.filter((item) => item.name !== productName);
  saveLikedItems();
  updateLikedUI();
}

function saveLikedItems() {
  localStorage.setItem("likedItems", JSON.stringify(likedItems));
}

function updateLikedUI() {
  // Update liked count in header
  if (likedCount) {
    likedCount.textContent = likedItems.length;
  }

  // Update liked items display
  if (likedItemsContainer) {
    if (likedItems.length === 0) {
      likedItemsContainer.innerHTML = `
        <div class="empty-liked">
          <i class="fas fa-heart"></i>
          <p>No favorites yet</p>
        </div>
      `;
    } else {
      likedItemsContainer.innerHTML = likedItems
        .map(
          (item, index) => `
        <div class="liked-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="liked-item-info">
            <h4>${item.name}</h4>
            <div class="price">₹${item.price}</div>
          </div>
          <div class="liked-item-actions">
            <button class="add-to-cart-btn" onclick="addLikedToCart(${index})">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button class="remove-liked-btn" onclick="removeFromLiked('${item.name}')">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  // Update liked total
  if (likedTotal) {
    likedTotal.textContent = likedItems.length;
  }
}

// Make functions globally accessible
window.addLikedToCart = function (index) {
  const item = likedItems[index];
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${item.name} added to cart!`);
};

window.removeFromLiked = function (productName) {
  likedItems = likedItems.filter((item) => item.name !== productName);
  saveLikedItems();
  updateLikedUI();

  // Update heart icon state
  const heartIcons = document.querySelectorAll(".fa-heart");
  heartIcons.forEach((icon) => {
    const productBox = icon.closest(".box");
    if (
      productBox &&
      productBox.querySelector("h3").textContent === productName
    ) {
      icon.classList.remove("liked");
      icon.style.color = "";
    }
  });

  showToast(`${productName} removed from favorites!`);
};

// Clear all liked items
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-liked-btn")) {
    e.preventDefault();
    likedItems = [];
    saveLikedItems();
    updateLikedUI();

    // Update all heart icons
    const heartIcons = document.querySelectorAll(".fa-heart");
    heartIcons.forEach((icon) => {
      icon.classList.remove("liked");
      icon.style.color = "";
    });

    showToast("All favorites cleared!");
  }
});

function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  // Update cart items display
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart
        .map(
          (item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="price">₹${item.price}</div>
          </div>
          <div class="cart-item-controls">
            <button onclick="updateQuantity(${index}, -1, event)" title="Decrease quantity">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1, event)" title="Increase quantity">+</button>
            <button onclick="removeFromCart(${index}, event)" class="remove-btn" title="Remove item">×</button>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  // Update cart total
  if (cartTotal) {
    if (cart.length === 0) {
      cartTotal.textContent = "0";
    } else {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      cartTotal.textContent = total.toFixed(0);
    }
  }
}

// Simple Search Functionality
function handleSimpleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const products = document.querySelectorAll(".product .box");

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      product.style.display = "block";
      product.style.animation = "fadeInUp 0.5s ease-out";
    } else {
      product.style.display = "none";
    }
  });
}

// Product Filtering - Make globally accessible
window.filterProducts = function (category) {
  const products = document.querySelectorAll(".product .box");

  products.forEach((product) => {
    if (category === "all") {
      product.style.display = "block";
    } else {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      if (productName.includes(category)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  });
};

// Toast Notifications
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Product Data (in a real app, this would come from an API)
const products = [
  {
    name: "Fresh Cheese",
    price: 450,
    category: "cheese",
    image: "images/product-1.jpg",
  },
  {
    name: "Pure Butter",
    price: 320,
    category: "butter",
    image: "images/product-2.jpg",
  },
  {
    name: "Organic Milk",
    price: 60,
    category: "milk",
    image: "images/product-3.jpg",
  },
  {
    name: "Almond Milk",
    price: 120,
    category: "milk",
    image: "images/product-4.jpg",
  },
  {
    name: "Fresh Curd",
    price: 40,
    category: "curd",
    image: "images/product-5.jpg",
  },
  {
    name: "Pure Ghee",
    price: 700,
    category: "ghee",
    image: "images/product-6.jpg",
  },
];

function loadProducts() {
  // This function can be used to dynamically load products
  // For now, products are already in the HTML
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    // Only process valid hrefs that are not just "#"
    if (href && href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add loading states to buttons
function addLoadingState(button) {
  const originalText = button.textContent;
  button.innerHTML = '<span class="loading"></span> Loading...';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
}

// Initialize animations on scroll
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out";
      }
    });
  });

  document.querySelectorAll(".box").forEach((box) => {
    observer.observe(box);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Active menu highlighting based on scroll position
function updateActiveMenu() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Update active menu on scroll
window.addEventListener("scroll", updateActiveMenu);

// Set home as active by default
document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.querySelector('.navbar a[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }
});

// Testimonials functionality
let currentTestimonial = 0;
let testimonials = [];

function initTestimonials() {
  testimonials = document.querySelectorAll(".testimonial-slide");
  if (testimonials.length > 0) {
    // Set first testimonial as active
    testimonials[0].classList.add("active");
  }
}

// Make changeTestimonial globally accessible
window.changeTestimonial = function (direction) {
  if (testimonials.length === 0) return;

  testimonials[currentTestimonial].classList.remove("active");
  currentTestimonial += direction;

  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0;
  } else if (currentTestimonial < 0) {
    currentTestimonial = testimonials.length - 1;
  }

  testimonials[currentTestimonial].classList.add("active");
};

// Auto-rotate testimonials
let testimonialInterval;
function startTestimonialRotation() {
  if (testimonials.length > 1) {
    testimonialInterval = setInterval(() => {
      changeTestimonial(1);
    }, 5000);
  }
}

// Initialize testimonials when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initTestimonials();
  startTestimonialRotation();
});

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "var(--accent)";
      isValid = false;
    } else {
      input.style.borderColor = "var(--light-gray)";
    }
  });

  return isValid;
}

// Add form validation to contact form
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(this)) {
        showToast(
          "Thank you for your message! We'll get back to you soon.",
          "success"
        );
        this.reset();
      } else {
        showToast("Please fill in all required fields.", "error");
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        showToast("Thank you for subscribing to our newsletter!", "success");
        this.reset();
      }
    });
  }
});

// Add smooth reveal animations
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".box, .testimonial-slide, .category .box"
  );

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Add CSS for reveal animation
const style = document.createElement("style");
style.textContent = `
  .box, .testimonial-slide, .category .box {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  
  .box.revealed, .testimonial-slide.revealed, .category .box.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
