<script>
  import logoImg from "../assets/logo.png";
  import Card from "./Card.svelte";

  export let onOpenDownload = () => {};
  let buttonHovered = false;
</script>

<footer class="cta-section section-container">
  <div class="cta-inner-grid">
    <!-- Left Column: Unlock global commerce + Checklists -->
    <div class="cta-left">
      <h2 class="cta-heading">Unlock global commerce<br />with local simplicity.</h2>

      <p class="cta-security-note">Your security is our priority. Flot uses industry-standard security measures and verification processes to help protect your account and transactions.</p>

      <div class="cta-checklist">
        <div class="check-item">
          <div class="check-circle">✓</div>
          <span class="check-text">Regulated by the Bank of Sierra Leone</span>
        </div>
        <div class="check-item">
          <div class="check-circle">✓</div>
          <span class="check-text">PCI-DSS Compliant Security</span>
        </div>
      </div>
    </div>

    <!-- Center/Right Column: Fanned card stack + Giant button -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="cta-right-container"
      on:mouseenter={() => buttonHovered = true}
      on:mouseleave={() => buttonHovered = false}
    >
      <!-- Giant Floating Circle Button -->
      <a 
        href="https://download.flotme.ai" 
        class="giant-get-started-btn" 
        class:expand={buttonHovered}
        on:click|preventDefault={onOpenDownload}
      >
        <span class="btn-text">Get Started</span>
      </a>

      <!-- Card Fan Row -->
      <div class="card-fan-row">
        <!-- Card 1: Glass (leftmost) - Visa representation -->
        <div class="cta-card card-pos-left" class:shift={buttonHovered}>
          <Card type="glass" cardholder="Aminata K." expiry="09/27" cardNumber="4000 1288 9576 1934" />
        </div>

        <!-- Card 2: Yellow (middle) - Mastercard representation -->
        <div class="cta-card card-pos-mid" class:shift={buttonHovered}>
          <Card type="yellow" cardholder="Mohamed B." expiry="12/28" cardNumber="5412 7588 1922 4311" />
        </div>

        <!-- Card 3: Black (rightmost) - Flot Mint representation -->
        <div class="cta-card card-pos-right" class:shift={buttonHovered}>
          <Card type="black" cardholder="Fatmata S." expiry="05/29" />
        </div>
      </div>
    </div>
  </div>

  <!-- Company Info & Address Footer Block -->
  <div class="footer-details-grid">
    <div class="footer-col brand-col">
      <div class="footer-logo">
        <img src={logoImg} class="logo-img-footer" alt="Flot logo" />
        <span class="logo-text">Flot</span>
      </div>
      <p class="brand-pitch">Flot is operated by Open Hubb SL Limited, a financial technology company focused on expanding access to secure digital financial services and payment solutions across Africa.</p>
    </div>
    
    <div class="footer-col address-col">
      <h4 class="footer-col-title">Office</h4>
      <p class="office-address">78 Cape Road Aberdeen, Freetown, Sierra Leone</p>
    </div>

    <div class="footer-col contact-col">
      <h4 class="footer-col-title">Support</h4>
      <p class="phone-link">+232 99 800 100</p>
      <p class="phone-link">+232 80 800 100</p>
    </div>

    <div class="footer-col social-col">
      <h4 class="footer-col-title">Socials</h4>
      <div class="social-links">
        <a href="https://twitter.com/FlotAi32201" target="_blank" rel="noopener noreferrer" class="social-link">Twitter/X</a>
        <a href="https://instagram.com/flot.ai" target="_blank" rel="noopener noreferrer" class="social-link">Instagram</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link">Facebook</a>
      </div>
    </div>
  </div>

  <!-- Copyright Footer row -->
  <div class="footer-copyright-row">
    <p class="copyright-text">© 2026 Flot. All rights reserved.</p>
  </div>
</footer>

<style>
  .cta-section {
    padding-bottom: var(--space-2xl);
    overflow: visible;
  }

  .cta-inner-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 40px;
    align-items: center;
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: var(--space-4xl);
    position: relative;
    min-height: 320px;
  }

  .cta-left {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .cta-heading {
    font-size: 52px;
    line-height: 1.08;
    font-weight: 600;
    letter-spacing: -0.04em;
  }

  .cta-security-note {
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-sec);
    max-width: 440px;
    margin-top: -8px;
  }

  .cta-checklist {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .check-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .check-circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: var(--color-text-main);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
  }

  .check-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-main);
  }

  /* Center/Right Cards Row & Giant Button */
  .cta-right-container {
    position: relative;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  /* Giant Floating CTA Circle Button */
  .giant-get-started-btn {
    position: absolute;
    left: 20%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: var(--color-accent);
    color: var(--color-text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    box-shadow: 0 12px 32px rgba(133, 253, 198, 0.35);
    transition: var(--transition-slow);
    cursor: pointer;
  }

  .giant-get-started-btn:hover, .giant-get-started-btn.expand {
    width: 160px;
    height: 160px;
    background-color: var(--color-accent-hover);
    box-shadow: 0 16px 40px rgba(133, 253, 198, 0.5);
    transform: translate(-50%, -50%) rotate(10deg);
  }

  .btn-text {
    font-family: var(--font-heading);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
    text-align: center;
  }

  /* Cards Fan Row Positioning */
  .card-fan-row {
    position: relative;
    width: 480px;
    height: 200px;
  }

  .cta-card {
    position: absolute;
    transition: var(--transition-slow);
  }

  .card-pos-left {
    left: 0;
    top: 20px;
    transform: rotate(-10deg) scale(0.9);
    z-index: 5;
  }
  .card-pos-left.shift {
    left: -20px;
    transform: rotate(-15deg) scale(0.9);
  }

  .card-pos-mid {
    left: 100px;
    top: 10px;
    transform: rotate(0deg) scale(0.95);
    z-index: 10;
  }
  .card-pos-mid.shift {
    left: 90px;
    transform: rotate(-2deg) scale(0.95);
  }

  .card-pos-right {
    left: 200px;
    top: 0px;
    transform: rotate(10deg) scale(1);
    z-index: 15;
  }
  .card-pos-right.shift {
    left: 220px;
    transform: rotate(12deg) scale(1.02);
  }

  /* Footer Details Grid */
  .footer-details-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 32px;
    padding: var(--space-2xl) 0;
    border-bottom: 1px solid var(--color-border-light);
    width: 100%;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-col-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-weight: 600;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footer-logo .logo-text {
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  .logo-img-footer {
    width: 20px;
    height: 20px;
    object-fit: contain;
    border-radius: 4px;
  }

  .brand-pitch, .office-address, .phone-link, .social-link {
    font-size: 13px;
    color: var(--color-text-sec);
    line-height: 1.6;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .social-link:hover {
    color: var(--color-text-main);
    text-decoration: underline;
  }

  /* Copyright Row */
  .footer-copyright-row {
    padding-top: var(--space-xl);
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .copyright-text {
    font-size: 11px;
    color: var(--color-text-muted);
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  @media (max-width: 1024px) {
    .cta-inner-grid {
      grid-template-columns: 1fr;
      gap: 60px;
      padding-bottom: var(--space-2xl);
    }
    
    .cta-right-container {
      justify-content: center;
    }
    
    .giant-get-started-btn {
      left: 30%;
    }
  }

  @media (max-width: 768px) {
    .footer-details-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  @media (max-width: 480px) {
    .cta-heading {
      font-size: 36px;
    }
    
    .card-fan-row {
      width: 100%;
      max-width: 320px;
    }
    
    .cta-card {
      transform: scale(0.7) !important;
    }
    
    .card-pos-left { left: -30px; }
    .card-pos-mid { left: 40px; }
    .card-pos-right { left: 110px; }
    
    .giant-get-started-btn {
      width: 100px;
      height: 100px;
      left: 20%;
    }
    .giant-get-started-btn:hover, .giant-get-started-btn.expand {
      width: 110px;
      height: 110px;
    }
    .btn-text { font-size: 12px; }
  }
</style>
