import './css/style.css';
import './css/responsive.css';
import { setupRouter } from './js/router.js';
import { initializeCart } from './js/cart.js';
import { initializeAuth } from './js/auth.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Setup the header and footer
  setupHeaderAndFooter();
  
  // Initialize the router
  setupRouter();
  
  // Initialize the cart
  initializeCart();
  
  // Initialize authentication
  initializeAuth();
});

function setupHeaderAndFooter() {
  // Create header
  const header = document.createElement('header');
  header.classList.add('site-header');
  
  header.innerHTML = `
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <a href="/" data-link>
            <span>Lezzet</span>Express
          </a>
        </div>
        <nav class="main-nav">
          <ul>
            <li><a href="/" data-link>Ana Sayfa</a></li>
            <li><a href="/menu" data-link>Menü</a></li>
            <li><a href="/about" data-link>Hakkımızda</a></li>
            <li><a href="/contact" data-link>İletişim</a></li>
          </ul>
        </nav>
        <div class="user-actions">
          <button id="cart-btn" class="btn-icon">
            <i class="fas fa-shopping-cart"></i>
            <span id="cart-count">0</span>
          </button>
          <button id="user-btn" class="btn-icon">
            <i class="fas fa-user"></i>
          </button>
          <button id="mobile-menu-btn" class="btn-icon mobile-only">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-menu" class="mobile-menu">
      <ul>
        <li><a href="/" data-link>Ana Sayfa</a></li>
        <li><a href="/menu" data-link>Menü</a></li>
        <li><a href="/about" data-link>Hakkımızda</a></li>
        <li><a href="/contact" data-link>İletişim</a></li>
      </ul>
    </div>
    <div id="cart-dropdown" class="dropdown-menu">
      <div class="dropdown-header">
        <h3>Sepetim</h3>
        <button id="close-cart" class="btn-icon"><i class="fas fa-times"></i></button>
      </div>
      <div id="cart-items" class="dropdown-content">
        <p class="empty-message">Sepetiniz boş</p>
      </div>
      <div class="dropdown-footer">
        <div class="cart-total">
          <span>Toplam:</span>
          <span id="cart-total">₺0.00</span>
        </div>
        <button id="checkout-btn" class="btn btn-primary">Sipariş Ver</button>
      </div>
    </div>
    <div id="user-dropdown" class="dropdown-menu">
      <div class="dropdown-header">
        <h3>Hesabım</h3>
        <button id="close-user" class="btn-icon"><i class="fas fa-times"></i></button>
      </div>
      <div class="dropdown-content">
        <div id="user-logged-out">
          <button id="login-btn" class="btn btn-outline">Giriş Yap</button>
          <button id="register-btn" class="btn btn-primary">Üye Ol</button>
        </div>
        <div id="user-logged-in" style="display: none;">
          <ul class="account-menu">
            <li><a href="/profile" data-link>Profilim</a></li>
            <li><a href="/orders" data-link>Siparişlerim</a></li>
            <li><a href="/addresses" data-link>Adreslerim</a></li>
            <li><a href="#" id="logout-btn">Çıkış Yap</a></li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  // Create footer
  const footer = document.createElement('footer');
  footer.classList.add('site-footer');
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <a href="/">
            <span>Lezzet</span>Express
          </a>
          <p>Lezzetli yemekler, hızlı teslimat.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Menü</h4>
            <ul>
              <li><a href="/menu/pizza" data-link>Pizza</a></li>
              <li><a href="/menu/burger" data-link>Burger</a></li>
              <li><a href="/menu/kebap" data-link>Kebap</a></li>
              <li><a href="/menu/tatli" data-link>Tatlılar</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Kurumsal</h4>
            <ul>
              <li><a href="/about" data-link>Hakkımızda</a></li>
              <li><a href="/careers" data-link>Kariyer</a></li>
              <li><a href="/terms" data-link>Kullanım Koşulları</a></li>
              <li><a href="/privacy" data-link>Gizlilik Politikası</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>İletişim</h4>
            <ul>
              <li><i class="fas fa-map-marker-alt"></i> Cumhuriyet Cad. No:45, Van</li>
              <li><i class="fas fa-phone"></i> +90 432 345 67 89</li>
              <li><i class="fas fa-envelope"></i> info@lezzetexpress.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 LezzetExpress. Tüm hakları saklıdır.</p>
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  `;
  
  // Add modals container
  const modalsContainer = document.createElement('div');
  modalsContainer.id = 'modals-container';
  
  // Add login modal
  const loginModal = document.createElement('div');
  loginModal.id = 'login-modal';
  loginModal.classList.add('modal');
  loginModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Giriş Yap</h3>
        <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <form id="login-form">
          <div class="form-group">
            <label for="login-email">E-posta</label>
            <input type="email" id="login-email" required>
          </div>
          <div class="form-group">
            <label for="login-password">Şifre</label>
            <input type="password" id="login-password" required>
          </div>
          <div class="form-action">
            <button type="submit" class="btn btn-primary btn-block">Giriş Yap</button>
          </div>
          <div class="form-footer">
            <p>Hesabınız yok mu? <a href="#" id="switch-to-register">Üye Ol</a></p>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Add register modal
  const registerModal = document.createElement('div');
  registerModal.id = 'register-modal';
  registerModal.classList.add('modal');
  registerModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Üye Ol</h3>
        <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <form id="register-form">
          <div class="form-group">
            <label for="register-name">Ad Soyad</label>
            <input type="text" id="register-name" required>
          </div>
          <div class="form-group">
            <label for="register-email">E-posta</label>
            <input type="email" id="register-email" required>
          </div>
          <div class="form-group">
            <label for="register-phone">Telefon</label>
            <input type="tel" id="register-phone" required>
          </div>
          <div class="form-group">
            <label for="register-password">Şifre</label>
            <input type="password" id="register-password" required>
          </div>
          <div class="form-group">
            <label for="register-password-confirm">Şifre (Tekrar)</label>
            <input type="password" id="register-password-confirm" required>
          </div>
          <div class="form-action">
            <button type="submit" class="btn btn-primary btn-block">Üye Ol</button>
          </div>
          <div class="form-footer">
            <p>Zaten üye misiniz? <a href="#" id="switch-to-login">Giriş Yap</a></p>
          </div>
        </form>
      </div>
    </div>
  `;
  
  modalsContainer.appendChild(loginModal);
  modalsContainer.appendChild(registerModal);
  
  // Create root div
  const root = document.createElement('div');
  root.id = 'root';
  
  // Append all elements to the app
  const app = document.getElementById('app');
  app.appendChild(header);
  app.appendChild(root);
  app.appendChild(footer);
  app.appendChild(modalsContainer);
}