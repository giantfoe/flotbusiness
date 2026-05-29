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
      title: "QR Stands",
      desc: "Scan and pay in-person for walk-in retail stores.",
      icon: "store"
    },
    {
      title: "Wearable QR Tags",
      desc: "Instant contactless offline checkout with no bulky POS terminal.",
      icon: "tag"
    },
    {
      title: "WhatsApp Checkouts",
      desc: "Sell products and accept payments directly in customer chats.",
      icon: "chat"
    },
    {
      title: "Payment Links",
      desc: "Share a customized secure link to collect customer payments instantly.",
      icon: "link"
    },
    {
      title: "Global Reach",
      desc: "Accept card payments from customers in over 150+ countries.",
      icon: "globe"
    },
    {
      title: "Instant Settlements",
      desc: "Funds settled directly to your wallet or bank account immediately.",
      icon: "bolt"
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
      <div class="showcase-sublabel">Offline & Online Payments</div>
      <h2 class="showcase-heading">Everything you need to accept payments</h2>
      <p class="showcase-paragraph">
        Accept payments from your customers wherever they are. Sell in person, online, or inside chat apps with our lightweight, premium integrations.
      </p>

      <ul class="bullet-list">
        {#each features as feature}
          <li class="bullet-item">
            <div class="bullet-icon-container">
              {#if feature.icon === 'store'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              {:else if feature.icon === 'tag'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              {:else if feature.icon === 'chat'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              {:else if feature.icon === 'link'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              {:else if feature.icon === 'globe'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              {:else if feature.icon === 'bolt'}
                <svg viewBox="0 0 24 24" class="bullet-svg" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
