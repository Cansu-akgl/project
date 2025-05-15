// Authentication functionality
export function initializeAuth() {
  // DOM elements
  const userBtn = document.getElementById('user-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const closeUserBtn = document.getElementById('close-user');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const loginModal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');
  const loggedInSection = document.getElementById('user-logged-in');
  const loggedOutSection = document.getElementById('user-logged-out');
  const switchToRegisterBtn = document.getElementById('switch-to-register');
  const switchToLoginBtn = document.getElementById('switch-to-login');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const logoutBtn = document.getElementById('logout-btn');
  
  // Check if user is logged in
  let isLoggedIn = localStorage.getItem('user') !== null;
  updateAuthUI();
  
  // Event listeners
  userBtn.addEventListener('click', toggleUserDropdown);
  closeUserBtn.addEventListener('click', closeUserDropdown);
  loginBtn.addEventListener('click', showLoginModal);
  registerBtn.addEventListener('click', showRegisterModal);
  switchToRegisterBtn.addEventListener('click', switchToRegister);
  switchToLoginBtn.addEventListener('click', switchToLogin);
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutBtn.addEventListener('click', handleLogout);
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#user-dropdown') && !e.target.closest('#user-btn') && 
        !e.target.closest('#cart-dropdown') && !e.target.closest('#cart-btn') &&
        !e.target.closest('#mobile-menu') && !e.target.closest('#mobile-menu-btn') &&
        !e.target.closest('.modal')) {
      userDropdown.classList.remove('active');
      document.getElementById('cart-dropdown').classList.remove('active');
      document.getElementById('mobile-menu').classList.remove('active');
    }
  });
  
  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    userDropdown.classList.remove('active');
    document.getElementById('cart-dropdown').classList.remove('active');
  });
  
  // Close modals when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    
    const closeModalButtons = modal.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    });
  });
  
  function toggleUserDropdown() {
    userDropdown.classList.toggle('active');
    // Close other dropdowns
    document.getElementById('cart-dropdown').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('active');
  }
  
  function closeUserDropdown() {
    userDropdown.classList.remove('active');
  }
  
  function showLoginModal() {
    closeUserDropdown();
    loginModal.classList.add('active');
  }
  
  function showRegisterModal() {
    closeUserDropdown();
    registerModal.classList.add('active');
  }
  
  function switchToRegister(e) {
    e.preventDefault();
    loginModal.classList.remove('active');
    setTimeout(() => {
      registerModal.classList.add('active');
    }, 300);
  }
  
  function switchToLogin(e) {
    e.preventDefault();
    registerModal.classList.remove('active');
    setTimeout(() => {
      loginModal.classList.add('active');
    }, 300);
  }
  
  function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Admin kullanıcısı kontrolü
    if (email === 'admin@lezzetexpress.com' && password === 'admin123') {
      const user = {
        name: 'Admin',
        email: email,
        isAdmin: true
      };
      localStorage.setItem('user', JSON.stringify(user));
      isLoggedIn = true;
      updateAuthUI();
      loginModal.classList.remove('active');
      showAuthSuccessMessage('Giriş Başarılı', 'Admin paneline yönlendiriliyorsunuz...');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1500);
      return;
    }
    
    // Normal kullanıcı girişi
    const user = {
      name: 'John Doe',
      email: email,
      isAdmin: false
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    isLoggedIn = true;
    updateAuthUI();
    loginModal.classList.remove('active');
    showAuthSuccessMessage('Giriş Başarılı', 'Başarıyla giriş yaptınız.');
  }
  
  function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    
    // Validate password match
    if (password !== passwordConfirm) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    
    // In a real app, this would send the registration data to the server
    // For this demo, we'll just simulate a successful registration
    
    const user = {
      name: name,
      email: email,
      phone: phone
    };
    
    // Set user in local storage
    localStorage.setItem('user', JSON.stringify(user));
    isLoggedIn = true;
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    registerModal.classList.remove('active');
    
    // Show success message
    showAuthSuccessMessage('Kayıt Başarılı', 'Hesabınız başarıyla oluşturuldu.');
  }
  
  function handleLogout() {
    // Remove user from local storage
    localStorage.removeItem('user');
    isLoggedIn = false;
    
    // Update UI
    updateAuthUI();
    
    // Close dropdown
    closeUserDropdown();
    
    // Redirect to home if on a protected page
    const protectedRoutes = ['/profile', '/orders', '/addresses'];
    const currentPath = window.location.pathname;
    
    if (protectedRoutes.includes(currentPath)) {
      window.location.href = '/';
    }
  }
  
  function updateAuthUI() {
    if (isLoggedIn) {
      loggedInSection.style.display = 'block';
      loggedOutSection.style.display = 'none';
    } else {
      loggedInSection.style.display = 'none';
      loggedOutSection.style.display = 'block';
    }
  }
  
  function showAuthSuccessMessage(title, message) {
    const successModal = document.createElement('div');
    successModal.classList.add('modal');
    successModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
          <div class="form-action" style="margin-top: var(--spacing-lg);">
            <button class="btn btn-primary btn-block close-modal">Tamam</button>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('modals-container').appendChild(successModal);
    
    setTimeout(() => {
      successModal.classList.add('active');
      
      const closeButtons = successModal.querySelectorAll('.close-modal');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          successModal.classList.remove('active');
          setTimeout(() => {
            document.getElementById('modals-container').removeChild(successModal);
          }, 300);
        });
      });
    }, 10);
  }
}