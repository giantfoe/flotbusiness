<script>
  export let theme = "light";
  import logoImg from "../assets/logo.png";
  import avatarMohamed from "../assets/testimonial_mohamed.png";
  import avatarFatmata from "../assets/testimonial_fatmata.png";
  import avatarMerchant from "../assets/african_merchant_profile.png";
  import Card from "./Card.svelte";

  // 18 credit cards structured for a seamless loop in the radial marquee
  const cards = [
    { type: "black", cardholder: "Fatmata Koroma", expiry: "12/28", cardNumber: "•••• •••• •••• 2243", cvv: "945" },
    { type: "yellow", cardholder: "Mohamed Kamara", expiry: "04/27", cardNumber: "•••• •••• •••• 1357", cvv: "102" },
    { type: "green", cardholder: "Aminata Sesay", expiry: "09/29", cardNumber: "•••• •••• •••• 1122", cvv: "704" },
    { type: "glass", cardholder: "Alusine Kargbo", expiry: "11/26", cardNumber: "•••• •••• •••• 7654", cvv: "331" },
    { type: "black", cardholder: "Sahr Bangura", expiry: "08/28", cardNumber: "•••• •••• •••• 9876", cvv: "522" },
    { type: "yellow", cardholder: "Kadiatu Mansaray", expiry: "02/27", cardNumber: "•••• •••• •••• 4455", cvv: "889" },
    { type: "green", cardholder: "Lansana Conteh", expiry: "05/29", cardNumber: "•••• •••• •••• 1212", cvv: "304" },
    { type: "glass", cardholder: "Tenneh Kamara", expiry: "07/26", cardNumber: "•••• •••• •••• 8899", cvv: "415" },
    { type: "black", cardholder: "Abu Bakar Diallo", expiry: "10/28", cardNumber: "•••• •••• •••• 5544", cvv: "921" },
    { type: "yellow", cardholder: "Isatu Bah", expiry: "03/27", cardNumber: "•••• •••• •••• 6677", cvv: "115" },
    { type: "green", cardholder: "Samuel Turay", expiry: "06/29", cardNumber: "•••• •••• •••• 2233", cvv: "407" },
    { type: "glass", cardholder: "Mariama Jalloh", expiry: "01/26", cardNumber: "•••• •••• •••• 9988", cvv: "882" },
    { type: "black", cardholder: "Ibrahim Fofanah", expiry: "11/28", cardNumber: "•••• •••• •••• 7766", cvv: "613" },
    { type: "yellow", cardholder: "Yeabu Kabia", expiry: "07/27", cardNumber: "•••• •••• •••• 3344", cvv: "209" },
    { type: "green", cardholder: "Musa Barrie", expiry: "12/29", cardNumber: "•••• •••• •••• 5566", cvv: "311" },
    { type: "glass", cardholder: "Finda Konneh", expiry: "05/26", cardNumber: "•••• •••• •••• 4433", cvv: "552" },
    { type: "black", cardholder: "Osman Tarawally", expiry: "09/28", cardNumber: "•••• •••• •••• 1155", cvv: "701" },
    { type: "yellow", cardholder: "Zainab Dumbuya", expiry: "01/27", cardNumber: "•••• •••• •••• 8822", cvv: "993" }
  ];
</script>

<section class="hero-b-outer-container {theme}">
  <!-- Ambient background lighting patterns and micro-noise grid -->
  <div class="mesh-bg">
    <div class="grid-overlay"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>
    <div class="noise-overlay"></div>
  </div>

  <!-- Main Hero Layout -->
  <div class="hero-b-layout">
    <!-- Eyebrow Tagline -->
    <div class="eyebrow-wrapper">
      <span class="badge-pill">
        <span class="pulse-dot"></span>
        <span>Flot for Business</span>
      </span>
    </div>

    <!-- Centered Fortune 500 Headline -->
    <h1 class="hero-heading">
      Built With 
      <span class="accent-wrapper">
        <span class="you-text">You</span>
        <svg class="smile-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M 5 2 Q 50 22, 95 2" fill="none" />
        </svg>
      </span> 
      In Mind.
    </h1>

    <!-- Centered Subtext -->
    <p class="hero-subtext">
      Accept payments from Flot, Mobile Money, Visa, and Mastercard — with instant settlement into your Flot Business account. Local or global — one platform.
    </p>

    <!-- Centered CTAs -->
    <div class="cta-group">
      <a href="https://pay.flotme.ai/" class="btn-primary" target="_blank" rel="noopener noreferrer">
        <span>Get Started</span>
        <span class="btn-arrow-circle">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </a>
    </div>

    <!-- Social Proof row -->
    <div class="social-proof">
      <div class="avatars-group">
        <img src={avatarFatmata} alt="Merchant User" />
        <img src={avatarMohamed} alt="Developer User" />
        <img src={avatarMerchant} alt="Business Partner" />
      </div>
      <div class="proof-info">
        <span class="proof-count">10k+ Merchants</span>
        <span class="proof-label">joined to scale across Africa</span>
      </div>
    </div>
  </div>

  <!-- Radial Credit Card Marquee redrawn from hadi-community.de -->
  <!-- Placed outside hero-b-layout to span full viewport width for symmetric centering -->
  <div class="radial-marquee_wrap">
    <div class="radial-marquee_layout">
      <div class="radial-marquee_mask">
        <div class="radial-marquee_circle">
          <div class="radial-marquee_list">
            {#each cards as card, index}
              <div 
                class="radial-marquee_item"
                style:transform="translateY(var(--radial-marquee--y-offset)) rotate({index * 20}deg)"
              >
                <div class="radial-marquee_card">
                  <Card 
                    type={card.type}
                    cardholder={card.cardholder}
                    expiry={card.expiry}
                    cardNumber={card.cardNumber}
                    cvv={card.cvv}
                    interactive={false}
                  />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div class="radial-marquee_overlay"></div>
    </div>
  </div>
</section>

<style>
  /* Base Hero B Container styling with custom fonts and variables */
  .hero-b-outer-container {
    --font-serif: 'Instrument Serif', serif;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 120px 24px 0 24px;
    margin-bottom: -180px; /* Pull marquee banner up flush against the card arc bottom edge */
    background-color: var(--color-bg-light);
    overflow: hidden;
    
    /* Radial marquee variables */
    --radial-marquee--item-size: 280px;
    --radial-marquee--radius: 1200px;
    --radial-marquee--y: calc(var(--radial-marquee--radius) / (var(--radial-marquee--item-size) * 0.625) * 100%);
    --radial-marquee--y-offset: calc((var(--radial-marquee--y) * -1) + 50%);
  }

  .hero-b-outer-container.dark {
    /* Majestic Green Deep Glow Base matching Flot aesthetics */
    background: radial-gradient(circle at 50% -20%, #112d20 0%, #08130f 50%, #030605 100%);
  }

  /* Responsive Marquee Dimensions */
  @media (max-width: 1024px) {
    .hero-b-outer-container {
      --radial-marquee--item-size: 230px;
      --radial-marquee--radius: 950px;
      padding-top: 100px;
    }
  }

  @media (max-width: 768px) {
    .hero-b-outer-container {
      --radial-marquee--item-size: 180px;
      --radial-marquee--radius: 750px;
      padding-top: 90px;
    }
  }

  @media (max-width: 480px) {
    .hero-b-outer-container {
      --radial-marquee--item-size: 140px;
      --radial-marquee--radius: 580px;
      padding-top: 80px;
    }
  }

  /* Ambient Background elements styling */
  .mesh-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(rgba(26, 26, 26, 0.04) 1px, transparent 1px),
      radial-gradient(rgba(26, 26, 26, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
    pointer-events: none;
  }

  .dark .grid-overlay {
    background-image: 
      radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  }

  .noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.015;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .dark .noise-overlay {
    opacity: 0.045;
  }

  /* Shifting animated orbs */
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    will-change: transform;
  }

  /* Light Theme glowing mesh elements */
  .orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(133, 253, 198, 0.22) 0%, rgba(133, 253, 198, 0) 70%);
    top: -15%;
    right: -10%;
    animation: floatOrb 25s infinite alternate ease-in-out;
  }

  .orb-2 {
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(133, 253, 198, 0.18) 0%, rgba(133, 253, 198, 0) 70%);
    bottom: -20%;
    left: -10%;
    animation: floatOrb 30s infinite alternate-reverse ease-in-out;
  }

  .orb-3 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(133, 253, 198, 0.12) 0%, rgba(133, 253, 198, 0) 70%);
    top: 30%;
    left: 20%;
  }

  /* Dark Theme neon mesh gradient orbs */
  .dark .orb-1 {
    background: radial-gradient(circle, rgba(13, 85, 52, 0.5) 0%, rgba(5, 26, 16, 0) 70%);
    top: -10%;
    right: -10%;
    animation: floatOrb 22s infinite alternate ease-in-out;
  }

  .dark .orb-2 {
    background: radial-gradient(circle, rgba(133, 253, 198, 0.06) 0%, rgba(11, 26, 19, 0) 70%);
    bottom: -15%;
    left: -10%;
    animation: floatOrb 28s infinite alternate-reverse ease-in-out;
  }

  .dark .orb-3 {
    background: radial-gradient(circle, rgba(9, 102, 59, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
    top: 35%;
    left: 30%;
  }

  @keyframes floatOrb {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -30px) scale(1.08); }
    100% { transform: translate(-20px, 20px) scale(0.94); }
  }

  /* Centered Layout elements */
  .hero-b-layout {
    position: relative;
    width: 100%;
    max-width: 1200px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .eyebrow-wrapper {
    margin-bottom: 24px;
  }

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(133, 253, 198, 0.15);
    border: 1px solid rgba(133, 253, 198, 0.3);
    color: #0b663b;
    padding: 6px 16px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .dark .badge-pill {
    background: rgba(133, 253, 198, 0.08);
    border-color: rgba(133, 253, 198, 0.15);
    color: var(--color-accent);
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #28a745;
    animation: pulseGlow 2s infinite;
  }

  @keyframes pulseGlow {
    0% { transform: scale(0.9); opacity: 0.6; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(0.9); opacity: 0.6; }
  }

  .hero-heading {
    font-family: var(--font-heading);
    font-size: clamp(2.25rem, 6vw, 4.5rem);
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--color-text-main);
    max-width: 900px;
    margin-bottom: 24px;
  }

  .dark .hero-heading {
    color: #ffffff;
  }

  .accent-wrapper {
    position: relative;
    display: inline-block;
  }

  .you-text {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 500;
    color: #0b663b;
    padding-right: 4px;
  }

  .dark .you-text {
    color: var(--color-accent);
  }

  .smile-underline {
    position: absolute;
    bottom: -11px;
    left: 0;
    width: 100%;
    height: 18px;
    pointer-events: none;
    overflow: visible;
  }

  .smile-underline path {
    stroke: #0b663b;
    stroke-width: 2.5;
    stroke-linecap: round;
    fill: none;
  }

  .dark .smile-underline path {
    stroke: var(--color-accent);
    filter: drop-shadow(0 0 5px rgba(133, 253, 198, 0.6));
  }

  .hero-subtext {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.25vw, 1.15rem);
    line-height: 1.6;
    color: var(--color-text-sec);
    max-width: 580px;
    margin-bottom: 40px;
  }

  .dark .hero-subtext {
    color: rgba(255, 255, 255, 0.7);
  }

  /* Centered CTA Buttons */
  .cta-group {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #111111;
    color: #ffffff;
    padding: 14px 16px 14px 28px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    transition: var(--transition-smooth);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }

  .dark .btn-primary {
    background: #ffffff;
    color: #111111;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    background: #0b663b;
    color: #ffffff;
    box-shadow: 0 14px 32px rgba(11, 102, 59, 0.25);
  }

  .dark .btn-primary:hover {
    background: var(--color-accent);
    color: #111111;
    box-shadow: 0 14px 32px rgba(133, 253, 198, 0.25);
  }

  .btn-arrow-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: var(--color-accent);
    color: var(--color-text-main);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .dark .btn-arrow-circle {
    background-color: #0b1a13;
    color: var(--color-accent);
  }

  .btn-primary:hover .btn-arrow-circle {
    transform: translateX(4px);
  }

  /* Social proof user row */
  .social-proof {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 80px;
  }

  .avatars-group {
    display: flex;
  }

  .avatars-group img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    margin-right: -10px;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  }

  .dark .avatars-group img {
    border-color: #0c1c15;
  }

  .avatars-group img:last-child {
    margin-right: 0;
  }

  .proof-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .proof-count {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-main);
    line-height: 1.2;
  }

  .dark .proof-count {
    color: #ffffff;
  }

  .proof-label {
    font-family: var(--font-body);
    font-size: 11px;
    color: var(--color-text-muted);
  }

  /* Radial Credit Card Wheel container from hadi-community.de */
  .radial-marquee_wrap {
    position: relative;
    z-index: 3;
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-right: -24px;
    height: 480px;
    pointer-events: none;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .radial-marquee_wrap {
      height: 390px;
    }
  }

  @media (max-width: 768px) {
    .radial-marquee_wrap {
      height: 310px;
    }
  }

  @media (max-width: 480px) {
    .radial-marquee_wrap {
      height: 240px;
    }
  }

  .radial-marquee_layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .radial-marquee_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(black 30%, transparent 75%);
    mask-image: linear-gradient(black 30%, transparent 75%);
  }

  .radial-marquee_circle {
    position: absolute;
    top: calc(var(--radial-marquee--radius) + 60px);
    left: 50%;
    width: 0;
    height: 0;
  }

  .radial-marquee_list {
    position: absolute;
    width: 0;
    height: 0;
    will-change: transform;
    transform-origin: center center;
    animation: 70s linear infinite radialMarqueeRotate;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto; /* Allow hover to pause the marquee */
  }

  /* Pauses circle rotation on hover to let the cards details be read */
  .radial-marquee_list:hover {
    animation-play-state: paused;
  }

  .radial-marquee_item {
    position: absolute;
    left: calc(var(--radial-marquee--item-size) * -0.5);
    top: calc(var(--radial-marquee--item-size) * 0.625 * -0.5);
    width: var(--radial-marquee--item-size);
    height: calc(var(--radial-marquee--item-size) * 0.625);
    transform-origin: center var(--radial-marquee--y);
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radial-marquee_card {
    width: 320px;
    height: 200px;
    transform: scale(calc(var(--radial-marquee--item-size) / 320px));
    transform-origin: center center;
    flex: none;
    border-radius: 20px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.16);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }

  .radial-marquee_item:hover .radial-marquee_card {
    /* Subtle popout on hover when paused */
    transform: scale(calc(var(--radial-marquee--item-size) / 320px * 1.08));
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .radial-marquee_overlay {
    background-image: linear-gradient(90deg, var(--color-bg-light), transparent 8%, transparent 92%, var(--color-bg-light));
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }

  .dark .radial-marquee_overlay {
    background-image: linear-gradient(90deg, #030605, transparent 8%, transparent 92%, #030605);
  }

  @keyframes radialMarqueeRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
</style>
