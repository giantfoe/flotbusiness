<script>
  export let type = "silver"; // 'silver' | 'green' | 'black'
  export let interactive = false;

  // Unique ID for SVG gradient references to avoid conflicts when multiple cards render
  const uid = `fc-${Math.random().toString(36).slice(2, 9)}`;

  let rotateX = 0;
  let rotateY = 0;
  let isHovered = false;
  let glareX = 0;
  let glareY = 0;

  function handleMouseMove(e) {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glareX = x;
    glareY = y;
    rotateY = ((x / rect.width) - 0.5) * 18;
    rotateX = -(((y / rect.height) - 0.5) * 18);
  }

  function handleMouseEnter() {
    if (!interactive) return;
    isHovered = true;
  }

  function handleMouseLeave() {
    if (!interactive) return;
    isHovered = false;
    rotateX = 0;
    rotateY = 0;
  }

  // Card tier label
  $: tier = type === 'green' ? 'Classic' : 'Platinum';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="flot-card flot-card--{type} {isHovered ? 'flot-card--hovered' : ''}"
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  style:transform={interactive ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)` : ''}
>
  <!-- ═══════ BACKGROUND WAVE ARTWORK (SVG) ═══════ -->
  <svg class="flot-card__waves" viewBox="0 0 430 270" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <!-- Dual shadow filters for authentic 3D depth from left-to-right and right-to-left -->
      <filter id="{uid}-shadow-right" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="3" dy="2" stdDeviation="4.5" flood-color="#000000" flood-opacity="0.32"/>
      </filter>
      <filter id="{uid}-shadow-left" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="-3" dy="2" stdDeviation="5" flood-color="#000000" flood-opacity="0.38"/>
      </filter>

      {#if type === 'silver'}
        <!-- Silver gradients -->
        <linearGradient id="{uid}-bg" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#bebebe"/>
          <stop offset="100%" stop-color="#9a9a9a"/>
        </linearGradient>
        <linearGradient id="{uid}-wtr" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#c6c6c6"/>
          <stop offset="100%" stop-color="#a4a4a4"/>
        </linearGradient>
        <linearGradient id="{uid}-w3" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#d4d4d4"/>
          <stop offset="100%" stop-color="#b2b2b2"/>
        </linearGradient>
        <linearGradient id="{uid}-w2" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#e2e2e2"/>
          <stop offset="100%" stop-color="#c0c0c0"/>
        </linearGradient>
        <linearGradient id="{uid}-w1" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#f0f0f0"/>
          <stop offset="100%" stop-color="#d2d2d2"/>
        </linearGradient>
      {:else if type === 'green'}
        <!-- Green gradients -->
        <linearGradient id="{uid}-bg" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#058864"/>
          <stop offset="100%" stop-color="#016248"/>
        </linearGradient>
        <linearGradient id="{uid}-wtr" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#1ae29c"/>
          <stop offset="100%" stop-color="#029668"/>
        </linearGradient>
        <linearGradient id="{uid}-w3" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#3af2af"/>
          <stop offset="100%" stop-color="#0ebe80"/>
        </linearGradient>
        <linearGradient id="{uid}-w2" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#60fcab"/>
          <stop offset="100%" stop-color="#24de91"/>
        </linearGradient>
        <linearGradient id="{uid}-w1" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#8afece"/>
          <stop offset="100%" stop-color="#46efaa"/>
        </linearGradient>
      {:else}
        <!-- Black gradients -->
        <linearGradient id="{uid}-bg" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#141416"/>
          <stop offset="100%" stop-color="#070708"/>
        </linearGradient>
        <linearGradient id="{uid}-wtr" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#2c2c30"/>
          <stop offset="100%" stop-color="#111112"/>
        </linearGradient>
        <linearGradient id="{uid}-w3" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#3c3c40"/>
          <stop offset="100%" stop-color="#1e1e20"/>
        </linearGradient>
        <linearGradient id="{uid}-w2" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#4a4a50"/>
          <stop offset="100%" stop-color="#28282b"/>
        </linearGradient>
        <linearGradient id="{uid}-w1" x1="0" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stop-color="#64646a"/>
          <stop offset="100%" stop-color="#3e3e43"/>
        </linearGradient>
      {/if}

      <!-- Gold chip gradient (shared) -->
      <linearGradient id="{uid}-chip" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f0d060"/>
        <stop offset="22%" stop-color="#fceaA0"/>
        <stop offset="48%" stop-color="#d4a828"/>
        <stop offset="72%" stop-color="#f5e098"/>
        <stop offset="100%" stop-color="#b08818"/>
      </linearGradient>
    </defs>

    <!-- Base Layer background -->
    <rect width="430" height="270" fill="url(#{uid}-bg)"/>

    <!-- Wave 3 (Middle-Right Panel - casts shadow right) -->
    <path
      d="M 0 0 H 150 C 210 70, 150 190, 190 270 H 0 Z"
      fill="url(#{uid}-w3)"
      filter="url(#{uid}-shadow-right)"
    />

    <!-- Wave 2 (Middle-Left Panel - casts shadow right) -->
    <path
      d="M 0 0 H 110 C 170 70, 110 190, 140 270 H 0 Z"
      fill="url(#{uid}-w2)"
      filter="url(#{uid}-shadow-right)"
    />

    <!-- Wave 1 (Leftmost Panel - casts shadow right) -->
    <path
      d="M 0 0 H 75 C 130 70, 80 190, 100 270 H 0 Z"
      fill="url(#{uid}-w1)"
      filter="url(#{uid}-shadow-right)"
    />

    <!-- Wave TR (Top-Right Crescent - casts shadow left, rendered on top) -->
    <path
      d="M 430 0 H 290 C 250 85, 300 150, 430 180 Z"
      fill="url(#{uid}-wtr)"
      filter="url(#{uid}-shadow-left)"
    />
  </svg>

  <!-- ═══════ SURFACE EFFECTS ═══════ -->
  <div class="flot-card__noise"></div>
  <div class="flot-card__sheen"></div>

  {#if isHovered}
    <div
      class="flot-card__glare"
      style:background="radial-gradient(circle at {glareX}px {glareY}px, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)"
    ></div>
  {/if}

  <!-- ═══════ CARD CONTENT ═══════ -->
  <div class="flot-card__content">

    <!-- Top row: Chip/NFC area + Flot Logo -->
    <div class="flot-card__top-row">
      <!-- Left: Arrow + Chip + Contactless waves aligned horizontally -->
      <div class="flot-card__chip-area">
        <!-- Left arrow indicator -->
        <svg class="flot-card__arrow-svg" viewBox="0 0 10 14" width="6" height="9" fill="currentColor">
          <path d="M8 0 L1 7 L8 14 Z"/>
        </svg>

        <!-- EMV Gold Chip -->
        <svg class="flot-card__chip" viewBox="0 0 55 42" width="44" height="34">
          <rect x="1" y="1" width="53" height="40" rx="6" fill="url(#{uid}-chip)" stroke="#b89324" stroke-width="0.8"/>
          <!-- Circuit lines -->
          <path d="M 16 1 L 16 41 M 39 1 L 39 41 M 1 14 L 54 14 M 1 28 L 54 28" fill="none" stroke="#70540d" stroke-width="1.0" opacity="0.45"/>
          <path d="M 16 21 C 16 16, 39 16, 39 21 C 39 26, 16 26, 16 21 Z" fill="none" stroke="#70540d" stroke-width="1.0" opacity="0.45"/>
          <path d="M 27.5 1 L 27.5 14 M 27.5 28 L 27.5 41" fill="none" stroke="#70540d" stroke-width="1.0" opacity="0.45"/>
        </svg>

        <!-- NFC Contactless Icon -->
        <svg class="flot-card__nfc" viewBox="0 0 14 24" width="14" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <path d="M 2 9 A 4.5 4.5 0 0 1 2 15" />
          <path d="M 5 7 A 7.5 7.5 0 0 1 5 17" />
          <path d="M 8 5 A 10.5 10.5 0 0 1 8 19" />
          <path d="M 11 3 A 13.5 13.5 0 0 1 11 21" />
        </svg>
      </div>

      <!-- Right: Flot Logo Badge -->
      <div class="flot-card__logo-badge">
        <div class="flot-card__logo-icon">
          <!-- Flot green "F" logo -->
          <svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" rx="7" fill="#333333"/>
            <path d="M12,24 C12,17.5 13.5,13.5 24,11 C19.5,14 17.5,16.5 17.5,20 C18.5,19.2 19.8,18.8 21.5,18.8 C18,21.5 16.5,23.5 15.5,26.5 Z" fill="#85FDC6"/>
            <path d="M14.5,17.5 C14.5,14.5 16,12.5 22.5,10.5 C19.5,12 18,13.5 17.5,15.5 Z" fill="#85FDC6" opacity="0.85"/>
          </svg>
        </div>
        <span class="flot-card__logo-text">Flot</span>
      </div>
    </div>

    <!-- Bottom row: VISA + Tier -->
    <div class="flot-card__bottom-row">
      <div class="flot-card__visa">
        <!-- Authentic VISA wordmark -->
        <svg class="flot-card__visa-logo" viewBox="0 0 780 250" width="72" height="23">
          <path d="M293.2 2.5L191.8 247.5H126.5L76.6 48.5C73.6 36.3 71 30.2 60.5 24.4C43.8 15.3 16.3 6.8 0 1.7L1.5 0H102.4C117.2 0 130.3 9.5 133.4 26.2L158.8 161.3 223.8 0H288.5L293.2 2.5ZM536.8 166.5C537.1 96.3 440.4 92.3 441.1 63.1C441.3 53.4 450.6 43.1 470.7 40.5C480.7 39.3 510.5 38.5 544.5 54.1L555.9 5.8C537.8 -0.8 514.8 -7 486.2 -7C424.8 -7 381.6 27.5 381.2 77C380.8 114.2 414 134.6 439 144.8C464.8 155.3 473.2 162.1 473.1 171.5C472.9 186 455.7 192.3 439.8 192.5C406.5 193 387 184.5 371.5 178.2L359.6 228.5C375.1 235.4 401.8 241.3 429.6 241.7C495 241.5 537.5 207.5 537.7 154V166.5H536.8ZM690.4 247.5H752.4L698.8 0H646.4C633.2 0 622 7.5 616.6 19.4L528 247.5H593.4L606.5 209.5H685.3L692.6 247.5H690.4ZM622.4 160.5L656 62.5L675.2 160.5H622.4ZM180.2 0L128.5 247.5H66L117.7 0H180.2Z"
            fill="currentColor"
          />
        </svg>
        <span class="flot-card__tier">{tier}</span>
      </div>
    </div>
  </div>
</div>

<style>
  /* ════════════════════════════════════
     FLOT CARD — Base
     ════════════════════════════════════ */
  .flot-card {
    position: relative;
    width: 320px;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    user-select: none;
    transform-style: preserve-3d;
    transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    flex-shrink: 0;
  }

  /* ════════ SILVER VARIANT ════════ */
  .flot-card--silver {
    background: linear-gradient(135deg, #e4e4e4 0%, #d8d8d8 30%, #bebebe 70%, #d0d0d0 100%);
    color: #ffffff;
    box-shadow:
      0 12px 36px rgba(0, 0, 0, 0.14),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  /* ════════ GREEN VARIANT ════════ */
  .flot-card--green {
    background: linear-gradient(135deg, #7dfdcb 0%, #46e8ae 30%, #0ab680 70%, #3fe0ab 100%);
    color: #ffffff;
    box-shadow:
      0 12px 36px rgba(7, 182, 128, 0.25),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* ════════ BLACK VARIANT ════════ */
  .flot-card--black {
    background: linear-gradient(135deg, #303030 0%, #202020 30%, #0d0d0d 70%, #1a1a1a 100%);
    color: #ffffff;
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.35),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* ════════ HOVER STATE ════════ */
  .flot-card--hovered {
    box-shadow:
      0 24px 56px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
  }

  /* ════════ WAVE BACKGROUND ════════ */
  .flot-card__waves {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  /* ════════ SURFACE EFFECTS ════════ */
  .flot-card__noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.04;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 4;
  }

  .flot-card--black .flot-card__noise {
    opacity: 0.06;
  }

  .flot-card__sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 35%,
      rgba(255, 255, 255, 0.04) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
    z-index: 5;
  }

  .flot-card--black .flot-card__sheen {
    background: linear-gradient(
      125deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0) 35%,
      rgba(255, 255, 255, 0.02) 55%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .flot-card__glare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 9;
    mix-blend-mode: overlay;
  }

  /* ════════ CARD CONTENT LAYOUT ════════ */
  .flot-card__content {
    position: relative;
    z-index: 6;
    width: 100%;
    height: 100%;
    padding: 22px 24px 18px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  /* ── Top Row ── */
  .flot-card__top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .flot-card__chip-area {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 14px;
  }

  .flot-card__chip {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.18));
    border-radius: 4px;
    flex-shrink: 0;
  }

  /* Left arrow and Contactless wave colors */
  .flot-card__arrow-svg,
  .flot-card__nfc {
    color: rgba(40, 40, 40, 0.45);
    flex-shrink: 0;
  }

  .flot-card--black .flot-card__arrow-svg,
  .flot-card--black .flot-card__nfc {
    color: rgba(255, 255, 255, 0.18);
  }

  .flot-card--green .flot-card__arrow-svg,
  .flot-card--green .flot-card__nfc {
    color: rgba(10, 50, 30, 0.45);
  }

  /* ── Flot Logo Badge (top-right) ── */
  .flot-card__logo-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .flot-card__logo-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

  .flot-card__logo-icon svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .flot-card__logo-text {
    font-family: var(--font-heading, 'Outfit', sans-serif);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #333333;
  }

  .flot-card--black .flot-card__logo-text {
    color: #85fdc6;
  }

  .flot-card--green .flot-card__logo-text {
    color: #0b4528;
  }

  /* ── Bottom Row ── */
  .flot-card__bottom-row {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .flot-card__visa {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .flot-card__visa-logo {
    color: #ffffff;
  }

  .flot-card__tier {
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #ffffff;
    opacity: 0.85;
    margin-top: -2px;
  }
</style>
