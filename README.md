# 🥛 eDairy - Organic Dairy Online Store

A modern, responsive e-commerce website for organic dairy products with advanced shopping cart functionality, user authentication, and interactive features.

**🌐 Live Website:** https://rama7993.github.io/eDairy/

## 🚀 Features

### 🛒 **Shopping Experience**
- **Interactive Product Catalog** - Browse through 6+ dairy products with detailed information
- **Smart Shopping Cart** - Add/remove items, quantity management, persistent cart storage
- **Product Search** - Real-time search functionality with instant filtering
- **Product Preview** - Modal popup with detailed product information
- **Wishlist/Favorites** - Save favorite products for later purchase
- **Product Sharing** - Share products via native share API or clipboard fallback

### 🎨 **User Interface**
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern Animations** - Smooth transitions, hover effects, and scroll animations
- **Interactive Sidebars** - Slide-in cart and favorites panels
- **Professional Styling** - Clean, modern design with consistent color scheme
- **Loading States** - Visual feedback for user actions

### 👤 **User Authentication**
- **Login System** - Secure user authentication with email/password
- **Registration** - New user account creation
- **Password Reset** - Forgot password functionality
- **Form Validation** - Client-side validation with error handling
- **Remember Me** - Persistent login option

### 📱 **Mobile-First Features**
- **Hamburger Menu** - Collapsible navigation for mobile devices
- **Touch-Friendly** - Optimized for touch interactions
- **Responsive Images** - Adaptive image sizing across devices
- **Mobile Cart** - Full-screen cart on mobile devices

### 🛍️ **E-commerce Functionality**
- **Checkout Process** - Complete order processing workflow
- **Order Summary** - Detailed cart summary with pricing
- **Payment Integration** - Multiple payment method options
- **Delivery Information** - Shipping and delivery details
- **Order Management** - Track and manage orders

### 🎯 **Advanced Features**
- **Local Storage** - Persistent cart and favorites data
- **Toast Notifications** - User-friendly success/error messages
- **Image Lazy Loading** - Optimized performance for product images
- **SEO Optimized** - Meta tags and semantic HTML structure
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠️ **Tech Stack**

### **Frontend Technologies**
- **HTML5** - Semantic markup and modern HTML features
- **CSS3** - Advanced styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)** - Modern JavaScript with modules and async/await
- **Font Awesome 6.4.0** - Professional icon library
- **Google Fonts** - Nunito font family for typography

### **CSS Features**
- **CSS Variables** - Consistent theming and easy customization
- **Flexbox & Grid** - Modern layout systems
- **CSS Animations** - Smooth transitions and keyframe animations
- **Media Queries** - Responsive design breakpoints
- **CSS Custom Properties** - Dynamic theming support

### **JavaScript Features**
- **ES6+ Syntax** - Arrow functions, destructuring, template literals
- **DOM Manipulation** - Dynamic content updates
- **Event Handling** - Comprehensive event management
- **Local Storage API** - Client-side data persistence
- **Fetch API** - Modern HTTP requests (ready for backend integration)
- **Intersection Observer** - Scroll-based animations

### **External Libraries & CDNs**
- **Font Awesome 6.4.0** - Icon library with fallback CDN
- **Google Fonts** - Web font optimization
- **CDN Delivery** - Fast, global content delivery

### **Browser Support**
- **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers** - iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement** - Graceful degradation for older browsers

## 📁 **Project Structure**

```
eDairy/
├── index.html          # Main HTML file
├── style.css           # Complete CSS styling
├── script.js           # Main JavaScript functionality
├── login.js            # Authentication system
├── checkout.html       # Checkout page
├── checkout.js         # Checkout functionality
├── images/             # Product and category images
│   ├── product-*.jpg   # Product images
│   ├── category-*.jpg  # Category images
│   └── home-img.jpg    # Hero section image
└── README.md           # Project documentation
```

## 🎨 **Design System**

### **Color Palette**
- **Primary Green:** #27ae60 (Buttons, highlights, brand elements)
- **Dark Text:** #2c2c54 (Headings, primary text)
- **Light Gray:** #f8f9fa (Backgrounds, cards)
- **Accent Red:** #e74c3c (Favorites, alerts, remove actions)

### **Typography**
- **Primary Font:** Nunito (Google Fonts)
- **Weights:** 200, 300, 400, 600, 700
- **Responsive Sizing:** Fluid typography with rem units

### **Spacing System**
- **Consistent Margins:** 1rem, 2rem, 3rem increments
- **Grid Gaps:** 1.5rem standard spacing
- **Padding:** Responsive padding with mobile optimization

## 🚀 **Getting Started**

### **Prerequisites**
- Modern web browser
- Local web server (optional, for development)

### **Installation**
1. Clone or download the repository
2. Open `index.html` in a web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### **Development**
- Edit HTML files for content changes
- Modify `style.css` for styling updates
- Update `script.js` for functionality changes
- Use browser developer tools for debugging

## 🔧 **Customization**

### **Adding Products**
1. Add product HTML in the products section
2. Include product image in `images/` folder
3. Update product data in `script.js`

### **Styling Changes**
- Modify CSS variables in `:root` for global changes
- Update component-specific styles in respective sections
- Use responsive breakpoints for mobile optimization

### **Functionality Extensions**
- Add new JavaScript functions in `script.js`
- Extend cart functionality for additional features
- Implement backend integration for real e-commerce

## 📱 **Responsive Breakpoints**

- **Mobile:** < 768px
- **Tablet:** 768px - 991px
- **Desktop:** 992px - 1200px
- **Large Desktop:** > 1200px

## 🎯 **Performance Optimizations**

- **Optimized Images** - Compressed product images
- **CSS Minification** - Ready for production minification
- **JavaScript Optimization** - Efficient DOM manipulation
- **CDN Usage** - Fast external resource loading
- **Local Storage** - Reduced server requests

## 🔒 **Security Features**

- **Input Validation** - Client-side form validation
- **XSS Prevention** - Proper data sanitization
- **CSRF Protection** - Ready for token implementation
- **Secure Headers** - HTTPS ready configuration

## 🌟 **Future Enhancements**

- **Backend Integration** - Node.js/Express API
- **Database Integration** - MongoDB/PostgreSQL
- **Payment Gateway** - Stripe/PayPal integration
- **User Dashboard** - Order history and account management
- **Admin Panel** - Product and order management
- **Email Notifications** - Order confirmations and updates
- **Inventory Management** - Stock tracking and updates

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 **Support**

For support or questions, please open an issue in the repository.

---

**Built with ❤️ for organic dairy lovers everywhere!** 🥛✨
