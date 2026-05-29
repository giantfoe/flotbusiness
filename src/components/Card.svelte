<script>
  import logoImg from "../assets/logo.png";
  
  export let cardholder = "Adam Erickson";
  export let expiry = "07/23";
  export let cardNumber = "1288 9576 1934 2243";
  export let cvv = "945";
  export let type = "black"; // 'black' | 'yellow' | 'green' | 'glass' | 'glass-back'
  export let interactive = false;

  let rotateX = 0;
  let rotateY = 0;
  let isHovered = false;
  let glareX = 0;
  let glareY = 0;
  let showGlare = false;

  function handleMouseMove(e) {
    if (!interactive) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    glareX = x;
    glareY = y;

    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Calculate rotation angles (max 20 degrees)
    rotateY = normalizedX * 20;
    rotateX = -normalizedY * 20;
  }

  function handleMouseEnter() {
    if (!interactive) return;
    isHovered = true;
    showGlare = true;
  }

  function handleMouseLeave() {
    if (!interactive) return;
    isHovered = false;
    showGlare = false;
    rotateX = 0;
    rotateY = 0;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
  class="credit-card card-{type} {isHovered ? 'hovered' : ''}"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  style:transform={interactive ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)` : ''}
>
  {#if type === 'glass-back'}
    <!-- Back of the card -->
    <div class="card-back-strip"></div>
    <div class="card-back-info">
      <div class="cvv-container">
        <span class="label">CVV</span>
        <span class="value">{cvv}</span>
      </div>
      <div class="signature-line">
        <span>MIA J 8 85937858 07/23</span>
      </div>
    </div>
    <div class="card-branding-back">
      <div class="flot-card-logo">
        <img src={logoImg} class="flot-card-logo-img" alt="Flot logo" />
        <span class="logo-text">Flot</span>
      </div>
    </div>
  {:else if type === 'black'}
    <!-- Front of the Ultra Black Card -->
    <div class="card-noise"></div>
    {#if showGlare}
        <div 
          class="glare-layer" 
          style:background="radial-gradient(circle at {glareX}px {glareY}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 65%)"
        ></div>
      {/if}
      <div class="ultra-black-card-content">
        <div class="ultra-black-logo-container">
          <img src={logoImg} class="flot-card-logo-img black-card-logo" alt="Flot logo" />
          <div class="ultra-black-label">ULTRA BLACK CARD</div>
        </div>
        
        <div class="ultra-black-chip-wifi">
          <svg class="card-chip-silver" viewBox="0 0 100 80" width="34" height="27">
            <defs>
              <linearGradient id="chip-silver-{type}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="25%" stop-color="#e8e8e8" />
                <stop offset="55%" stop-color="#b5b5b5" />
                <stop offset="85%" stop-color="#f2f2f2" />
                <stop offset="100%" stop-color="#7a7a7a" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#chip-silver-{type})" stroke="#8a8a8a" stroke-width="1" />
            <path d="M 0,26 H 100 M 0,54 H 100 M 30,0 V 80 M 70,0 V 80" fill="none" stroke="rgba(0, 0, 0, 0.25)" stroke-width="1.5" />
            <path d="M 30,26 C 30,42 70,42 70,26" fill="none" stroke="rgba(0, 0, 0, 0.25)" stroke-width="1.5" />
            <rect x="42" y="32" width="16" height="16" rx="3" fill="none" stroke="rgba(0, 0, 0, 0.25)" stroke-width="1" />
          </svg>
        </div>
        
        <div class="ultra-black-number">{cardNumber}</div>
        
        <div class="ultra-black-footer">
          <div class="ultra-black-holder">{cardholder}</div>
          
          <div class="ultra-black-meta">
            <div class="meta-item">
              <span class="meta-label">Expiry Date:</span>
              <span class="meta-val">{expiry}</span>
            </div>
            <div class="meta-divider">|</div>
            <div class="meta-item">
              <span class="meta-label">CVV/CVC:</span>
              <span class="meta-val">{cvv}</span>
            </div>
          </div>
          
          <div class="ultra-black-brand">
            <svg class="mc-logo" viewBox="0 0 36 24" width="30" height="20">
              <circle cx="12" cy="12" r="10" fill="#EB001B" />
              <circle cx="24" cy="12" r="10" fill="#F79E1B" opacity="0.9" />
            </svg>
          </div>
        </div>
      </div>
    {:else}
      <!-- Front of the other cards (yellow, green, glass) -->
      <!-- Tactile matte micro-noise overlay -->
      <div class="card-noise"></div>

      <!-- Shifting Holographic Glare Overlay -->
      {#if showGlare}
        <div 
          class="glare-layer" 
          style:background="radial-gradient(circle at {glareX}px {glareY}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 65%)"
        ></div>
      {/if}

      <!-- Background Artwork Waves based on Card Type -->
      {#if type === 'yellow'}
        <svg class="card-bg-artwork" viewBox="0 0 320 200" width="100%" height="100%">
          <!-- Mesh background -->
          <line x1="-20" y1="40" x2="180" y2="240" stroke="rgba(26, 26, 26, 0.04)" stroke-width="1" />
          <line x1="20" y1="-20" x2="280" y2="240" stroke="rgba(26, 26, 26, 0.04)" stroke-width="1" />
          <line x1="80" y1="-20" x2="340" y2="240" stroke="rgba(26, 26, 26, 0.04)" stroke-width="1" />
          <line x1="180" y1="-20" x2="360" y2="160" stroke="rgba(26, 26, 26, 0.04)" stroke-width="1" />
        </svg>
      {:else if type === 'green'}
        <svg class="card-bg-artwork" viewBox="0 0 320 200" width="100%" height="100%">
          <!-- Intersecting organic waves -->
          <path d="M -20 180 C 60 140, 120 180, 200 120 C 260 80, 300 120, 340 60" fill="none" stroke="rgba(12, 51, 17, 0.05)" stroke-width="1.5" />
          <path d="M -20 200 C 60 160, 120 200, 200 140 C 260 100, 300 140, 340 80" fill="none" stroke="rgba(12, 51, 17, 0.03)" stroke-width="1.2" />
        </svg>
      {:else}
        <svg class="card-bg-artwork" viewBox="0 0 320 200" width="100%" height="100%">
          <path d="M -20 80 Q 120 160 340 40" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />
        </svg>
      {/if}

      <div class="card-header">
        {#if type === 'yellow'}
          <!-- Stylized Mastercard brand circles -->
          <svg class="brand-logo-svg mc-logo" viewBox="0 0 36 24" width="36" height="24">
            <circle cx="12" cy="12" r="10" fill="#EB001B" />
            <circle cx="24" cy="12" r="10" fill="#F79E1B" opacity="0.85" />
          </svg>
        {:else}
          <!-- Visa logo SVG -->
          <svg class="brand-logo-svg visa-logo" class:visa-dark={type === 'green' || type === 'glass'} viewBox="0 0 48 16" width="48" height="16">
            <path d="M18.2 1.2L15.3 14.8H12L9.2 3.6C8.9 2.5 8.1 1.9 7 1.7L1.8 1.4V0.8H8.8C9.7 0.8 10.5 1.4 10.7 2.4L12.5 12L15.8 0.8H18.2V1.2ZM34 9.8C34.1 6.5 29.3 6.3 29.3 4.7C29.3 4.2 29.8 3.6 30.9 3.5C31.5 3.4 33.1 3.3 34.1 3.8L34.7 0.9C33.8 0.6 32.7 0.5 31.4 0.5C27.9 0.5 25.4 2.3 25.4 5.3C25.4 9.1 30.6 9.3 30.6 11.2C30.6 11.8 30 12.3 28.8 12.5C27.9 12.6 26.5 12.5 25.5 12L24.9 14.9C25.9 15.4 27.3 15.6 28.7 15.6C32.4 15.6 34 13.6 34 9.8ZM45.7 14.8H48.8L46.1 1.2H43.2C42.5 1.2 41.9 1.6 41.6 2.3L36.3 14.8H39.6L40.3 12.9H44.3L44.7 14.8H45.7ZM41 10.7L42.8 5.7L43.8 10.7H41ZM23.3 1.2H20.4L16.2 14.8H19.5L23.3 1.2Z" fill="currentColor" />
          </svg>
        {/if}
        <div class="chip-and-wifi">
          <!-- High-Fidelity Golden/Silver EMV Chip -->
          <svg class="card-chip" viewBox="0 0 100 80" width="38" height="30">
            <defs>
              <linearGradient id="chip-gold-{type}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffd700" />
                <stop offset="25%" stop-color="#fff5cc" />
                <stop offset="55%" stop-color="#d4af37" />
                <stop offset="85%" stop-color="#f3e5ab" />
                <stop offset="100%" stop-color="#aa7c11" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#chip-gold-{type})" stroke="#9c7a1c" stroke-width="1" />
            <path d="M 0,26 H 100 M 0,54 H 100 M 30,0 V 80 M 70,0 V 80" fill="none" stroke="rgba(0, 0, 0, 0.28)" stroke-width="1.5" />
            <path d="M 30,26 C 30,42 70,42 70,26" fill="none" stroke="rgba(0, 0, 0, 0.28)" stroke-width="1.5" />
            <rect x="42" y="32" width="16" height="16" rx="3" fill="none" stroke="rgba(0, 0, 0, 0.3)" stroke-width="1" />
          </svg>
          
          <!-- Contactless Wifi SVG -->
          <svg class="wifi-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M5 12a10 10 0 0 1 14 0" />
            <path d="M8.5 15.5a5 5 0 0 1 7 0" />
            <path d="M12 18h.01" />
          </svg>
        </div>
      </div>

      <!-- Huge FL initials stretching across the card for branding (on glass cards) -->
      {#if type === 'glass'}
        <div class="large-av-bg">FL</div>
      {/if}

      <div class="card-body">
        <div class="card-number">{cardNumber}</div>
        
        <div class="card-details-row">
          <div class="detail-group">
            <span class="detail-label">Card Holder</span>
            <span class="detail-value">{cardholder}</span>
          </div>
          <div class="detail-group">
            <span class="detail-label">Expired</span>
            <span class="detail-value">{expiry}</span>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="card-branding">
          <img src={logoImg} class="flot-card-logo-img" alt="Flot logo" />
          <span class="logo-text">Flot</span>
        </div>
        
        <!-- Interactive Holographic security seal -->
        <div 
          class="hologram-seal" 
          style:background-position="{rotateY * 3.5}% {rotateX * 3.5}%"
        ></div>
      </div>
    {/if}
</div>

<style>
  .credit-card {
    width: 320px;
    height: 200px;
    border-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    user-select: none;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.25);
    transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border 0.4s ease;
    transform-style: preserve-3d;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .credit-card.hovered {
    box-shadow: 0 24px 56px rgba(0, 0, 0, 0.28), inset 0 1px 2px rgba(255, 255, 255, 0.4);
  }

  /* Tactile Micro-noise Texture */
  .card-noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.045;
    pointer-events: none;
    z-index: 3;
    mix-blend-mode: overlay;
  }

  .card-bg-artwork {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  /* Black Card Theme */
  .card-black {
    background: linear-gradient(135deg, #18191d 0%, #090a0c 60%, #111215 100%) !important;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
  }
  .card-black::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(115deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.03) 60%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
    z-index: 2;
  }
  
  .ultra-black-card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    z-index: 2;
    position: relative;
  }
  .ultra-black-logo-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
  .ultra-black-label {
    font-size: 8px;
    font-weight: 700;
    color: var(--color-accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: var(--font-heading);
    margin-top: 2px;
  }
  .ultra-black-chip-wifi {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ultra-black-number {
    font-size: 15.5px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.08em;
    font-family: var(--font-body);
    margin-top: 12px;
    text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.8), 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.35);
    background: linear-gradient(135deg, #ffffff 0%, #ececec 50%, #dcdcdc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .ultra-black-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
    width: 100%;
  }
  .ultra-black-holder {
    font-size: 11px;
    font-weight: 600;
    color: #ffffff;
    font-family: var(--font-body);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.35);
    background: linear-gradient(135deg, #ffffff 0%, #ececec 50%, #dcdcdc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ultra-black-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-family: var(--font-body);
  }
  .meta-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .meta-label {
    font-size: 5.5px;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1px;
  }
  .meta-val {
    font-size: 9px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.35);
    background: linear-gradient(135deg, #ffffff 0%, #ececec 50%, #dcdcdc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .meta-divider {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.2);
    align-self: center;
    padding-bottom: 2px;
  }
  .ultra-black-brand {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  /* Yellow Card Theme (Mastercard Mint Accent) */
  .card-yellow {
    background: linear-gradient(135deg, #aefee0 0%, #85FDC6 60%, #68e4ae 100%);
    color: var(--color-text-main);
    border: 1px solid rgba(12, 13, 16, 0.06);
    box-shadow: 0 12px 36px rgba(133, 253, 198, 0.15), inset 0 1px 1.5px rgba(255, 255, 255, 0.45);
  }
  .card-yellow .detail-label {
    color: rgba(12, 13, 16, 0.45);
  }
  .card-yellow .wifi-icon {
    color: var(--color-text-main);
  }

  /* Green Card Theme (Visa Green) */
  .card-green {
    background: linear-gradient(135deg, #e4ffd6 0%, #c1fdc6 60%, #9eed9f 100%);
    color: #0c3311;
    border: 1px solid rgba(12, 13, 16, 0.06);
    box-shadow: 0 12px 36px rgba(40, 167, 69, 0.08), inset 0 1px 1.5px rgba(255, 255, 255, 0.45);
  }
  .card-green .detail-label {
    color: rgba(12, 33, 15, 0.45);
  }
  .card-green .wifi-icon {
    color: #0c3311;
  }

  /* Glass Card Theme */
  .card-glass {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: var(--color-text-main);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  }
  .card-glass .large-av-bg {
    color: rgba(133, 253, 198, 0.4);
    opacity: 0.12;
  }
  .card-glass .wifi-icon {
    color: var(--color-text-main);
  }

  /* Glass Card Back Theme */
  .card-glass-back {
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: var(--color-text-main);
    padding: 0;
    justify-content: flex-start;
  }

  /* Card Layout Details */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  .chip-and-wifi {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-chip {
    border-radius: 4px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
  }

  .wifi-icon {
    transform: rotate(90deg);
    color: rgba(255, 255, 255, 0.6);
    filter: drop-shadow(0 0 1px rgba(255,255,255,0.2));
  }

  .card-yellow .wifi-icon, .card-green .wifi-icon {
    color: rgba(26, 26, 26, 0.65);
    filter: drop-shadow(0 0 1px rgba(26,26,26,0.1));
  }

  .large-av-bg {
    position: absolute;
    bottom: -15px;
    left: 20px;
    font-family: var(--font-heading);
    font-size: 154px;
    font-weight: 800;
    line-height: 1;
    z-index: 1;
    pointer-events: none;
    letter-spacing: -0.08em;
  }

  .card-body {
    z-index: 2;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* 3D Embossed Metallic Text Rules */
  .card-black .card-number, 
  .card-black .detail-value, 
  .card-black .logo-text {
    font-family: var(--font-body);
    font-weight: 600;
    text-shadow: 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.25), -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.6);
    background: linear-gradient(135deg, #ffffff 0%, #ececec 50%, #c4c4c4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-yellow .card-number, 
  .card-yellow .detail-value, 
  .card-yellow .logo-text,
  .card-green .card-number,
  .card-green .detail-value,
  .card-green .logo-text {
    font-family: var(--font-body);
    font-weight: 600;
    text-shadow: 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.55), -0.5px -0.5px 0.5px rgba(0, 0, 0, 0.28);
    background: linear-gradient(135deg, #2d2d2d 0%, #1A1A1A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-number {
    font-size: 16px;
    letter-spacing: 0.1em;
  }

  .card-details-row {
    display: flex;
    gap: 24px;
  }

  .detail-group {
    display: flex;
    flex-direction: column;
  }

  .detail-label {
    font-size: 8px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.05em;
    margin-bottom: 2px;
  }

  .card-yellow .detail-label {
    color: rgba(26, 26, 26, 0.5);
  }

  .card-green .detail-label {
    color: rgba(12, 51, 17, 0.5);
  }

  .detail-value {
    font-size: 11px;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    z-index: 2;
  }

  .card-branding {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .flot-icon-svg {
    border-radius: 5px;
    overflow: hidden;
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: 12px;
    letter-spacing: -0.02em;
  }

  /* Shifting Holographic Seal */
  .hologram-seal {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff0055, #00ffcc, #0055ff, #ffcc00);
    background-size: 250% 250%;
    mix-blend-mode: color-dodge;
    opacity: 0.45;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.5);
    z-index: 3;
    pointer-events: none;
    border: 0.5px solid rgba(255, 255, 255, 0.35);
    transition: opacity 0.3s ease;
  }

  .credit-card.hovered .hologram-seal {
    opacity: 0.75;
  }

  /* Back-specific card styling */
  .card-back-strip {
    background: #000;
    width: 100%;
    height: 38px;
    margin-top: 20px;
    z-index: 2;
  }

  .card-back-info {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding: 0 24px;
    gap: 16px;
    z-index: 2;
  }

  .cvv-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    color: #000;
    padding: 4px 10px;
    border-radius: 4px;
  }

  .cvv-container .label {
    font-size: 7px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .cvv-container .value {
    font-size: 12px;
    font-weight: 700;
  }

  .signature-line {
    font-size: 10px;
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
    padding-bottom: 2px;
    flex-grow: 1;
  }

  .card-branding-back {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: auto;
    margin-bottom: 24px;
    padding: 0 24px;
    z-index: 2;
  }

  .card-branding-back .logo-text {
    color: var(--color-text-main);
  }

  /* Glare & Brand Logo Styles */
  .glare-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9;
    mix-blend-mode: overlay;
  }

  .brand-logo-svg {
    z-index: 2;
    overflow: visible;
    display: block;
  }

  .brand-logo-flot {
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 2;
  }

  /* Favicon logo styling on cards */
  .flot-card-logo-img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    border-radius: 5px;
    display: block;
    background: #111111; /* standard dark background for the icon container like the original rect fill */
    padding: 3.5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .card-yellow .flot-card-logo-img {
    border-color: rgba(26, 26, 26, 0.08);
  }
  
  .flot-card-logo-img.black-card-logo {
    width: 24px;
    height: 24px;
    padding: 4.5px;
    background: #1e1f24;
    border-color: rgba(255, 255, 255, 0.12);
  }
</style>
