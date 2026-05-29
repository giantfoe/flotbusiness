<script>
  export let theme = "light";
  import showcaseMockup from "../assets/app_showcase_mockup_c.png";
  import Card from "./Card.svelte";
  import logoImg from "../assets/logo.png";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let scrollY = 0;
  let windowHeight = 0;
  let windowWidth = 1200;
  let element;

  // Svelte motion tweened stores for ultra-smooth easing/inertia scrolling
  const smoothedProgress = tweened(0, {
    duration: 200,
    easing: cubicOut
  });

  const smoothedScrollY = tweened(0, {
    duration: 200,
    easing: cubicOut
  });

  // Background scattered credit cards arrangement around the center
  const bgCards = [
    { type: 'black', x: -360, y: -180, rotate: -25, scale: 0.82, speedX: -2.2, speedY: -1.6, rotateSpeed: -0.15, cardholder: "Fatmata S.", expiry: "09/29", cardNumber: "5412 8820 9012 3411", cvv: "432" },
    { type: 'yellow', x: 360, y: -220, rotate: 20, scale: 0.88, speedX: 2.4, speedY: -1.8, rotateSpeed: 0.2, cardholder: "Mohamed B.", expiry: "12/28", cardNumber: "5412 7588 1922 4311", cvv: "901" },
    { type: 'green', x: -420, y: 10, rotate: 12, scale: 0.8, speedX: -2.6, speedY: 0.3, rotateSpeed: -0.08, cardholder: "Isatu B.", expiry: "06/30", cardNumber: "5412 1109 8834 2566", cvv: "112" },
    { type: 'glass', x: 420, y: 30, rotate: -18, scale: 0.85, speedX: 2.8, speedY: 0.4, rotateSpeed: 0.12, cardholder: "Alusine K.", expiry: "04/27", cardNumber: "5412 5590 1288 3477", cvv: "704" },
    { type: 'glass-back', x: -320, y: 200, rotate: -10, scale: 0.78, speedX: -1.8, speedY: 2.0, rotateSpeed: 0.05, cardholder: "Fatmata S.", expiry: "09/29", cvv: "432" },
    { type: 'black', x: 300, y: 220, rotate: 28, scale: 0.8, speedX: 2.0, speedY: 2.2, rotateSpeed: -0.12, cardholder: "Sorie D.", expiry: "01/31", cardNumber: "5412 9904 1123 5890", cvv: "667" }
  ];

  // Floating status bubbles that rise out of the phone
  const floatingBubbles = [
    { text: "Orange Money Settled", amount: "+Le25,000", time: "Just now", type: "success", x: -280, y: 150, speedX: -1.2, speedY: -2.8 },
    { text: "Visa Payment Received", amount: "+Le12,500", time: "1m ago", type: "payment", x: 260, y: -20, speedX: 1.0, speedY: -3.2 },
    { text: "Supplier Payout Done", amount: "-Le4,200", time: "3m ago", type: "payout", x: -290, y: -100, speedX: -0.8, speedY: -2.4 },
    { text: "Africell Money Settled", amount: "+Le9,400", time: "5m ago", type: "settled", x: 280, y: 180, speedX: 1.4, speedY: -2.6 }
  ];

  // Reactive updates for smooth scroll-driven parallax using global scroll coordinate
  $: {
    const targetProgress = Math.max(0, Math.min(1, scrollY / (windowHeight || 800)));
    smoothedProgress.set(targetProgress);
    smoothedScrollY.set(scrollY);
  }

  // Reactive variables based on smoothedProgress (range 0 to 1)
  $: textProgress = Math.min(1, $smoothedProgress * 2.2); // Fades out by ~45% scroll
  $: textY = -textProgress * 140; // Slides up by 140px
  $: textOpacity = 1 - textProgress;

  $: cardProgress = Math.min(1, $smoothedProgress * 1.5); // Cards disperse and fade by 65% scroll
  $: cardScaleMult = 1 + cardProgress * 0.7;
  $: cardOpacity = 1 - cardProgress * 1.2; // Fades out completely

  // Hand holding the phone is visible on load at bottom center, and moves up slightly on scroll
  $: isMobile = windowWidth < 768;
  $: startY = isMobile ? 32 : 12;
  $: targetY = isMobile ? 16 : 0;
  $: handY = startY - $smoothedProgress * (startY - targetY);
  $: handScale = 0.95 + $smoothedProgress * 0.05; // Scales from 0.95 to 1.0
  $: handOpacity = 1.0; // Fully visible on load

  // Bubbles start fading in and rising shortly after scroll begins
  $: bubbleProgress = Math.max(0, ($smoothedProgress - 0.08) / 0.7); // Starts at 8% scroll
  $: bubbleOpacity = Math.min(1, bubbleProgress * 4.0);
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<div bind:this={element} class="hero-d-scroll-track {theme}">
    
    <!-- Deep Ambient Glow Backdrops -->
    <div class="hero-d-mesh-backdrop">
      <div class="mesh-orb orb-1" style:transform="translate({$smoothedScrollY * 0.1}px, {$smoothedScrollY * -0.05}px) rotate({$smoothedScrollY * 0.02}deg)"></div>
      <div class="mesh-orb orb-2" style:transform="translate({$smoothedScrollY * -0.15}px, {$smoothedScrollY * 0.08}px) rotate({$smoothedScrollY * -0.01}deg)"></div>
      <div class="mesh-orb orb-3" style:transform="translate({$smoothedScrollY * 0.05}px, {$smoothedScrollY * 0.12}px)"></div>
    </div>

    <!-- Symmetrical Visual Canvas -->
    <div class="hero-d-canvas">
      
      <!-- 1. Background Scattered Credit Cards (Parallax dispersion) -->
      <div class="hero-d-cards-layer" style:opacity={cardOpacity}>
        {#each bgCards as card}
          <div 
            class="hero-d-card-wrapper" 
            style="
              transform: 
                translate(calc(-50% + {card.x}px + {$smoothedScrollY * card.speedX}px), calc(-50% + {card.y}px + {$smoothedScrollY * card.speedY}px)) 
                rotate({card.rotate + $smoothedScrollY * card.rotateSpeed}deg) 
                scale({card.scale * cardScaleMult});
            "
          >
            <Card 
              type={card.type} 
              cardholder={card.cardholder} 
              expiry={card.expiry} 
              cardNumber={card.cardNumber} 
              cvv={card.cvv} 
              interactive={false} 
            />
          </div>
        {/each}
      </div>

      <!-- 2. Sticky Centered Title Info -->
      <div class="hero-d-header" style:transform="translateY({textY}px)" style:opacity={textOpacity}>
        <div class="hero-d-badge">Flot for Business</div>
        <h1 class="hero-d-heading">
          Built With <br />
          <span class="hero-highlight-wrapper">
            <span class="hero-accent-you">You</span>
            <svg class="hero-underline-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M 5 2 Q 50 22, 95 2" fill="none" />
            </svg>
          </span> In Mind.
        </h1>
        <p class="hero-d-subtext">
          Accept payments from Flot, Mobile Money, Visa, and Mastercard — with instant settlement into your Flot Business account. Local or global — one platform.
        </p>

        <!-- Centered CTAs -->
        <div class="hero-d-ctas">
          <a href="https://pay.flotme.ai/" class="hero-d-btn-primary" target="_blank" rel="noopener noreferrer">
            <span>Get Started</span>
            <svg class="arrow-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="https://wa.me/23299800100" class="hero-d-btn-secondary" target="_blank" rel="noopener noreferrer">
            <svg class="whatsapp-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.519.99 6.086.99 1.662 5.361 1.658 10.79c-.001 1.749.463 3.454 1.343 4.966l-.993 3.627 3.73-.977c1.472.803 3.109 1.229 4.899 1.23h.002z"/>
              <path d="M12.008 1.99c-4.838 0-8.775 3.905-8.778 8.706-.001 1.637.458 3.23 1.328 4.629l.102.164-.783 2.859 2.951-.762.158.093c1.336.792 2.862 1.209 4.437 1.21h.002c4.837 0 8.774-3.906 8.778-8.707.002-2.327-.91-4.515-2.57-6.175s-3.87-2.56-6.175-2.56-6.175.002-8.778 8.707zm5.116 11.942c-.276-.138-1.636-.807-1.89-.899-.253-.092-.437-.138-.621.138-.184.276-.713.899-.874 1.084-.161.184-.322.207-.598.069-.276-.138-1.166-.43-2.22-1.371-.82-.732-1.374-1.636-1.535-1.912-.161-.276-.017-.426.121-.564.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.496-.851-2.048-.224-.54-.469-.466-.621-.474-.161-.008-.345-.008-.529-.008s-.483.069-.736.345c-.253.276-.966.943-.966 2.3s.989 2.668 1.127 2.852c.138.184 1.947 2.974 4.717 4.167.659.284 1.173.454 1.573.581.662.21 1.265.18 1.741.11.531-.079 1.636-.667 1.867-1.31.23-.644.23-1.196.161-1.31-.069-.115-.253-.207-.529-.345z"/>
            </svg>
            <span>Talk to Sales</span>
          </a>
        </div>
      </div>

      <!-- 3. Foreground Phone & Hand rising from bottom -->
      <div 
        class="hero-d-hand-stage" 
        style="
          transform: translateX(-50%) translateY({handY}vh) scale({handScale}); 
          opacity: {handOpacity};
        "
      >
        <div class="hero-d-phone-wrapper">
          <img src={showcaseMockup} class="hero-d-hand-image" alt="Flot App Showcase held by hand" />
          
          <!-- Subtle screen glow -->
          <div class="hero-d-screen-glow"></div>
        </div>

        <!-- 4. Floating transaction bubbles rising up in parallax around the phone -->
        <div class="hero-d-bubbles-layer" style:opacity={bubbleOpacity}>
          {#each floatingBubbles as bubble}
            <div 
              class="hero-d-bubble-wrapper"
              style="
                transform: 
                  translate(calc(-50% + {bubble.x}px + {$smoothedScrollY * bubble.speedX * 0.05}px), calc(-50% + {bubble.y}px + {$smoothedScrollY * bubble.speedY * 0.3}px))
                  scale({Math.min(1, 0.7 + $smoothedProgress * 0.3)});
              "
            >
              <div class="hero-d-bubble-card {bubble.type}">
                <div class="bubble-icon-dot">
                  {#if bubble.type === 'success' || bubble.type === 'settled'}
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  {:else if bubble.type === 'payment'}
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  {:else}
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  {/if}
                </div>
                <div class="bubble-info">
                  <div class="bubble-title">{bubble.text}</div>
                  <div class="bubble-meta">{bubble.time}</div>
                </div>
                <div class="bubble-amount">{bubble.amount}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

    </div>
  </div>

<style>
  /* Scroll-driven layout setup (Non-locking flow) */
  .hero-d-scroll-track {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: var(--color-bg-light);
    color: var(--color-text-main);
    z-index: 10;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Deep Ambient Mesh Gradient backdrops */
  .hero-d-mesh-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    opacity: 0.75;
  }

  .mesh-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    transition: transform 0.2s ease-out;
  }

  .orb-1 {
    width: 450px;
    height: 450px;
    background: #85FDC6;
    top: 15%;
    left: 10%;
  }

  .orb-2 {
    width: 500px;
    height: 500px;
    background: #6df0b5;
    bottom: 10%;
    right: 15%;
  }

  .orb-3 {
    width: 350px;
    height: 350px;
    background: #16a085;
    top: 45%;
    left: 45%;
    filter: blur(140px);
  }

  /* Dark mode mesh glows */
  .hero-d-scroll-track.dark .mesh-orb {
    opacity: 0.25;
    filter: blur(140px);
  }
  .hero-d-scroll-track.dark .orb-1 {
    background: #0b663b;
  }
  .hero-d-scroll-track.dark .orb-2 {
    background: #85FDC6;
  }
  .hero-d-scroll-track.dark .orb-3 {
    background: #234d37;
  }

  /* Visual Canvas */
  .hero-d-canvas {
    position: relative;
    width: 100%;
    max-width: 1280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding: var(--space-xl) var(--space-lg);
  }

  /* Background scattered cards wrapper */
  .hero-d-cards-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    transition: opacity 0.2s ease-out;
  }

  .hero-d-card-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.1s ease-out;
  }

  /* Centered text header */
  .hero-d-header {
    text-align: center;
    max-width: 820px;
    z-index: 7; /* sit in front of the hand mockup initially */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    will-change: transform, opacity;
    transition: transform 0.1s ease-out, opacity 0.1s ease-out;
    margin-bottom: 8vh;
  }

  .hero-d-badge {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #0b663b;
    background: rgba(133, 253, 198, 0.18);
    padding: 6px 14px;
    border-radius: 30px;
    border: 1px solid rgba(133, 253, 198, 0.3);
  }

  .hero-d-scroll-track.dark .hero-d-badge {
    color: var(--color-accent);
    background: rgba(133, 253, 198, 0.08);
    border-color: rgba(133, 253, 198, 0.15);
  }

  .hero-d-heading {
    font-size: 54px;
    line-height: 1.1;
    color: var(--color-text-main);
  }

  .hero-d-subtext {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    color: var(--color-text-sec);
    max-width: 600px;
  }

  /* Centered CTA row */
  .hero-d-ctas {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-top: var(--space-sm);
  }

  .hero-d-btn-primary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: #111111;
    color: #ffffff;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    border-radius: 30px;
    transition: var(--transition-smooth);
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  }

  .hero-d-btn-primary:hover {
    background-color: #0b663b;
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(11, 102, 59, 0.25);
  }

  .hero-d-scroll-track.dark .hero-d-btn-primary {
    background-color: var(--color-accent);
    color: #111111;
    box-shadow: 0 4px 14px rgba(133, 253, 198, 0.25);
  }
  .hero-d-scroll-track.dark .hero-d-btn-primary:hover {
    background-color: #ffffff;
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
  }

  .hero-d-btn-secondary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: transparent;
    color: var(--color-text-main);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    border-radius: 30px;
    border: 1px solid var(--color-border-light);
    transition: var(--transition-smooth);
  }

  .hero-d-btn-secondary:hover {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: var(--color-text-main);
  }

  .hero-d-scroll-track.dark .hero-d-btn-secondary {
    border-color: rgba(255, 255, 255, 0.15);
  }
  .hero-d-scroll-track.dark .hero-d-btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: #ffffff;
  }

  .whatsapp-icon {
    opacity: 0.85;
  }
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  .hero-d-btn-primary:hover .arrow-icon {
    transform: translateX(3px);
  }

  /* Phone & Hand Stage styling */
  .hero-d-hand-stage {
    position: absolute;
    bottom: -10vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    pointer-events: none;
    will-change: transform, opacity;
    transition: transform 0.1s ease-out, opacity 0.1s ease-out;
  }

  .hero-d-phone-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .hero-d-hand-image {
    height: 82vh; /* Make it significantly larger */
    max-height: 720px;
    object-fit: contain;
    filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.18));
  }

  .hero-d-scroll-track.dark .hero-d-hand-image {
    filter: drop-shadow(0 30px 80px rgba(0, 0, 0, 0.65));
  }

  /* Subtle screens glowing backdrops behind the hand */
  .hero-d-screen-glow {
    position: absolute;
    width: 260px;
    height: 350px;
    background: radial-gradient(circle, rgba(133, 253, 198, 0.28) 0%, rgba(133, 253, 198, 0) 70%);
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    filter: blur(25px);
    z-index: -1;
    pointer-events: none;
  }

  /* Parallax bubbles layout */
  .hero-d-bubbles-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    pointer-events: none;
  }

  .hero-d-bubble-wrapper {
    position: absolute;
    left: 50%;
    top: 40%; /* Relative to hand center */
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.1s ease-out;
  }

  /* Custom transaction cards */
  .hero-d-bubble-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px #fff;
    min-width: 250px;
    transition: var(--transition-smooth);
    pointer-events: auto;
  }

  .hero-d-scroll-track.dark .hero-d-bubble-card {
    background: rgba(26, 26, 26, 0.8);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.08);
  }

  .bubble-icon-dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e6fdf3;
    color: #0b663b;
  }

  .hero-d-scroll-track.dark .bubble-icon-dot {
    background: rgba(133, 253, 198, 0.12);
    color: var(--color-accent);
  }

  /* Specialized color highlights for bubble card types */
  .hero-d-bubble-card.payout .bubble-icon-dot {
    background: #fff0f0;
    color: #ea5455;
  }
  .hero-d-scroll-track.dark .hero-d-bubble-card.payout .bubble-icon-dot {
    background: rgba(234, 84, 85, 0.12);
    color: #ff7676;
  }

  .bubble-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: left;
  }

  .bubble-title {
    font-family: var(--font-body);
    font-size: 11.5px;
    font-weight: 600;
    color: var(--color-text-main);
  }

  .bubble-meta {
    font-family: var(--font-body);
    font-size: 9px;
    color: var(--color-text-muted);
    margin-top: 1px;
  }

  .bubble-amount {
    font-family: var(--font-heading);
    font-size: 13.5px;
    font-weight: 700;
    color: #0b663b;
    letter-spacing: -0.01em;
  }

  .hero-d-bubble-card.payout .bubble-amount {
    color: #ea5455;
  }

  .hero-d-scroll-track.dark .bubble-amount {
    color: var(--color-accent);
  }
  .hero-d-scroll-track.dark .hero-d-bubble-card.payout .bubble-amount {
    color: #ff7676;
  }

  /* Responsive Adjustments */
  @media (max-width: 991px) {
    .hero-d-heading {
      font-size: 42px;
    }
    .hero-d-subtext {
      font-size: 16px;
    }
    .hero-d-hand-image {
      height: 70vh;
      max-height: 600px;
    }
  }

  @media (max-width: 768px) {
    .hero-d-heading {
      font-size: 34px;
    }
    .hero-d-subtext {
      font-size: 14px;
      padding: 0 var(--space-md);
    }
    .hero-d-hand-image {
      height: 60vh;
      max-height: 480px;
    }
    .hero-d-badge {
      font-size: 9.5px;
      padding: 4px 10px;
    }
    .hero-d-btn-primary, .hero-d-btn-secondary {
      padding: 12px 22px;
      font-size: 12.5px;
    }
    /* Hide some bubbles or position closely on small screens to prevent clipping */
    .hero-d-bubble-wrapper {
      transform: scale(0.8) !important;
    }
  }
</style>
