// Checkout Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Load cart items from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display cart items in order summary
  displayOrderItems(cart);

  // Calculate and display totals
  calculateTotals(cart);

  // Handle payment method changes
  handlePaymentMethodChange();

  // Handle form submission
  handleFormSubmission();

  // Update cart count in header
  updateCartCount();
});

function displayOrderItems(cart) {
  const orderItemsContainer = document.getElementById("order-items");

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #666;">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>Your cart is empty</p>
        <a href="index.html" class="btn" style="margin-top: 1rem;">Continue Shopping</a>
      </div>
    `;
    return;
  }

  orderItemsContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="order-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="order-item-info">
        <h4>${item.name}</h4>
        <div class="price">₹${item.price}</div>
      </div>
      <div class="order-item-quantity">Qty: ${item.quantity}</div>
    </div>
  `
    )
    .join("");
}

function calculateTotals(cart) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  document.getElementById("subtotal").textContent = `₹${subtotal}`;
  document.getElementById("delivery").textContent =
    delivery === 0 ? "Free" : `₹${delivery}`;
  document.getElementById("tax").textContent = `₹${tax}`;
  document.getElementById("total").textContent = `₹${total}`;
}

function handlePaymentMethodChange() {
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const cardDetails = document.getElementById("card-details");

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (this.value === "card") {
        cardDetails.style.display = "block";
      } else {
        cardDetails.style.display = "none";
      }
    });
  });
}

function handleFormSubmission() {
  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
      return; // validateForm now shows specific error messages
    }

    // Show loading state
    const submitBtn = form.querySelector(".checkout-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
    submitBtn.disabled = true;

    // Simulate processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem("cart");

      // Show success message with order details
      const orderTotal = document.getElementById("total").textContent;
      showToast(
        `🎉 Order placed successfully! Total: ${orderTotal}. Thank you for your purchase!`,
        "success"
      );

      // Reset form
      form.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show order confirmation
      setTimeout(() => {
        showToast(
          "📧 Order confirmation will be sent to your email shortly!",
          "success"
        );
      }, 1000);

      // Redirect to home page after 5 seconds
      setTimeout(() => {
        window.location.href = "index.html";
      }, 5000);
    }, 2000);
  });
}

function validateForm(data) {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "zip",
  ];

  // Check required fields
  for (let field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
      showToast(`Please fill in ${fieldName}`, "error");

      // Highlight the field with error
      const fieldElement = document.getElementById(field);
      if (fieldElement) {
        fieldElement.style.borderColor = "#e74c3c";
        fieldElement.focus();
        setTimeout(() => {
          fieldElement.style.borderColor = "#eee";
        }, 3000);
      }
      return false;
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showToast("Please enter a valid email address", "error");
    return false;
  }

  // Validate phone format (more flexible)
  const phoneRegex = /^[0-9]{10,12}$/;
  if (!phoneRegex.test(data.phone.replace(/\D/g, ""))) {
    showToast("Please enter a valid phone number (10-12 digits)", "error");
    return false;
  }

  // If card payment is selected, validate card details
  if (data.payment === "card") {
    const cardNumber = data.cardNumber.replace(/\D/g, "");
    const expiry = data.expiry;
    const cvv = data.cvv;

    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      showToast("Please enter a valid card number", "error");
      return false;
    }
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      showToast("Please enter expiry date in MM/YY format", "error");
      return false;
    }
    if (!cvv || cvv.length < 3 || cvv.length > 4) {
      showToast("Please enter a valid CVV", "error");
      return false;
    }
  }

  return true;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Toast notification function
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

// Add toast CSS if not already present
if (!document.querySelector("#toast-styles")) {
  const style = document.createElement("style");
  style.id = "toast-styles";
  style.textContent = `
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--green);
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      z-index: 10001;
      transform: translateX(400px);
      transition: all 0.3s ease;
    }
    
    .toast.show {
      transform: translateX(0);
    }
    
    .toast.error {
      background: #e74c3c;
    }
  `;
  document.head.appendChild(style);
}
