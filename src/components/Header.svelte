<script>
  import logoImg from "../assets/logo.png";
</script>

<header class="navbar">
  <div class="nav-container">
    <!-- Logo -->
    <a href="/" class="logo">
      <img src={logoImg} class="logo-img" alt="Flot logo" />
      <span class="logo-text">Flot</span>
    </a>

    <!-- Nav Links -->
    <nav class="nav-links">
      <a href="#solutions" class="nav-link">Solutions</a>
      <a href="#developers" class="nav-link">Developers</a>
      <a href="#pricing" class="nav-link">Pricing</a>
      <a href="#company" class="nav-link">Company</a>
    </nav>

    <!-- Get Started CTA Button -->
    <a href="https://pay.flotme.ai/" class="get-started-cta" target="_blank" rel="noopener noreferrer">
      <span>Get started</span>
      <svg class="arrow-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  </div>
</header>

<style>
  .navbar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(250, 250, 250, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--color-border-light);
  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 14px var(--space-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
    letter-spacing: -0.03em;
  }

  .nav-links {
    display: flex;
    gap: 32px;
  }

  .nav-link {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-sec);
    position: relative;
    padding: 6px 0;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1.5px;
    background-color: var(--color-text-main);
    transition: var(--transition-smooth);
  }

  .nav-link:hover {
    color: var(--color-text-main);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .get-started-cta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-main);
    background-color: var(--color-accent);
    padding: 10px 20px;
    border-radius: 100px;
    box-shadow: 0 4px 14px rgba(133, 253, 198, 0.3), 0 1px 2px rgba(133, 253, 198, 0.2);
    transition: var(--transition-smooth);
  }

  .get-started-cta:hover {
    transform: translateY(-1px);
    background-color: var(--color-accent-hover);
    box-shadow: 0 6px 20px rgba(133, 253, 198, 0.45), 0 2px 4px rgba(133, 253, 198, 0.25);
  }

  .get-started-cta:hover .arrow-icon {
    transform: translateX(3px);
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none; /* Hide standard nav on mobile for simplicity */
    }
  }
</style>
