<script>
  import { onMount } from "svelte";
  import showcaseMockup from "../assets/app_showcase_mockup.jpg";

  let scrollY = 0;
  let windowHeight = 800;
  let element;

  onMount(() => {
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Calculate relative screen position center offset based on viewport scroll progress
  $: relativeOffset = 0;
  $: {
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewHeight = windowHeight || 800;
      // 0 when top enters the viewport bottom, 1 when bottom exits the viewport top
      const totalDistance = viewHeight + rect.height;
      const currentPos = viewHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDistance));
      relativeOffset = (progress - 0.5) * 120; // Capped range between -60px and +60px
    }
  }

  const features = [
    {
      title: "Send & Receive Money",
      desc: "Send and receive money securely, anytime and anywhere.",
      icon: "send"
    },
    {
      title: "Digital Wallet",
      desc: "Manage your digital wallet from a single app, wherever you are.",
      icon: "wallet"
    },
    {
      title: "Virtual Visa Cards",
      desc: "Access Flot Virtual Visa Cards for fast, secure online payments.",
      icon: "globe"
    },
    {
      title: "Physical Visa Card",
      desc: "Use your Flot Physical Visa Card for purchases and ATM withdrawals where accepted.",
      icon: "card"
    },
    {
      title: "Merchant Payments",
      desc: "Make merchant payments quickly and securely from your phone.",
      icon: "store"
    },
    {
      title: "Real-Time Activity",
      desc: "View your transaction history and account activity in real time.",
      icon: "activity"
    }
  ];
</script>

<section bind:this={element} class="showcase-section section-container">
  <div class="showcase-inner-split">
    <!-- Left Column: Phone mockup -->
    <div class="showcase-visual">
      <div class="hand-visual-container" style="transform: translateY({relativeOffset}px);">
        <img src={showcaseMockup} class="hand-image animate-float" alt="Flot app showcase mockup" />
      </div>
    </div>

    <!-- Right Column: Bullet Points List -->
    <div class="showcase-content">
      <div class="showcase-sublabel">Key Features</div>
      <h2 class="showcase-heading">Everything you need, in one app</h2>
      <p class="showcase-paragraph">
        Whether you're sending money, receiving payments, managing your account, or using your Flot Visa card, Flot gives you a simple, reliable way to access financial services wherever you are.
      </p>

      <ul class="bullet-list">
        {#each features as feature}
          <li class="bullet-item">
            <div class="bullet-icon-container">
              {#if feature.icon === 'send'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              {:else if feature.icon === 'wallet'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
                </svg>
              {:else if feature.icon === 'globe'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              {:else if feature.icon === 'card'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              {:else if feature.icon === 'store'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              {:else if feature.icon === 'activity'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              {/if}
            </div>
            <div class="bullet-text">
              <span class="bullet-title">{feature.title}</span> — {feature.desc}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .showcase-section {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #FAFAFA 0%, #85FDC6 15%, #0b663b 65%, #111111 100%);
    border-bottom: 1px solid var(--color-border-dark);
    overflow: hidden; /* Prevent visual assets from bleeding into sibling sections */
  }

  .showcase-inner-split {
    display: grid;
    grid-template-columns: 1.15fr 1.25fr;
    align-items: center;
    gap: var(--space-3xl);
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  .showcase-visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hand-visual-container {
    position: relative;
    width: 500px;
    height: 500px;
  }

  .hand-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 68%);
    mask-image: radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 68%);
  }

  .showcase-content {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    text-align: left;
  }

  .showcase-sublabel {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
  }

  .showcase-heading {
    font-size: 40px;
    line-height: 1.15;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .showcase-paragraph {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
  }

  .bullet-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .bullet-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .bullet-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--color-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .bullet-svg {
    width: 15px;
    height: 15px;
    display: block;
  }

  .bullet-text {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
  }

  .bullet-title {
    font-weight: 700;
    color: #ffffff;
  }

  /* Responsive styles */
  @media (max-width: 1024px) {
    .showcase-inner-split {
      gap: var(--space-xl);
    }
    .hand-visual-container {
      width: 420px;
      height: 420px;
    }
    .showcase-heading {
      font-size: 34px;
    }
  }

  @media (max-width: 768px) {
    .showcase-inner-split {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    .hand-visual-container {
      width: 380px;
      height: 380px;
    }
    .showcase-content {
      align-items: center;
      text-align: center;
    }
    .bullet-list {
      text-align: left;
      max-width: 500px;
      width: 100%;
    }
  }
</style>
