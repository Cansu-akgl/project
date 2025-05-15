// Cart functionality
export function initializeCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM elements
  const cartBtn = document.getElementById('cart-btn');
  const cartDropdown = document.getElementById('cart-dropdown');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Event listeners
  cartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', closeCart);
  checkoutBtn.addEventListener('click', checkout);
  document.addEventListener('add-to-cart', handleAddToCart);
  
  // Initial render
  updateCartUI();
  
  function toggleCart() {
    cartDropdown.classList.toggle('active');
    // Close other dropdowns
    document.getElementById('user-dropdown').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('active');
  }
  
  function closeCart() {
    cartDropdown.classList.remove('active');
  }
  
  function handleAddToCart(event) {
    const { id, name, price, image, quantity } = event.detail;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({ id, name, price, image, quantity });
    }
    
    // Save to local storage
    saveCart();
    
    // Update UI
    updateCartUI();
  }
  
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
  }
  
  function updateQuantity(id, quantity) {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        removeFromCart(id);
      } else {
        cart[itemIndex].quantity = quantity;
        saveCart();
        updateCartUI();
      }
    }
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  function updateCartUI() {
    // Update cart count
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // Update cart items
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-message">Sepetiniz boş</p>';
    } else {
      let cartHTML = '<div class="cart-items">';
      
      cart.forEach(item => {
        cartHTML += `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <span class="cart-item-price">₺${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
              <button class="btn-icon decrease-quantity"><i class="fas fa-minus"></i></button>
              <span class="cart-item-quantity">${item.quantity}</span>
              <button class="btn-icon increase-quantity"><i class="fas fa-plus"></i></button>
              <button class="btn-icon remove-item"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `;
      });
      
      cartHTML += '</div>';
      cartItemsContainer.innerHTML = cartHTML;
      
      // Add event listeners to buttons
      cartItemsContainer.querySelectorAll('.cart-item').forEach(cartItem => {
        const id = cartItem.dataset.id;
        
        cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
          const item = cart.find(item => item.id === id);
          if (item) {
            updateQuantity(id, item.quantity - 1);
          }
        });
        
        cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
          const item = cart.find(item => item.id === id);
          if (item) {
            updateQuantity(id, item.quantity + 1);
          }
        });
        
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
          removeFromCart(id);
        });
      });
    }
    
    // Update total
    cartTotalElement.textContent = `₺${getCartTotal().toFixed(2)}`;
    
    // Enable/disable checkout button
    checkoutBtn.disabled = cart.length === 0;
  }
  
  function checkout() {
    if (cart.length === 0) return;
    
    // In a real app, this would redirect to a checkout page or open a checkout modal
    // For now, let's just show a success message
    const checkoutModal = document.createElement('div');
    checkoutModal.classList.add('modal');
    checkoutModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Sipariş Özeti</h3>
          <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="checkout-items">
            ${cart.map(item => `
              <div class="checkout-item">
                <div class="checkout-item-name">${item.name} x ${item.quantity}</div>
                <div class="checkout-item-price">₺${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
          <div class="checkout-total">
            <div class="checkout-total-label">Toplam:</div>
            <div class="checkout-total-price">₺${getCartTotal().toFixed(2)}</div>
          </div>
          <div class="form-group">
            <label for="address">Teslimat Adresi</label>
            <textarea id="address" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label for="payment">Ödeme Yöntemi</label>
            <select id="payment" required>
              <option value="">Ödeme Yöntemi Seçin</option>
              <option value="cash">Kapıda Ödeme</option>
              <option value="credit-card">Kredi Kartı</option>
            </select>
          </div>
          <div class="form-action">
            <button id="confirm-order" class="btn btn-primary btn-block">Siparişi Tamamla</button>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('modals-container').appendChild(checkoutModal);
    
    setTimeout(() => {
      checkoutModal.classList.add('active');
      
      const closeButtons = checkoutModal.querySelectorAll('.close-modal');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          checkoutModal.classList.remove('active');
          setTimeout(() => {
            document.getElementById('modals-container').removeChild(checkoutModal);
          }, 300);
        });
      });
      
      const confirmOrderBtn = checkoutModal.querySelector('#confirm-order');
      confirmOrderBtn.addEventListener('click', () => {
        const address = checkoutModal.querySelector('#address').value;
        const payment = checkoutModal.querySelector('#payment').value;
        
        if (!address || !payment) {
          alert('Lütfen tüm alanları doldurun');
          return;
        }
        
        // Close checkout modal
        checkoutModal.classList.remove('active');
        
        setTimeout(() => {
          document.getElementById('modals-container').removeChild(checkoutModal);
          
          // Clear cart
          cart = [];
          saveCart();
          updateCartUI();
          
          // Show success message
          const successModal = document.createElement('div');
          successModal.classList.add('modal');
          successModal.innerHTML = `
            <div class="modal-content">
              <div class="modal-header">
                <h3>Sipariş Alındı</h3>
                <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
              </div>
              <div class="modal-body">
                <p>Siparişiniz başarıyla alınmıştır. Siparişiniz hazırlanıyor.</p>
                <p>Sipariş numaranız: <strong>#${Math.floor(10000 + Math.random() * 90000)}</strong></p>
                <p>Tahmini teslimat süresi: 30-45 dakika</p>
                <div class="form-action" style="margin-top: var(--spacing-lg);">
                  <button class="btn btn-primary btn-block close-modal">Tamam</button>
                </div>
              </div>
            </div>
          `;
          
          document.getElementById('modals-container').appendChild(successModal);
          
          setTimeout(() => {
            successModal.classList.add('active');
            closeCart();
            
            const closeSuccessButtons = successModal.querySelectorAll('.close-modal');
            closeSuccessButtons.forEach(button => {
              button.addEventListener('click', () => {
                successModal.classList.remove('active');
                setTimeout(() => {
                  document.getElementById('modals-container').removeChild(successModal);
                }, 300);
              });
            });
          }, 10);
        }, 300);
      });
    }, 10);
  }
}