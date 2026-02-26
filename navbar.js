// navbar.js - injects navbar, footer, cursor, lightbox, float-wa into every page
(function(){
  const currentPage = document.body.dataset.page || '';

  function navLink(href, label, page) {
    const active = currentPage === page ? ' active-link' : '';
    return `<li><a href="${href}" class="${active}">${label}</a></li>`;
  }

  const navHTML = `
  <div id="scroll-progress"></div>
  <div id="cursor-dot"></div>
  <div id="cursor-ring"></div>
  <a href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20want%20to%20book%20an%20appointment%20at%20Looks%20Salon." target="_blank" class="float-wa"><i class="fab fa-whatsapp"></i></a>

  <div class="lightbox" id="lightbox">
    <button class="lb-close" onclick="closeLightbox()"><i class="fas fa-times"></i></button>
    <img class="lightbox-img" id="lb-img" src="" alt="">
  </div>

  <nav id="navbar">
    <div class="nav-inner">
      <a class="nav-logo" href="index.html">Looks<span>.</span></a>
      <ul class="nav-links">
        ${navLink('index.html','Home','home')}
        ${navLink('about.html','About','about')}
        <li class="has-dropdown">
          <a href="#">Services <i class="fas fa-chevron-down ms-1" style="font-size:0.6rem;"></i></a>
          <div class="mega-dropdown">
            <h6>Our Services</h6>
            <div class="dd-grid">
              <a class="dd-item" href="men.html"><i class="fas fa-cut"></i><span>Men's Grooming</span></a>
              <a class="dd-item" href="women.html"><i class="fas fa-spa"></i><span>Women's Beauty</span></a>
              <a class="dd-item" href="loyalty.html"><i class="fas fa-crown"></i><span>Loyalty Card</span></a>
              <a class="dd-item" href="gallery.html"><i class="fas fa-images"></i><span>Our Work</span></a>
            </div>
          </div>
        </li>
        ${navLink('franchise.html','Franchise','franchise')}
        ${navLink('gallery.html','Gallery','gallery')}
        ${navLink('contact.html','Contact','contact')}
        <li><a href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20an%20appointment" class="nav-cta" target="_blank">Book Now</a></li>
      </ul>
      <div class="nav-hamburger" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <div class="mobile-overlay" id="mobile-overlay" onclick="closeMobileNav()"></div>
  <div class="mobile-nav" id="mobile-nav">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="men.html">Men's Grooming</a>
    <a href="women.html">Women's Beauty</a>
    <a href="loyalty.html">Loyalty Card</a>
    <a href="franchise.html">Franchise</a>
    <a href="gallery.html">Gallery</a>
    <a href="contact.html">Contact</a>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="container-xl">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="footer-logo">Looks<span>.</span></div>
          <p class="footer-desc">India's premier luxury grooming destination. 30+ years of excellence, 200+ outlets, one unwavering standard — the best.</p>
          <div class="footer-social">
            <div class="social-icon"><i class="fab fa-instagram"></i></div>
            <div class="social-icon"><i class="fab fa-facebook"></i></div>
            <div class="social-icon"><i class="fab fa-youtube"></i></div>
            <div class="social-icon"><i class="fab fa-twitter"></i></div>
          </div>
        </div>
        <div class="col-lg-2 col-md-4">
          <div class="footer-heading">Quick Links</div>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="men.html">Men's Services</a></li>
            <li><a href="women.html">Women's Services</a></li>
            <li><a href="loyalty.html">Loyalty Card</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-4">
          <div class="footer-heading">Explore</div>
          <ul class="footer-links">
            <li><a href="franchise.html">Franchise</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="footer-heading">Book Appointment</div>
          <p style="font-family:var(--font-elegant);font-size:1rem;color:rgba(255,255,255,0.45);line-height:1.7;margin-bottom:20px;">Reach out directly via WhatsApp or Email for quick booking.</p>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" style="display:flex;align-items:center;gap:10px;color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:12px;transition:color 0.2s;text-decoration:none;" onmouseover="this.style.color='#25D366'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
            <i class="fab fa-whatsapp" style="color:#25D366;font-size:1.1rem;"></i> +91 XXXX XXX XXX
          </a>
          <a href="mailto:info@lookssalon.in" style="display:flex;align-items:center;gap:10px;color:rgba(255,255,255,0.6);font-size:0.9rem;transition:color 0.2s;text-decoration:none;" onmouseover="this.style.color='var(--gold-light)'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
            <i class="fas fa-envelope" style="color:var(--gold);font-size:1rem;"></i> info@lookssalon.in
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 Looks Salon. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </div>
  </footer>`;

  // Inject navbar at top of body immediately
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Inject footer after full page content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });
})();