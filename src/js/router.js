// Simple router for SPA navigation
export function setupRouter() {
  const root = document.getElementById('root');
  const routes = {
    '/': () => homeView(),
    '/menu': () => menuView(),
    '/about': () => aboutView(),
    '/contact': () => contactView(),
    '/profile': () => profileView(),
    '/orders': () => ordersView(),
    '/admin': () => adminView(),
    '/menu/pizza': () => categoryView('pizza'),
    '/menu/burger': () => categoryView('burger'),
    '/menu/kebap': () => categoryView('kebap'),
    '/menu/tatli': () => categoryView('tatli')
  };

  // Handle navigation
  document.addEventListener('click', e => {
    if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
      e.preventDefault();
      const link = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
      navigateTo(link.href);
    }
  });

  // Initial route
  window.addEventListener('popstate', router);
  
  // Navigate to URL
  function navigateTo(url) {
    history.pushState(null, null, url);
    router();
  }
  
  // Router function
  async function router() {
    // Get the current path
    const path = window.location.pathname;
    
    // Close all dropdowns and modals
    document.querySelectorAll('.dropdown-menu.active').forEach(el => {
      el.classList.remove('active');
    });
    
    document.querySelectorAll('.modal.active').forEach(el => {
      el.classList.remove('active');
    });
    
    document.getElementById('mobile-menu').classList.remove('active');
    
    // Update active nav link
    document.querySelectorAll('.main-nav a').forEach(el => {
      el.classList.remove('active');
      if (el.getAttribute('href') === path) {
        el.classList.add('active');
      }
    });
    
    // Find the route handler
    const route = routes[path] || pageNotFound;
    
    // Render the view
    root.innerHTML = ''; // Clear the root element
    root.appendChild(route());
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  // Start the router
  router();
}

// View functions
function homeView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Lezzetli Yemekler Kapınızda!</h1>
          <p class="hero-subtitle">En sevdiğiniz restoranlardan yemeklerinizi hızlı ve güvenli bir şekilde sipariş edin.</p>
          <div class="hero-actions">
            <a href="/menu" class="btn btn-secondary" data-link>Menüyü Görüntüle</a>
            <a href="/about" class="btn btn-outline" style="background-color: rgba(255,255,255,0.2); color: white; border-color: white;" data-link>Hakkımızda</a>
          </div>
        </div>
        <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Lezzetli Yemek" class="hero-image">
      </div>
    </section>
    
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Popüler Kategoriler</h2>
        </div>
        <div class="categories-grid food-grid">
          <a href="/menu/pizza" class="category-card food-card" data-link>
            <div class="food-image">
              <img src="https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pizza">
            </div>
            <div class="food-content">
              <h3 class="food-title">Pizza</h3>
              <p class="food-description">İtalyan mutfağının vazgeçilmezi, çeşit çeşit pizza seçenekleri.</p>
            </div>
          </a>
          <a href="/menu/burger" class="category-card food-card" data-link>
            <div class="food-image">
              <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Burger">
            </div>
            <div class="food-content">
              <h3 class="food-title">Burger</h3>
              <p class="food-description">Bol malzemeli, sulu ve lezzetli burgerler.</p>
            </div>
          </a>
          <a href="/menu/kebap" class="category-card food-card" data-link>
            <div class="food-image">
              <img src="https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kebap">
            </div>
            <div class="food-content">
              <h3 class="food-title">Kebap</h3>
              <p class="food-description">Türk mutfağının klasikleri, enfes kebap çeşitleri.</p>
            </div>
          </a>
          <a href="/menu/tatli" class="category-card food-card" data-link>
            <div class="food-image">
              <img src="https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Tatlı">
            </div>
            <div class="food-content">
              <h3 class="food-title">Tatlılar</h3>
              <p class="food-description">Tatlı krizleriniz için özel seçenekler.</p>
            </div>
          </a>
        </div>
      </div>
    </section>
    
    <section class="section" style="background-color: var(--color-background-dark);">
      <div class="container">
        <div class="section-title">
          <h2>Neden Bizi Tercih Etmelisiniz?</h2>
        </div>
        <div class="features-grid food-grid">
          <div class="feature-card food-card">
            <div class="food-content" style="text-align: center; padding: var(--spacing-xl);">
              <i class="fas fa-truck-fast" style="font-size: 48px; color: var(--color-primary); margin-bottom: var(--spacing-md);"></i>
              <h3 class="food-title">Hızlı Teslimat</h3>
              <p class="food-description">Siparişleriniz, sıcaklığını ve tazeliğini koruyarak en hızlı şekilde kapınıza teslim edilir.</p>
            </div>
          </div>
          <div class="feature-card food-card">
            <div class="food-content" style="text-align: center; padding: var(--spacing-xl);">
              <i class="fas fa-utensils" style="font-size: 48px; color: var(--color-primary); margin-bottom: var(--spacing-md);"></i>
              <h3 class="food-title">Kaliteli Yemekler</h3>
              <p class="food-description">En kaliteli malzemelerle hazırlanan lezzetli yemekler sunuyoruz.</p>
            </div>
          </div>
          <div class="feature-card food-card">
            <div class="food-content" style="text-align: center; padding: var(--spacing-xl);">
              <i class="fas fa-credit-card" style="font-size: 48px; color: var(--color-primary); margin-bottom: var(--spacing-md);"></i>
              <h3 class="food-title">Güvenli Ödeme</h3>
              <p class="food-description">Çeşitli ödeme seçenekleriyle güvenli ve kolay ödeme yapabilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  return view;
}

function menuView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Menümüz</h2>
        </div>
        
        <div class="menu-categories">
          <div class="category-item active" data-category="all">Tümü</div>
          <div class="category-item" data-category="pizza">Pizza</div>
          <div class="category-item" data-category="burger">Burger</div>
          <div class="category-item" data-category="kebap">Kebap</div>
          <div class="category-item" data-category="tatli">Tatlılar</div>
          <div class="category-item" data-category="icecek">İçecekler</div>
        </div>
        
        <div class="food-grid">
          <!-- Pizza -->
          <div class="food-card" data-category="pizza">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Karışık Pizza">
              <div class="food-tags">
                <span class="food-tag">Popüler</span>
              </div>
            </div>
            <div class="food-content">
              <h3 class="food-title">Karışık Pizza</h3>
              <p class="food-description">Sucuk, sosis, mantar, mısır, zeytin ve bol peynir</p>
              <div class="food-meta">
                <span class="food-price">₺159.90</span>
                <button class="btn btn-primary add-to-cart" data-id="1" data-name="Karışık Pizza" data-price="159.90" data-image="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <div class="food-card" data-category="pizza">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Margherita Pizza">
            </div>
            <div class="food-content">
              <h3 class="food-title">Margherita Pizza</h3>
              <p class="food-description">Domates sosu, mozzarella peyniri ve taze fesleğen</p>
              <div class="food-meta">
                <span class="food-price">₺129.90</span>
                <button class="btn btn-primary add-to-cart" data-id="2" data-name="Margherita Pizza" data-price="129.90" data-image="https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <!-- Burger -->
          <div class="food-card" data-category="burger">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Cheeseburger">
              <div class="food-tags">
                <span class="food-tag">Çok Satan</span>
              </div>
            </div>
            <div class="food-content">
              <h3 class="food-title">Cheeseburger</h3>
              <p class="food-description">180gr dana eti, cheddar peyniri, marul, domates, turşu ve özel sos</p>
              <div class="food-meta">
                <span class="food-price">₺149.90</span>
                <button class="btn btn-primary add-to-cart" data-id="3" data-name="Cheeseburger" data-price="149.90" data-image="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <div class="food-card" data-category="burger">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Tavuk Burger">
            </div>
            <div class="food-content">
              <h3 class="food-title">Tavuk Burger</h3>
              <p class="food-description">Izgara tavuk göğsü, marul, domates, turşu ve ranch sos</p>
              <div class="food-meta">
                <span class="food-price">₺129.90</span>
                <button class="btn btn-primary add-to-cart" data-id="4" data-name="Tavuk Burger" data-price="129.90" data-image="https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <!-- Kebap -->
          <div class="food-card" data-category="kebap">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/6419720/pexels-photo-6419720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Adana Kebap">
              <div class="food-tags">
                <span class="food-tag">Acılı</span>
              </div>
            </div>
            <div class="food-content">
              <h3 class="food-title">Adana Kebap</h3>
              <p class="food-description">Izgara üzerinde pişirilmiş acılı kıyma kebabı, lavaş ekmeği, közlenmiş biber ve domates</p>
              <div class="food-meta">
                <span class="food-price">₺179.90</span>
                <button class="btn btn-primary add-to-cart" data-id="5" data-name="Adana Kebap" data-price="179.90" data-image="https://images.pexels.com/photos/6419720/pexels-photo-6419720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <div class="food-card" data-category="kebap">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/7474372/pexels-photo-7474372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Tavuk Şiş">
            </div>
            <div class="food-content">
              <h3 class="food-title">Tavuk Şiş</h3>
              <p class="food-description">Marinelenmiş tavuk parçaları, ızgara sebzeler ve özel baharatlar</p>
              <div class="food-meta">
                <span class="food-price">₺139.90</span>
                <button class="btn btn-primary add-to-cart" data-id="6" data-name="Tavuk Şiş" data-price="139.90" data-image="https://images.pexels.com/photos/7474372/pexels-photo-7474372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <!-- Tatlılar -->
          <div class="food-card" data-category="tatli">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Çikolatalı Sufle">
              <div class="food-tags">
                <span class="food-tag">Yeni</span>
              </div>
            </div>
            <div class="food-content">
              <h3 class="food-title">Çikolatalı Sufle</h3>
              <p class="food-description">İçi sıcak akan çikolata sosu ve yanında dondurma</p>
              <div class="food-meta">
                <span class="food-price">₺89.90</span>
                <button class="btn btn-primary add-to-cart" data-id="7" data-name="Çikolatalı Sufle" data-price="89.90" data-image="https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <div class="food-card" data-category="tatli">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/5723353/pexels-photo-5723353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fırın Sütlaç">
            </div>
            <div class="food-content">
              <h3 class="food-title">Fırın Sütlaç</h3>
              <p class="food-description">Geleneksel tarifle hazırlanmış, fırında kızartılmış, tarçınlı sütlaç</p>
              <div class="food-meta">
                <span class="food-price">₺69.90</span>
                <button class="btn btn-primary add-to-cart" data-id="8" data-name="Fırın Sütlaç" data-price="69.90" data-image="https://images.pexels.com/photos/5723353/pexels-photo-5723353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <!-- İçecekler -->
          <div class="food-card" data-category="icecek">
            <div class="food-image">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Some_ayran_in_copper_cups.jpg/800px-Some_ayran_in_copper_cups.jpg" alt="Bakır Kapda Ayran">
            </div>
            <div class="food-content">
              <h3 class="food-title">Ayran</h3>
              <p class="food-description">Geleneksel bakır kapda servis edilen taze yayık ayranı</p>
              <div class="food-meta">
                <span class="food-price">₺29.90</span>
                <button class="btn btn-primary add-to-cart" data-id="9" data-name="Ayran" data-price="29.90" data-image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Some_ayran_in_copper_cups.jpg/800px-Some_ayran_in_copper_cups.jpg">Sepete Ekle</button>
              </div>
            </div>
          </div>
          
          <div class="food-card" data-category="icecek">
            <div class="food-image">
              <img src="https://images.pexels.com/photos/2668498/pexels-photo-2668498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kola">
            </div>
            <div class="food-content">
              <h3 class="food-title">Kola</h3>
              <p class="food-description">Soğuk kola</p>
              <div class="food-meta">
                <span class="food-price">₺25.90</span>
                <button class="btn btn-primary add-to-cart" data-id="10" data-name="Kola" data-price="25.90" data-image="https://images.pexels.com/photos/2668498/pexels-photo-2668498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">Sepete Ekle</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  // Initialize category filter
  setTimeout(() => {
    const categoryItems = view.querySelectorAll('.category-item');
    const foodCards = view.querySelectorAll('.food-card');
    
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Update active category
        categoryItems.forEach(cat => cat.classList.remove('active'));
        item.classList.add('active');
        
        const category = item.dataset.category;
        
        // Filter food cards
        foodCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Initialize add to cart buttons
    const addToCartButtons = view.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;
        
        // Add to cart
        const event = new CustomEvent('add-to-cart', {
          detail: { id, name, price, image, quantity: 1 }
        });
        document.dispatchEvent(event);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        successMsg.innerHTML = `
          <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${name} sepete eklendi!</span>
          </div>
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.classList.add('show');
        }, 10);
        
        setTimeout(() => {
          successMsg.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(successMsg);
          }, 300);
        }, 2000);
      });
    });
  }, 0);
  
  return view;
}

function aboutView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Hakkımızda</h2>
        </div>
        
        <div class="about-content">
          <div class="row">
            <div class="col">
              <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Restaurant" style="border-radius: var(--border-radius-lg); margin-bottom: var(--spacing-lg);">
            </div>
            <div class="col">
              <h3>Hikayemiz</h3>
              <p>LezzetExpress olarak 2024 yılında Van'da kurulduk. Şehrimizin eşsiz lezzetlerini ve modern mutfağın en sevilen tatlarını insanların ayağına götürmek için çıktığımız bu yolda, Van'ın yemek siparişi sektöründe öncü olmayı hedefliyoruz.</p>
              <p>Misyonumuz, Van'ın geleneksel tatlarını ve modern mutfağın seçkin lezzetlerini en kaliteli ve en hızlı şekilde müşterilerimize ulaştırmak. Vizyonumuz ise Van'ın ve bölgenin en güvenilir ve tercih edilen yemek teslimat platformu olmak.</p>
              <p>Yeni kurulan bir şirket olarak, müşteri memnuniyetini en üst düzeyde tutarak, Van'ın lezzet dünyasına yeni bir soluk getirmeyi amaçlıyoruz.</p>
            </div>
          </div>
          
          <div class="row" style="margin-top: var(--spacing-xxl);">
            <div class="col">
              <h3>Değerlerimiz</h3>
              <ul style="list-style: disc; padding-left: var(--spacing-lg);">
                <li>Müşteri memnuniyeti her şeyden önce gelir.</li>
                <li>Van'ın yerel lezzetlerini modern bir anlayışla sunmak.</li>
                <li>Hızlı ve güvenilir teslimat hizmeti sağlamak.</li>
                <li>Kaliteli ve taze ürünlerle çalışmak.</li>
                <li>Çevreye ve topluma karşı sorumlu davranmak.</li>
              </ul>
            </div>
            <div class="col">
              <h3>Ekibimiz</h3>
              <p>LezzetExpress'in başarısının arkasında genç ve dinamik bir ekip var. Teknoloji, operasyon, pazarlama ve müşteri hizmetleri ekiplerimiz, Van'ın en iyi yemek teslimat deneyimini sunmak için her gün özveriyle çalışıyor.</p>
              <p>Ekibimizde yer almak ve kariyerinize LezzetExpress'te devam etmek isterseniz, <a href="/careers" data-link>Kariyer</a> sayfamızı ziyaret edebilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  return view;
}

function contactView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>İletişim</h2>
        </div>
        
        <div class="row">
          <div class="col">
            <div class="contact-info">
              <h3>İletişim Bilgileri</h3>
              <ul class="contact-list">
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Adres</h4>
                    <p>Cumhuriyet Cad. No:45, 65100, İpekyolu, Van</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-phone"></i>
                  <div>
                    <h4>Telefon</h4>
                    <p>+90 432 345 67 89</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-envelope"></i>
                  <div>
                    <h4>E-posta</h4>
                    <p>info@lezzetexpress.com</p>
                  </div>
                </li>
                <li>
                  <i class="fas fa-clock"></i>
                  <div>
                    <h4>Çalışma Saatleri</h4>
                    <p>Haftaiçi: 10:00 - 22:00</p>
                    <p>Haftasonu: 10:00 - 23:00</p>
                  </div>
                </li>
              </ul>
              
              <div class="social-media">
                <h4>Sosyal Medya</h4>
                <div class="social-icons">
                  <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                  <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col">
            <div class="contact-form">
              <h3>Bize Ulaşın</h3>
              <form id="contact-form">
                <div class="form-group">
                  <label for="name">Ad Soyad</label>
                  <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                  <label for="email">E-posta</label>
                  <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                  <label for="subject">Konu</label>
                  <select id="subject" name="subject" required>
                    <option value="">Konu Seçiniz</option>
                    <option value="sipariş">Sipariş Hakkında</option>
                    <option value="şikayet">Şikayet</option>
                    <option value="öneri">Öneri</option>
                    <option value="diğer">Diğer</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message">Mesajınız</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div class="form-action">
                  <button type="submit" class="btn btn-primary btn-block">Gönder</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div class="map-container" style="margin-top: var(--spacing-xxl); height: 400px; background-color: #eee; border-radius: var(--border-radius-lg); display: flex; align-items: center; justify-content: center;">
          <p>Harita burada görüntülenecek</p>
        </div>
      </div>
    </section>
  `;
  
  setTimeout(() => {
    const contactForm = view.querySelector('#contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success message (in a real app, you would send this to the server)
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Create a success modal
      const successModal = document.createElement('div');
      successModal.classList.add('modal');
      successModal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Mesajınız Gönderildi</h3>
            <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <p>Teşekkürler! Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
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
      
      // Reset form
      contactForm.reset();
    });
  }, 0);
  
  return view;
}

function profileView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Profilim</h2>
        </div>
        
        <div class="profile-content">
          <div class="row">
            <div class="col" style="flex: 0 0 300px;">
              <div class="account-sidebar">
                <div class="user-info">
                  <div class="user-avatar">
                    <i class="fas fa-user-circle" style="font-size: 60px; color: var(--color-primary);"></i>
                  </div>
                  <h3>John Doe</h3>
                  <p>john.doe@example.com</p>
                </div>
                
                <ul class="account-menu">
                  <li><a href="/profile" class="active" data-link>Profilim</a></li>
                  <li><a href="/orders" data-link>Siparişlerim</a></li>
                  <li><a href="/addresses" data-link>Adreslerim</a></li>
                  <li><a href="#" id="logout-link">Çıkış Yap</a></li>
                </ul>
              </div>
            </div>
            
            <div class="col">
              <div class="profile-form">
                <h3>Profil Bilgileri</h3>
                <form id="profile-form">
                  <div class="form-group">
                    <label for="profile-name">Ad Soyad</label>
                    <input type="text" id="profile-name" value="John Doe">
                  </div>
                  <div class="form-group">
                    <label for="profile-email">E-posta</label>
                    <input type="email" id="profile-email" value="john.doe@example.com">
                  </div>
                  <div class="form-group">
                    <label for="profile-phone">Telefon</label>
                    <input type="tel" id="profile-phone" value="+90 555 123 4567">
                  </div>
                  
                  <h3 style="margin-top: var(--spacing-xl);">Şifre Değiştir</h3>
                  <div class="form-group">
                    <label for="current-password">Mevcut Şifre</label>
                    <input type="password" id="current-password">
                  </div>
                  <div class="form-group">
                    <label for="new-password">Yeni Şifre</label>
                    <input type="password" id="new-password">
                  </div>
                  <div class="form-group">
                    <label for="confirm-password">Yeni Şifre (Tekrar)</label>
                    <input type="password" id="confirm-password">
                  </div>
                  
                  <div class="form-action">
                    <button type="submit" class="btn btn-primary">Değişiklikleri Kaydet</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  setTimeout(() => {
    const profileForm = view.querySelector('#profile-form');
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success message
      const successModal = document.createElement('div');
      successModal.classList.add('modal');
      successModal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Profil Güncellendi</h3>
            <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <p>Profil bilgileriniz başarıyla güncellendi.</p>
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
    });
    
    const logoutLink = view.querySelector('#logout-link');
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real app, this would log the user out
      // For now, just redirect to home
      window.location.href = '/';
    });
  }, 0);
  
  return view;
}

function ordersView() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Siparişlerim</h2>
        </div>
        
        <div class="orders-content">
          <div class="row">
            <div class="col" style="flex: 0 0 300px;">
              <div class="account-sidebar">
                <div class="user-info">
                  <div class="user-avatar">
                    <i class="fas fa-user-circle" style="font-size: 60px; color: var(--color-primary);"></i>
                  </div>
                  <h3>John Doe</h3>
                  <p>john.doe@example.com</p>
                </div>
                
                <ul class="account-menu">
                  <li><a href="/profile" data-link>Profilim</a></li>
                  <li><a href="/orders" class="active" data-link>Siparişlerim</a></li>
                  <li><a href="/addresses" data-link>Adreslerim</a></li>
                  <li><a href="#" id="logout-link">Çıkış Yap</a></li>
                </ul>
              </div>
            </div>
            
            <div class="col">
              <div class="orders-list">
                <div class="order-card">
                  <div class="order-header">
                    <div class="order-id">
                      <h4>Sipariş #12345</h4>
                      <span class="order-date">22 Nisan 2025</span>
                    </div>
                    <div class="order-status">
                      <span class="status-badge delivered">Teslim Edildi</span>
                    </div>
                  </div>
                  <div class="order-items">
                    <div class="order-item">
                      <img src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Karışık Pizza" class="order-item-image">
                      <div class="order-item-details">
                        <h5>Karışık Pizza</h5>
                        <span class="order-item-quantity">Miktar: 1</span>
                      </div>
                      <span class="order-item-price">₺159.90</span>
                    </div>
                    <div class="order-item">
                      <img src="https://images.pexels.com/photos/2668498/pexels-photo-2668498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kola" class="order-item-image">
                      <div class="order-item-details">
                        <h5>Kola</h5>
                        <span class="order-item-quantity">Miktar: 2</span>
                      </div>
                      <span class="order-item-price">₺51.80</span>
                    </div>
                  </div>
                  <div class="order-footer">
                    <div class="order-total">
                      <span>Toplam:</span>
                      <span class="order-total-price">₺211.70</span>
                    </div>
                    <button class="btn btn-outline order-again-btn">Tekrar Sipariş Ver</button>
                  </div>
                </div>
                
                <div class="order-card">
                  <div class="order-header">
                    <div class="order-id">
                      <h4>Sipariş #12340</h4>
                      <span class="order-date">18 Nisan 2025</span>
                    </div>
                    <div class="order-status">
                      <span class="status-badge delivered">Teslim Edildi</span>
                    </div>
                  </div>
                  <div class="order-items">
                    <div class="order-item">
                      <img src="https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Tavuk Burger" class="order-item-image">
                      <div class="order-item-details">
                        <h5>Tavuk Burger</h5>
                        <span class="order-item-quantity">Miktar: 2</span>
                      </div>
                      <span class="order-item-price">₺259.80</span>
                    </div>
                    <div class="order-item">
                      <img src="https://images.pexels.com/photos/3081657/pexels-photo-3081657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Çikolatalı Sufle" class="order-item-image">
                      <div class="order-item-details">
                        <h5>Çikolatalı Sufle</h5>
                        <span class="order-item-quantity">Miktar: 1</span>
                      </div>
                      <span class="order-item-price">₺89.90</span>
                    </div>
                  </div>
                  <div class="order-footer">
                    <div class="order-total">
                      <span>Toplam:</span>
                      <span class="order-total-price">₺349.70</span>
                    </div>
                    <button class="btn btn-outline order-again-btn">Tekrar Sipariş Ver</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  setTimeout(() => {
    const orderAgainButtons = view.querySelectorAll('.order-again-btn');
    orderAgainButtons.forEach(button => {
      button.addEventListener('click', () => {
        // In a real app, this would re-add the items to the cart
        // For now, just show a success message
        const successModal = document.createElement('div');
        successModal.classList.add('modal');
        successModal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h3>Sipariş Sepete Eklendi</h3>
              <button class="close-modal btn-icon"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <p>Önceki siparişinizdeki ürünler sepetinize eklendi.</p>
              <div class="form-action" style="margin-top: var(--spacing-lg);">
                <button class="btn btn-primary close-modal">Sepete Git</button>
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
                // Open cart dropdown
                document.getElementById('cart-dropdown').classList.add('active');
              }, 300);
            });
          });
        }, 10);
      });
    });
    
    const logoutLink = view.querySelector('#logout-link');
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/';
    });
  }, 0);
  
  return view;
}

function categoryView(category) {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>${getCategoryTitle(category)}</h2>
        </div>
        
        <div class="category-view">
          <p>Bu kategori sayfası yapım aşamasındadır.</p>
          <p><a href="/menu" data-link>Tüm menüyü görüntülemek için tıklayın</a></p>
        </div>
      </div>
    </section>
  `;
  
  return view;
}

function getCategoryTitle(category) {
  const titles = {
    'pizza': 'Pizza',
    'burger': 'Burgerler',
    'kebap': 'Kebaplar',
    'tatli': 'Tatlılar'
  };
  
  return titles[category] || 'Menü';
}

function pageNotFound() {
  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div style="text-align: center; padding: 60px 0;">
          <h1 style="font-size: 72px; color: var(--color-primary);">404</h1>
          <h2>Sayfa Bulunamadı</h2>
          <p>Aradığınız sayfa bulunamadı. Ana sayfaya dönmek için aşağıdaki butona tıklayabilirsiniz.</p>
          <div style="margin-top: 30px;">
            <a href="/" class="btn btn-primary" data-link>Ana Sayfaya Dön</a>
          </div>
        </div>
      </div>
    </section>
  `;
  
  return view;
}

function adminView() {
  // Check if user is admin
  const user = JSON.parse(localStorage.getItem('user')) || {};
  if (!user.isAdmin) {
    window.location.href = '/';
    return document.createElement('div'); // Return empty div if not admin
  }

  const view = document.createElement('div');
  view.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Admin Paneli</h2>
        </div>
        
        <div class="admin-content">
          <div class="row">
            <div class="col" style="flex: 0 0 300px;">
              <div class="admin-sidebar">
                <ul class="admin-menu">
                  <li><a href="#orders" class="active">Siparişler</a></li>
                  <li><a href="#products">Ürünler</a></li>
                  <li><a href="#users">Kullanıcılar</a></li>
                  <li><a href="#settings">Ayarlar</a></li>
                </ul>
              </div>
            </div>
            
            <div class="col">
              <div id="admin-orders" class="admin-section">
                <h3>Siparişler</h3>
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Sipariş No</th>
                      <th>Müşteri</th>
                      <th>Tutar</th>
                      <th>Durum</th>
                      <th>Tarih</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#12345</td>
                      <td>Ahmet Yılmaz</td>
                      <td>₺159.90</td>
                      <td><span class="status-badge pending">Hazırlanıyor</span></td>
                      <td>22.04.2024</td>
                      <td>
                        <button class="btn btn-sm btn-primary">Düzenle</button>
                        <button class="btn btn-sm btn-danger">İptal</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div id="admin-products" class="admin-section" style="display: none;">
                <h3>Ürünler</h3>
                <button class="btn btn-primary" style="margin-bottom: var(--spacing-lg);">Yeni Ürün Ekle</button>
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Ürün ID</th>
                      <th>Ürün Adı</th>
                      <th>Kategori</th>
                      <th>Fiyat</th>
                      <th>Stok</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1</td>
                      <td>Karışık Pizza</td>
                      <td>Pizza</td>
                      <td>₺159.90</td>
                      <td>Mevcut</td>
                      <td>
                        <button class="btn btn-sm btn-primary">Düzenle</button>
                        <button class="btn btn-sm btn-danger">Sil</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div id="admin-users" class="admin-section" style="display: none;">
                <h3>Kullanıcılar</h3>
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ad Soyad</th>
                      <th>E-posta</th>
                      <th>Kayıt Tarihi</th>
                      <th>Durum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1</td>
                      <td>Ahmet Yılmaz</td>
                      <td>ahmet@example.com</td>
                      <td>20.04.2024</td>
                      <td><span class="status-badge active">Aktif</span></td>
                      <td>
                        <button class="btn btn-sm btn-primary">Düzenle</button>
                        <button class="btn btn-sm btn-danger">Deaktif Et</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div id="admin-settings" class="admin-section" style="display: none;">
                <h3>Site Ayarları</h3>
                <form id="settings-form">
                  <div class="form-group">
                    <label>Site Başlığı</label>
                    <input type="text" value="LezzetExpress">
                  </div>
                  <div class="form-group">
                    <label>İletişim E-postası</label>
                    <input type="email" value="info@lezzetexpress.com">
                  </div>
                  <div class="form-group">
                    <label>Minimum Sipariş Tutarı</label>
                    <input type="number" value="50">
                  </div>
                  <div class="form-group">
                    <label>Teslimat Ücreti</label>
                    <input type="number" value="15">
                  </div>
                  <div class="form-action">
                    <button type="submit" class="btn btn-primary">Kaydet</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  setTimeout(() => {
    const adminMenu = view.querySelectorAll('.admin-menu a');
    const adminSections = view.querySelectorAll('.admin-section');
    
    adminMenu.forEach(menuItem => {
      menuItem.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active menu item
        adminMenu.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        
        // Show corresponding section
        const sectionId = menuItem.getAttribute('href').substring(1);
        adminSections.forEach(section => {
          section.style.display = section.id === `admin-${sectionId}` ? 'block' : 'none';
        });
      });
    });
  }, 0);
  
  return view;
}