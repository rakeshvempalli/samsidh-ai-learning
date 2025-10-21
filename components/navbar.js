class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #c53ba4, #004aad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
        }
        .logo img {
          height: 40px;
          margin-right: 10px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        .nav-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          display: flex;
          align-items: center;
        }
        .nav-links a:hover {
          color: #c53ba4;
        }
        .nav-links a i {
          margin-right: 5px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #333;
          font-size: 1.5rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            gap: 0;
            padding: 1rem 0;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%);
            transition: transform 0.3s ease-in-out;
          }
          .nav-links.active {
            transform: translateY(0);
          }
          .nav-links li {
            width: 100%;
            text-align: center;
            padding: 1rem 0;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="#hero" class="logo">
          <img src="http://static.photos/education/200x200/1" alt="School Logo">
          <span>AI Learning Hub</span>
        </a>
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
        <ul class="nav-links">
          <li><a href="#learn"><i data-feather="book"></i> Learn</a></li>
          <li><a href="#copilot"><i data-feather="cpu"></i> Copilot</a></li>
          <li><a href="#quiz"><i data-feather="award"></i> Quiz</a></li>
          <li><a href="#videos"><i data-feather="video"></i> Videos</a></li>
          <li><a href="#projects"><i data-feather="code"></i> Projects</a></li>
          <li><a href="#contact"><i data-feather="mail"></i> Contact</a></li>
        </ul>
      </nav>
    `;

    // Mobile menu toggle
    const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
    const navLinks = this.shadowRoot.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      feather.replace();
    });

    // Close menu when clicking a link
    this.shadowRoot.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}
customElements.define('custom-navbar', CustomNavbar);
