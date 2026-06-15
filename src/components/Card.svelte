<script>
  import logoImg from "../assets/logo.png";
  import cardSilverImg from "../assets/card_silver.png";
  import cardGreenImg from "../assets/card_green.png";
  
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
  class="credit-card card-img-variant card-{type} {isHovered ? 'hovered' : ''}"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  style:transform={interactive ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)` : ''}
>
  {#if type === 'black' || type === 'glass'}
    <img src={cardSilverImg} class="card-image-render" alt="Flot Visa Platinum Card" />
  {:else if type === 'green' || type === 'yellow'}
    <img src={cardGreenImg} class="card-image-render" alt="Flot Visa Classic Card" />
  {:else}
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
    {/if}
  {/if}

  <!-- Shifting Holographic Glare Overlay -->
  {#if showGlare}
    <div 
      class="glare-layer" 
      style:background="radial-gradient(circle at {glareX}px {glareY}px, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)"
    ></div>
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

  /* Image Render & Reset Overrides */
  .card-image-render {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    z-index: 1;
    border-radius: inherit;
  }

  .credit-card.card-img-variant {
    padding: 0;
    background: none !important;
    border: none !important;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  }

  .credit-card.card-img-variant.hovered {
    box-shadow: 0 24px 56px rgba(0, 0, 0, 0.35);
  }
</style>
