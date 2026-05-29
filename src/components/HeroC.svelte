<script>
  export let theme = "light";
  import showcaseMockup from "../assets/app_showcase_mockup_c.png";
  import Card from "./Card.svelte";
  import logoImg from "../assets/logo.png";
  import headphonePortrait from "../assets/african_merchant_profile.png";

  const features = [
    {
      title: "Smart Payments",
      desc: "Easily create, customize, and share payment links or scan QR codes instantly."
    },
    {
      title: "Instant Settlement",
      desc: "Funds settle directly into your wallet or bank account immediately without delays."
    },
    {
      title: "Physical & Virtual Cards",
      desc: "Issue credit and debit cards to your team, manage limits, and track spending."
    }
  ];

  let scrollY = 0; // Bind to page scroll coordinate for 3D parallax offsets
</script>

<svelte:window bind:scrollY />

<section class="hero-c-section {theme}" style:--scroll-y={scrollY}>
  <!-- Top Intro Section -->
  <div class="hero-c-top">
    <span class="hero-c-subtitle">Your Business, in Perfect Rhythm.</span>
    <h1 class="hero-c-title">
      Built With <br />
      <span class="hero-accent-you">You</span> In Mind.
    </h1>
    <p class="hero-c-description">
      Take control of your revenue with our all-in-one payments app. Accept money, track progress, and focus on growing your business—without the overwhelm.
    </p>

    <!-- Outlined Pill CTA -->
    <a href="https://pay.flotme.ai/" class="cta-pill-c" target="_blank" rel="noopener noreferrer">
      <span>TRY IT FOR FREE</span>
      <svg class="arrow-icon-c" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </a>
  </div>

  <!-- Center Graphic Stage with Mesh Gradient Backdrop -->
  <div class="hero-c-stage">
    <!-- Mesh Gradient Orb Background -->
    <div class="mesh-backdrop">
      <div class="glow-orb orb-pink"></div>
      <div class="glow-orb orb-orange"></div>
      <div class="glow-orb orb-yellow"></div>
      <div class="glow-orb orb-blue"></div>
    </div>

    <!-- Centered Visual Showcase Container -->
    <div class="visual-canvas">
      <!-- Floating fanned cards on left and right -->
      <div class="orbiting-card card-orbit-left">
        <div class="animate-orbit-left">
          <Card type="black" cardholder="Isatu Bangura" expiry="08/30" cardNumber="5412 7556 7812 3456" cvv="321" interactive={false} />
        </div>
      </div>
      
      <div class="orbiting-card card-orbit-right">
        <div class="animate-orbit-right">
          <Card type="yellow" cardholder="Mohamed B." expiry="12/28" cardNumber="5412 7588 1922 4311" interactive={false} />
        </div>
      </div>

      <!-- Centered hand holding phone mockup -->
      <div class="phone-hand-container">
        <div class="animate-float-c">
          <img src={showcaseMockup} class="hand-image-c" alt="Flot app mockup held by hand" />
        </div>
      </div>
    </div>
  </div>

  <!-- Split Info Section Below the Visual Stage -->
  <div class="split-info-section">
    <div class="split-heading-col">
      <h2 class="split-heading">
        Designed to Help <br />
        You Grow <i>With Less Friction</i>
      </h2>
    </div>
    
    <div class="split-paragraph-col">
      <p class="split-paragraph">
        Our business app is built for modern merchants who want to stay organized, focused, and in full control of their cashflow. Settle immediately and pay suppliers securely.
      </p>
    </div>
  </div>

  <!-- Three Columns of Features -->
  <div class="features-three-col">
    {#each features as feat, i}
      <div class="feature-col-card">
        <div class="feature-col-index">0{i + 1}</div>
        <h3 class="feature-col-title">{feat.title}</h3>
        <p class="feature-col-desc">{feat.desc}</p>
      </div>
    {/each}
  </div>

  <!-- Full-bleed vibrant bottom profile banner with generated Black African headphone portrait -->
  <div class="bottom-profile-banner">
    <!-- Overlay mesh gradient to match headphones image neon background -->
    <div class="profile-banner-mesh"></div>
    
    <div class="profile-banner-grid">
      <div class="profile-banner-text">
        <span class="profile-banner-tag">CUSTOMER SUCCESS STORY</span>
        <h2 class="profile-banner-heading">Designed for the modern merchant.</h2>
        <blockquote class="profile-quote">
          "Flot has completely transformed how I run my boutique. I accept customer payments, settle instantly, pay suppliers, and manage cards all in one single app."
        </blockquote>
        <div class="profile-author">
          <span class="author-name">Fatmata S.</span>
          <span class="author-title">Boutique Owner & Flot Merchant</span>
        </div>
      </div>
      
      <div class="profile-banner-image-container">
        <img src={headphonePortrait} class="profile-portrait-img" alt="Flot partner customer wearing headphones" />
      </div>
    </div>
  </div>
</section>

<style>
  /* Base Hero C container */
  .hero-c-section {
    position: relative;
    width: 100%;
    background-color: var(--color-bg-light);
    padding-top: 140px; /* navbar spacing */
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Top Intro Text Blocks */
  .hero-c-top {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 0 var(--space-lg);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    z-index: 5;
  }

  .hero-c-subtitle {
    font-family: var(--font-body);
    font-size: 16px;
    font-style: italic;
    font-weight: 500;
    color: var(--color-text-sec);
    letter-spacing: -0.01em;
  }

  .hero-c-title {
    font-size: 64px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.05em;
    color: var(--color-text-main);
  }

  .hero-c-description {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-sec);
    max-width: 600px;
  }

  /* Outlined Pill CTA */
  .cta-pill-c {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 1px solid var(--color-text-main);
    color: var(--color-text-main);
    padding: 12px 28px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: transparent;
    transition: var(--transition-smooth);
    margin-top: 8px;
  }

  .cta-pill-c:hover {
    background-color: var(--color-text-main);
    color: var(--color-white);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .arrow-icon-c {
    transition: transform 0.3s ease;
  }

  .cta-pill-c:hover .arrow-icon-c {
    transform: translateX(4px);
  }

  /* Center Stage and Mesh Gradient Backdrop */
  .hero-c-stage {
    position: relative;
    width: 100%;
    min-height: 520px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 40px;
    z-index: 2;
  }

  /* Vibrant Mesh Orb Background */
  .mesh-backdrop {
    position: absolute;
    top: 5%;
    left: 10%;
    right: 10%;
    bottom: 5%;
    filter: blur(80px);
    opacity: 0.55;
    z-index: 1;
    pointer-events: none;
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
  }

  .orb-pink {
    width: 320px;
    height: 320px;
    background: #ff5ebc;
    top: 10%;
    left: 20%;
    opacity: 0.6;
    animation: pulse-pink 12s ease-in-out infinite;
  }

  .orb-orange {
    width: 280px;
    height: 280px;
    background: #ff8e53;
    bottom: 15%;
    right: 25%;
    opacity: 0.5;
    animation: pulse-orange 10s ease-in-out infinite;
  }

  .orb-yellow {
    width: 250px;
    height: 250px;
    background: #ffea79;
    top: 25%;
    right: 15%;
    opacity: 0.5;
  }

  .orb-blue {
    width: 300px;
    height: 300px;
    background: #5be0ff;
    bottom: 10%;
    left: 15%;
    opacity: 0.4;
  }

  @keyframes pulse-pink {
    0%, 100% { transform: scale(1) translate(0, 0); }
    50% { transform: scale(1.15) translate(30px, -20px); }
  }

  @keyframes pulse-orange {
    0%, 100% { transform: scale(1) translate(0, 0); }
    50% { transform: scale(1.2) translate(-40px, 30px); }
  }

  /* Graphic Canvas styling */
  .visual-canvas {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 860px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 5;
  }

  .phone-hand-container {
    width: 900px;
    height: auto;
    z-index: 8; /* Phone and Hand are now a layer above the cards */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    /* Soft edges for visual blend */
    mask-image: radial-gradient(circle at 50% 40%, black 75%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at 50% 40%, black 75%, transparent 100%);
    /* Parallax Scroll offset translateY */
    transform: translateY(calc(var(--scroll-y, 0) * 0.08px));
    transition: transform 0.1s ease-out;
  }

  .hand-image-c {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    /* Soft premium drop shadow for light mode to lift and cover edges */
    filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.08)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.05));
    transition: filter 0.3s ease;
  }

  /* Ambient glowing light halo in dark mode */
  :global(.app-layout.theme-dark) .hand-image-c {
    filter: drop-shadow(0 0 25px rgba(133, 253, 198, 0.22)) drop-shadow(0 0 50px rgba(91, 224, 255, 0.12));
  }

  /* Orbiting Credit Cards */
  .orbiting-card {
    position: absolute;
    width: 320px;
    height: 200px;
    pointer-events: none;
    z-index: 4; /* Cards are now layered behind the phone and hand */
    /* Parallax scroll translation + scale multiplier */
    transform: translateY(calc(var(--scroll-y, 0) * var(--parallax-speed, -0.15px))) var(--card-scale, scale(1));
    transition: transform 0.1s ease-out;
  }

  .card-orbit-left {
    left: -60px;
    bottom: 360px;
    --parallax-speed: -0.15px;
  }

  .card-orbit-right {
    right: -60px;
    bottom: 280px;
    --parallax-speed: -0.22px;
  }

  /* Split layout section below visual stage */
  .split-info-section {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 80px var(--space-lg) 40px var(--space-lg);
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 40px;
    align-items: center;
    border-top: 1px solid var(--color-border-light);
    z-index: 5;
  }

  .split-heading {
    font-size: 40px;
    line-height: 1.15;
    font-weight: 700;
    color: var(--color-text-main);
    letter-spacing: -0.04em;
  }

  .split-heading i {
    font-family: serif;
    font-style: italic;
    font-weight: 400;
  }

  .split-paragraph {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-sec);
  }

  /* Feature Grid List (3-Column) */
  .features-three-col {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 20px var(--space-lg) 80px var(--space-lg);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    z-index: 5;
  }

  .feature-col-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 0;
    border-top: 1px solid var(--color-border-light);
  }

  .feature-col-index {
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-muted);
  }

  .feature-col-title {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
    letter-spacing: -0.02em;
  }

  .feature-col-desc {
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-sec);
  }

  /* Full-bleed bottom success story banner */
  .bottom-profile-banner {
    position: relative;
    width: 100%;
    /* Blends 100% with the teal/charcoal portrait image background */
    background: radial-gradient(circle at 75% 50%, #212429 0%, #0d171a 50%, #0a1115 100%);
    padding: 0;
    overflow: hidden;
    z-index: 10;
    border-top: 1px solid rgba(133, 253, 198, 0.1);
  }

  .profile-banner-mesh {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Subtle overlay glow of the primary color */
    background: radial-gradient(circle at 75% 50%, rgba(133, 253, 198, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
    z-index: 1;
  }

  .profile-banner-grid {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: 40px;
    padding: 0 var(--space-lg);
    z-index: 2;
    position: relative;
  }

  .profile-banner-text {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--color-white);
  }

  .profile-banner-tag {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--color-accent);
  }

  .profile-banner-heading {
    font-size: 38px;
    font-weight: 700;
    color: var(--color-white);
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  .profile-quote {
    font-family: serif;
    font-style: italic;
    font-size: 22px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    position: relative;
    padding-left: 20px;
    border-left: 3px solid var(--color-accent);
  }

  .profile-author {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 10px;
  }

  .author-name {
    font-family: var(--font-heading);
    font-size: 16px;
    font-weight: 700;
    color: var(--color-white);
  }

  .author-title {
    font-family: var(--font-body);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .profile-banner-image-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-self: end;
  }

  .profile-portrait-img {
    max-height: 480px;
    width: auto;
    object-fit: contain;
    display: block;
    /* Removed borders and shadow to achieve 100% seamless color blending */
    border-radius: 0;
    box-shadow: none;
  }

  /* Micro-animations */
  @keyframes orbit-left {
    0%, 100% { transform: rotateY(15deg) rotateX(10deg) rotateZ(-12deg) translateY(0); }
    50% { transform: rotateY(18deg) rotateX(8deg) rotateZ(-9deg) translateY(-12px); }
  }

  @keyframes orbit-right {
    0%, 100% { transform: rotateY(-15deg) rotateX(10deg) rotateZ(12deg) translateY(0); }
    50% { transform: rotateY(-18deg) rotateX(12deg) rotateZ(9deg) translateY(-14px); }
  }

  @keyframes float-c {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .animate-orbit-left {
    animation: orbit-left 8s ease-in-out infinite;
  }

  .animate-orbit-right {
    animation: orbit-right 7s ease-in-out infinite;
  }

  .animate-float-c {
    animation: float-c 6s ease-in-out infinite;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-c-title {
      font-size: 48px;
    }

    .split-info-section {
      grid-template-columns: 1fr;
      gap: 20px;
      padding-top: 60px;
    }

    .features-three-col {
      grid-template-columns: 1fr;
      gap: 16px;
      padding-bottom: 60px;
    }

    .feature-col-card {
      padding: 16px 0;
    }

    .profile-banner-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .profile-banner-text {
      padding-bottom: 20px;
    }

    .profile-banner-image-container {
      justify-content: center;
    }

    .profile-portrait-img {
      max-height: 380px;
    }

    .visual-canvas {
      max-width: 900px;
      height: 640px;
    }

    .phone-hand-container {
      width: 600px;
    }

    .card-orbit-left {
      left: -80px;
      bottom: 260px;
    }

    .card-orbit-right {
      right: -80px;
      bottom: 180px;
    }
  }

  @media (max-width: 768px) {
    .hero-c-section {
      padding-top: 100px;
    }

    .hero-c-title {
      font-size: 38px;
    }

    .hero-c-stage {
      min-height: 400px;
    }

    .visual-canvas {
      max-width: 700px;
      height: 500px;
    }

    .phone-hand-container {
      width: 450px;
    }

    .orbiting-card {
      --card-scale: scale(0.65);
    }

    .card-orbit-left {
      left: -60px;
      bottom: 180px;
    }

    .card-orbit-right {
      right: -60px;
      bottom: 120px;
    }

    .split-heading {
      font-size: 30px;
    }

    .profile-banner-heading {
      font-size: 30px;
    }

    .profile-quote {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    .hero-c-stage {
      min-height: 320px;
    }

    .visual-canvas {
      max-width: 500px;
      height: 380px;
    }

    .phone-hand-container {
      width: 330px;
    }

    .orbiting-card {
      --card-scale: scale(0.48);
    }

    .card-orbit-left {
      left: -90px;
      bottom: 110px;
    }

    .card-orbit-right {
      right: -90px;
      bottom: 80px;
    }
  }
</style>
