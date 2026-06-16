<script>
  export let theme = "light";
  import logoImg from "../assets/logo.png";
  import Card from "./Card.svelte";
  import { slide, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // FAQ Accordion State
  let activeFaq = 0; // Default to first open for visual interest

  function toggleFaq(index) {
    if (activeFaq === index) {
      activeFaq = null;
    } else {
      activeFaq = index;
    }
  }

  // Chart Tooltip Hover State
  let hoveredPoint = null; // null | number

  // Dynamic datasets for the Gross Volume chart
  const datasets = {
    '1D': {
      label: "Today's volume",
      value: "SLE 1.8M",
      change: "+42.1% Today",
      points: [
        { x: 15, y: 88, value: "SLE 180k", date: "9:00 AM" },
        { x: 80, y: 72, value: "SLE 520k", date: "12:00 PM" },
        { x: 145, y: 60, value: "SLE 890k", date: "3:00 PM" },
        { x: 210, y: 42, value: "SLE 1.3M", date: "6:00 PM" },
        { x: 265, y: 22, value: "SLE 1.8M", date: "9:00 PM" }
      ]
    },
    '1W': {
      label: "Gross volume",
      value: "SLE 14.2M",
      change: "+34.2% Volume",
      points: [
        { x: 15, y: 80, value: "SLE 2.4M", date: "Mon" },
        { x: 80, y: 65, value: "SLE 6.8M", date: "Wed" },
        { x: 145, y: 55, value: "SLE 9.7M", date: "Fri" },
        { x: 210, y: 40, value: "SLE 12.5M", date: "Sun" },
        { x: 265, y: 25, value: "SLE 14.2M", date: "Today" }
      ]
    },
    '1M': {
      label: "Monthly Gross Volume",
      value: "SLE 58.2M",
      change: "+28.6% Month",
      points: [
        { x: 15, y: 85, value: "SLE 12.1M", date: "Wk 1" },
        { x: 80, y: 68, value: "SLE 28.4M", date: "Wk 2" },
        { x: 145, y: 48, value: "SLE 42.9M", date: "Wk 3" },
        { x: 210, y: 35, value: "SLE 51.5M", date: "Wk 4" },
        { x: 265, y: 26, value: "SLE 58.2M", date: "Wk 5" }
      ]
    },
    '6M': {
      label: "6-Month Gross Volume",
      value: "SLE 245.0M",
      change: "+55.2% Growth",
      points: [
        { x: 15, y: 90, value: "SLE 45.2M", date: "Jan" },
        { x: 80, y: 70, value: "SLE 110.8M", date: "Mar" },
        { x: 145, y: 50, value: "SLE 180.2M", date: "May" },
        { x: 210, y: 30, value: "SLE 220.4M", date: "Jun" },
        { x: 265, y: 20, value: "SLE 245.0M", date: "Today" }
      ]
    },
    '1Y': {
      label: "Annual Gross Volume",
      value: "SLE 620.5M",
      change: "+78.4% Year",
      points: [
        { x: 15, y: 88, value: "SLE 120.4M", date: "Q1" },
        { x: 80, y: 62, value: "SLE 310.8M", date: "Q2" },
        { x: 145, y: 45, value: "SLE 485.2M", date: "Q3" },
        { x: 210, y: 32, value: "SLE 590.1M", date: "Q4" },
        { x: 265, y: 22, value: "SLE 620.5M", date: "Today" }
      ]
    }
  };

  let activeTimeline = '1W';
  $: currentData = datasets[activeTimeline];

  // Tweened points for smooth morphing animations
  const chartPoints = tweened(datasets['1W'].points.map(pt => ({ x: pt.x, y: pt.y })), {
    duration: 600,
    easing: cubicOut
  });

  function changeTimeline(timeline) {
    activeTimeline = timeline;
    chartPoints.set(datasets[timeline].points.map(pt => ({ x: pt.x, y: pt.y })));
  }

  // Reactive path string generation using S-shaped bezier segments
  $: pathString = $chartPoints.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = $chartPoints[idx - 1];
    const cp1x = (prev.x + pt.x) / 2;
    const cp1y = prev.y;
    const cp2x = (prev.x + pt.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
  }, "");

  $: areaPathString = `${pathString} L ${$chartPoints[$chartPoints.length - 1].x},100 L ${$chartPoints[0].x},100 Z`;

  // Mouse Parallax Coordinate Tracking
  let heroCanvas;
  let parallaxX = 0;
  let parallaxY = 0;
  let glowX = 0;
  let glowY = 0;

  function handleHeroMouseMove(e) {
    if (!heroCanvas) return;
    const rect = heroCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalised drift offset (-35px to 35px)
    parallaxX = ((x - centerX) / centerX) * 35;
    parallaxY = ((y - centerY) / centerY) * 35;

    // Direct background spotlight coordinates (offset from center)
    glowX = x - centerX;
    glowY = y - centerY;
  }

  function handleHeroMouseLeave() {
    // Smooth reset to neutral center
    parallaxX = 0;
    parallaxY = 0;
    glowX = 0;
    glowY = 0;
  }

  // Today's Revenue Ledger & Counter State
  let todayRevenue = 892400;
  $: formattedRevenue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(todayRevenue);

  let transactionsList = [
    { id: 1, merchant: "Aminata K.", network: "Visa Card", amount: "+SLE 7,740", time: "Just now", brandClass: "visa" },
    { id: 2, merchant: "Mohamed B.", network: "Orange Money", amount: "+SLE 20,430", time: "1m ago", brandClass: "orange" },
    { id: 3, merchant: "Fatmata S.", network: "Mastercard", amount: "+SLE 15,660", time: "2m ago", brandClass: "mastercard" }
  ];

  let nextTxId = 4;
  const txPool = [
    { merchant: "Abu C.", network: "Africell Money", amount: 9200, brandClass: "africell", formattedNetwork: "Africell Money" },
    { merchant: "Kadiatu J.", network: "Qcell Money", amount: 3120, brandClass: "qcell", formattedNetwork: "Qcell Money" },
    { merchant: "Adam E.", network: "Mastercard", amount: 18450, brandClass: "mastercard", formattedNetwork: "Mastercard" },
    { merchant: "Mariama D.", network: "Visa Card", amount: 11200, brandClass: "visa", formattedNetwork: "Visa Card" },
    { merchant: "Sahr T.", network: "Orange Money", amount: 8900, brandClass: "orange", formattedNetwork: "Orange Money" },
    { merchant: "Isatu B.", network: "Flot Transfer", amount: 24500, brandClass: "flot", formattedNetwork: "Flot Transfer" }
  ];

  function simulateNewTransaction() {
    const randomTx = txPool[Math.floor(Math.random() * txPool.length)];
    
    // Add amount to today's revenue counter
    todayRevenue += randomTx.amount;

    const newTx = {
      id: nextTxId++,
      merchant: randomTx.merchant,
      network: randomTx.formattedNetwork,
      amount: `+SLE ${new Intl.NumberFormat('en-US').format(randomTx.amount)}`,
      time: "Just now",
      brandClass: randomTx.brandClass
    };
    
    // Update existing items' timestamps and slide in new item
    transactionsList = [
      newTx,
      ...transactionsList.map(tx => {
        if (tx.time === "Just now") return { ...tx, time: "1m ago" };
        if (tx.time === "1m ago") return { ...tx, time: "2m ago" };
        return { ...tx, time: "3m ago" };
      })
    ].slice(0, 3);
  }

  // Interactive 30-Day Uptime Monitor Day Array
  const uptimeDays = Array.from({ length: 30 }, (_, i) => {
    let uptime = 100;
    // Introduce some slight real-world dip percentages for visual authenticity
    if (i === 11) uptime = 99.92;
    if (i === 21) uptime = 99.98;
    if (i === 28) uptime = 99.95;
    
    return {
      day: 30 - i,
      uptime: uptime,
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    };
  });
  let hoveredUptimeDay = null; // null | number

  onMount(() => {
    const interval = setInterval(() => {
      simulateNewTransaction();
    }, 4500);
    return () => clearInterval(interval);
  });
</script>

<section id="solutions" class="hero-section section-container {theme}">
  <!-- Top Centered Hero Info Block -->
  <div class="hero-center-header">
    <div class="hero-badge">Flot for Business</div>
    <h1 class="hero-heading">
      Built With <br />
      <span class="hero-accent-you">You</span> In Mind.
    </h1>
    <p class="hero-subtext">
      Accept payments from Flot, Mobile Money, Visa, and Mastercard, with instant settlement into your Flot Business account. Local or global, one platform.
    </p>

    <!-- Double-Pill CTA (Centered) -->
    <div class="cta-double-pill">
      <div class="cta-pill-inner">
        <a href="https://pay.flotme.ai/" class="cta-primary-pill" target="_blank" rel="noopener noreferrer">
          <span>Get started</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <a href="https://wa.me/23299800100" class="cta-secondary-link" target="_blank" rel="noopener noreferrer">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.519.99 6.086.99 1.662 5.361 1.658 10.79c-.001 1.749.463 3.454 1.343 4.966l-.993 3.627 3.73-.977c1.472.803 3.109 1.229 4.899 1.23h.002z"/>
            <path d="M12.008 1.99c-4.838 0-8.775 3.905-8.778 8.706-.001 1.637.458 3.23 1.328 4.629l.102.164-.783 2.859 2.951-.762.158.093c1.336.792 2.862 1.209 4.437 1.21h.002c4.837 0 8.774-3.906 8.778-8.707.002-2.327-.91-4.515-2.57-6.175s-3.87-2.56-6.175-2.56-6.175.002-8.778 8.707zm5.116 11.942c-.276-.138-1.636-.807-1.89-.899-.253-.092-.437-.138-.621.138-.184.276-.713.899-.874 1.084-.161.184-.322.207-.598.069-.276-.138-1.166-.43-2.22-1.371-.82-.732-1.374-1.636-1.535-1.912-.161-.276-.017-.426.121-.564.124-.124.276-.322.414-.483.138-.161.184-.276.276-.46.092-.184.046-.345-.023-.483-.069-.138-.621-1.496-.851-2.048-.224-.54-.469-.466-.621-.474-.161-.008-.345-.008-.529-.008s-.483.069-.736.345c-.253.276-.966.943-.966 2.3s.989 2.668 1.127 2.852c.138.184 1.947 2.974 4.717 4.167.659.284 1.173.454 1.573.581.662.21 1.265.18 1.741.11.531-.079 1.636-.667 1.867-1.31.23-.644.23-1.196.161-1.31-.069-.115-.253-.207-.529-.345z"/>
          </svg>
          <span>Chat on WhatsApp</span>
          <span class="pulse-dot-green"></span>
        </a>
      </div>
    </div>
  </div>

  <!-- Full-Width Interactive Canvas Graphic Section -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="hero-canvas-container"
    bind:this={heroCanvas}
    on:mousemove={handleHeroMouseMove}
    on:mouseleave={handleHeroMouseLeave}
  >
    <!-- Spotlight glowing backlight behind the core logo -->
    <div class="canvas-backlight" style:transform="translate({glowX}px, {glowY}px)"></div>
    <div class="canvas-grid-pattern"></div>
    
    <!-- Curved SVG connection paths linking the center core to floating nodes -->
    <svg class="canvas-connectors" viewBox="0 0 1000 500" preserveAspectRatio="none">
      <defs>
        <!-- High-performance multi-stage SVG glow filter for Stripe-style light nodes -->
        <filter id="glow-light-node" x="-100%" y="-100%" width="300%" height="300%">
          <!-- Multi-stage blurring tuned for smaller line widths -->
          <feGaussianBlur stdDeviation="4" result="blur-outer" />
          <feGaussianBlur stdDeviation="1.2" result="blur-inner" />
          
          <!-- Increase opacity/brightness of the outer blur -->
          <feComponentTransfer in="blur-outer" result="bright-outer">
            <feFuncA type="linear" slope="2.5"/>
          </feComponentTransfer>
          
          <!-- Colorize the outer glow with neon sky blue (#00f0ff) -->
          <feFlood flood-color="#00f0ff" flood-opacity="0.9" result="glow-color" />
          <feComposite in="glow-color" in2="bright-outer" operator="in" result="colored-outer" />
          
          <!-- Colorize the inner blur for rich color core saturation -->
          <feFlood flood-color="#00e5ff" flood-opacity="0.8" result="inner-color" />
          <feComposite in="inner-color" in2="blur-inner" operator="in" result="colored-inner" />

          <feMerge>
            <feMergeNode in="colored-outer" />
            <feMergeNode in="colored-inner" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <!-- Path to Mastercard Yellow Card -->
      <path d="M 500 250 C 400 250, 250 160, 220 160" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Flot Mint Black Card -->
      <path d="M 500 250 C 600 250, 750 160, 820 160" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Visa Green Card -->
      <path d="M 500 250 C 600 250, 750 340, 800 340" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Left Gross Volume Metric -->
      <path d="M 500 250 C 400 250, 250 340, 200 340" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Right System Uptime Metric -->
      <path d="M 500 250 C 560 160, 620 110, 660 70" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Orange Money Logo badge -->
      <path d="M 500 250 C 420 160, 360 110, 320 90" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />
      <!-- Path to Africell Money Logo badge -->
      <path d="M 500 250 C 400 300, 340 380, 300 400" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1.5" stroke-linecap="round" />

      <!-- Animated flow paths overlay (flowing towards center 500,250) -->
      <!-- Path to Mastercard Yellow Card -->
      <path d="M 220 160 C 250 160, 400 250, 500 250" class="flow-line line-1" pathLength="100" />
      <!-- Path to Flot Mint Black Card -->
      <path d="M 820 160 C 750 160, 600 250, 500 250" class="flow-line line-2" pathLength="100" />
      <!-- Path to Visa Green Card -->
      <path d="M 800 340 C 750 340, 600 250, 500 250" class="flow-line line-3" pathLength="100" />
      <!-- Path to Left Gross Volume Metric -->
      <path d="M 200 340 C 250 340, 400 250, 500 250" class="flow-line line-4" pathLength="100" />
      <!-- Path to Right System Uptime Metric -->
      <path d="M 660 70 C 620 110, 560 160, 500 250" class="flow-line line-5" pathLength="100" />
      <!-- Path to Orange Money Logo badge -->
      <path d="M 320 90 C 360 110, 420 160, 500 250" class="flow-line line-6" pathLength="100" />
      <!-- Path to Africell Money Logo badge -->
      <path d="M 300 400 C 340 380, 400 300, 500 250" class="flow-line line-7" pathLength="100" />
    </svg>

    <!-- Center core seal -->
    <div class="center-core-seal animate-pulse-glow">
      <div class="core-logo-orb">
        <img src={logoImg} class="logo-img-core" alt="Flot core logo" />
      </div>
    </div>

    <!-- Floating Credit Cards (Emphasized core features with 3D mouse parallax and floating bounce) -->
    
    <!-- Mastercard (Yellow) - Top Left -->
    <div 
      class="floating-node node-card-yellow float-bounce-1" 
      style:transform="translate({parallaxX * -0.25}px, {parallaxY * -0.25}px)"
    >
      <Card type="yellow" cardholder="Mohamed B." expiry="12/28" cardNumber="5412 7588 1922 4311" interactive={true} />
    </div>

    <!-- Flot Mint (Black) - Top Right -->
    <div 
      class="floating-node node-card-black float-bounce-2" 
      style:transform="translate({parallaxX * 0.3}px, {parallaxY * 0.3}px)"
    >
      <Card type="black" cardholder="Fatmata S." expiry="05/29" interactive={true} />
    </div>

    <!-- Visa (Green) - Bottom Right -->
    <div 
      class="floating-node node-card-green float-bounce-3" 
      style:transform="translate({parallaxX * -0.15}px, {parallaxY * 0.2}px)"
    >
      <Card type="green" cardholder="Aminata K." expiry="09/27" cardNumber="4000 1288 9576 1934" interactive={true} />
    </div>

    <!-- Floating Badges / Dashboards -->
    
    <!-- Left floating dashboard panel (Gross Volume) -->
    <div 
      class="floating-node node-dashboard-left {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}"
      style:transform="translate({parallaxX * -0.15}px, {parallaxY * -0.1}px)"
    >
      <div class="mini-metrics-group">
        <span class="label">Gross Volume</span>
        <div class="metrics-row">
          <span class="val">SLE 14.2M</span>
          <span class="trend">+34.2%</span>
        </div>
      </div>
    </div>

    <!-- Right floating dashboard panel (System status) -->
    <div 
      class="floating-node node-dashboard-right {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}"
      style:transform="translate({parallaxX * 0.15}px, {parallaxY * -0.15}px)"
    >
      <div class="mini-metrics-group">
        <span class="label">System Uptime</span>
        <div class="metrics-row">
          <span class="val">99.99%</span>
          <div class="pulse-indicator">
            <span class="pulse-dot-green"></span>
            <span class="status-lbl">LIVE</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating network payment logos -->
    <div 
      class="floating-node node-orange-money {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}"
      style:transform="translate({parallaxX * -0.1}px, {parallaxY * -0.2}px)"
    >
      <span class="network-badge orange-text">Orange Money</span>
    </div>

    <div 
      class="floating-node node-africell {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}"
      style:transform="translate({parallaxX * -0.2}px, {parallaxY * 0.1}px)"
    >
      <span class="network-badge red-text">Africell Money</span>
    </div>
  </div>

  <!-- Partner Trust Logo bar (centered block below the graphic canvas) -->
  <div class="hero-partners-row">
    <span class="partners-title">SUPPORTED PAYMENT CHANNELS & REGULATORY COMPLIANCE</span>
    <div class="partners-logos-container">
      <div class="partner-logo-item">
        <svg class="partner-logo-svg seal-logo" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
        </svg>
        <span>BSL Sandbox Approved</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg orange-money-logo" viewBox="0 0 24 24" width="16" height="16">
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
        </svg>
        <span class="font-accent">Orange Money</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg africell-money-logo" viewBox="0 0 24 24" width="16" height="16">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5" />
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        </svg>
        <span class="font-accent">Africell Money</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg qcell-money-logo" viewBox="0 0 24 24" width="16" height="16">
          <rect x="3" y="16" width="3.5" height="5" rx="1" fill="currentColor" />
          <rect x="8.5" y="12" width="3.5" height="9" rx="1" fill="currentColor" />
          <rect x="14" y="7" width="3.5" height="14" rx="1" fill="currentColor" />
          <rect x="19.5" y="2" width="3.5" height="19" rx="1" fill="currentColor" />
        </svg>
        <span class="font-accent">Qcell Money</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg visa-logo" viewBox="0 0 48 16" width="36" height="12">
          <path d="M18.2 1.2L15.3 14.8H12L9.2 3.6C8.9 2.5 8.1 1.9 7 1.7L1.8 1.4V0.8H8.8C9.7 0.8 10.5 1.4 10.7 2.4L12.5 12L15.8 0.8H18.2V1.2ZM34 9.8C34.1 6.5 29.3 6.3 29.3 4.7C29.3 4.2 29.8 3.6 30.9 3.5C31.5 3.4 33.1 3.3 34.1 3.8L34.7 0.9C33.8 0.6 32.7 0.5 31.4 0.5C27.9 0.5 25.4 2.3 25.4 5.3C25.4 9.1 30.6 9.3 30.6 11.2C30.6 11.8 30 12.3 28.8 12.5C27.9 12.6 26.5 12.5 25.5 12L24.9 14.9C25.9 15.4 27.3 15.6 28.7 15.6C32.4 15.6 34 13.6 34 9.8ZM45.7 14.8H48.8L46.1 1.2H43.2C42.5 1.2 41.9 1.6 41.6 2.3L36.3 14.8H39.6L40.3 12.9H44.3L44.7 14.8H45.7ZM41 10.7L42.8 5.7L43.8 10.7H41ZM23.3 1.2H20.4L16.2 14.8H19.5L23.3 1.2Z" fill="currentColor" />
        </svg>
        <span class="font-accent">Visa</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg mc-logo" viewBox="0 0 36 24" width="24" height="16">
          <circle cx="12" cy="12" r="10" fill="currentColor" class="mc-left-circle" />
          <circle cx="24" cy="12" r="10" fill="currentColor" class="mc-right-circle" />
        </svg>
        <span class="font-accent">Mastercard</span>
      </div>
      
      <div class="partner-logo-item">
        <svg class="partner-logo-svg lock-logo" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>PCI-DSS Compliant</span>
      </div>
    </div>
  </div>

  <!-- Bottom Grid Metrics Section -->
  <div class="metrics-grid">
    <!-- Card 1: Gross Volume Chart Card -->
    <div class="metric-card balance-card {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}">
      <div class="card-top">
        <div class="label-group">
          <span class="metric-label">{currentData.label}</span>
          <h2 class="metric-value">{currentData.value}</h2>
          <span class="percent-tag positive">{currentData.change}</span>
        </div>
        
        <!-- Timeline Row inside Card Header -->
        <div class="timeline-row">
          {#each ['1D', '1W', '1M', '6M', '1Y'] as timeline}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span 
              class:active={activeTimeline === timeline} 
              on:click={() => changeTimeline(timeline)}
            >
              {timeline}
            </span>
          {/each}
        </div>
      </div>

      <!-- SVG Bezier Chart (Tweened & Area Gradient) -->
      <div class="chart-container">
        <svg class="chart-svg" viewBox="0 0 280 100" width="100%" height="85">
          <!-- Background Grid Lines -->
          <line x1="0" y1="20" x2="280" y2="20" stroke="rgba(26, 26, 26, 0.025)" stroke-width="1" stroke-dasharray="2 2" />
          <line x1="0" y1="50" x2="280" y2="50" stroke="rgba(26, 26, 26, 0.025)" stroke-width="1" stroke-dasharray="2 2" />
          <line x1="0" y1="80" x2="280" y2="80" stroke="rgba(26, 26, 26, 0.025)" stroke-width="1" stroke-dasharray="2 2" />
          <line x1="0" y1="90" x2="280" y2="90" stroke="rgba(26, 26, 26, 0.035)" stroke-width="1" />
          
          <!-- Area Gradient path -->
          <path d={areaPathString} fill="rgba(133, 253, 198, 0.08)" />
          
          <!-- Primary Chart curve line -->
          <path d={pathString} fill="none" stroke="var(--color-text-main)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

          <!-- Vertical Hover Tracker Line -->
          {#if hoveredPoint !== null && $chartPoints[hoveredPoint]}
            <line 
              x1={$chartPoints[hoveredPoint].x} 
              y1={$chartPoints[hoveredPoint].y} 
              x2={$chartPoints[hoveredPoint].x} 
              y2="90" 
              stroke="var(--color-accent-hover)" 
              stroke-width="1.2" 
              stroke-dasharray="3 3"
            />
          {/if}

          <!-- Interactive Hover Points (representing the tweened coordinates) -->
          {#each $chartPoints as pt, idx}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <circle 
              cx={pt.x} 
              cy={pt.y} 
              r="4.5" 
              class="interactive-dot"
              class:hovered={hoveredPoint === idx}
              on:mouseenter={() => hoveredPoint = idx}
              on:mouseleave={() => hoveredPoint = null}
            />
          {/each}
        </svg>

        <!-- Dynamic Tooltips mapped to original dataset values -->
        {#each currentData.points as pt, idx}
          {#if hoveredPoint === idx && $chartPoints[idx]}
            <div 
              class="chart-tooltip" 
              style:left="{$chartPoints[idx].x}px" 
              style:top="{$chartPoints[idx].y - 38}px"
            >
              <span class="tooltip-val">{pt.value}</span>
              <span class="tooltip-date">{pt.date}</span>
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Column 2: Unified Health & Live Revenue Card -->
    <div class="metric-card unified-health-card {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}">
      <!-- Upper Section: Live Revenue Counter -->
      <div class="health-top-section">
        <div class="label-row">
          <span class="metric-label">Today's revenue</span>
          <div class="live-pulse-container">
            <span class="pulse-dot-green"></span>
            <span class="live-text">LIVE</span>
          </div>
        </div>
        
        <h2 class="metric-value">SLE {formattedRevenue}</h2>
        
        <!-- Scrolling single transaction feed -->
        <div class="live-ledger-single">
          {#key transactionsList[0].id}
            <div class="single-tx-item" in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
              <span class="tx-badge {transactionsList[0].brandClass}">{transactionsList[0].network}</span>
              <span class="tx-text">to {transactionsList[0].merchant}</span>
              <span class="tx-amount">{transactionsList[0].amount}</span>
            </div>
          {/key}
        </div>
      </div>
      
      <!-- Middle Divider -->
      <div class="health-divider"></div>
      
      <!-- Lower Section: Uptime & API Latency Monitor -->
      <div class="health-bottom-section">
        <div class="stats-split">
          <div class="stat-item">
            <span class="label">System Uptime</span>
            <span class="val">99.99%</span>
          </div>
          <div class="stat-item">
            <span class="label">P95 Latency</span>
            <span class="val">&lt;200ms</span>
          </div>
        </div>

        <!-- Interactive 24-Day Uptime Ticks (more breathing room) -->
        <div class="uptime-bar-status">
          {#each uptimeDays.slice(0, 24) as day, idx}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span 
              class="uptime-tick" 
              class:green={day.uptime === 100}
              class:yellow={day.uptime < 100}
              on:mouseenter={() => hoveredUptimeDay = idx}
              on:mouseleave={() => hoveredUptimeDay = null}
            >
              {#if hoveredUptimeDay === idx}
                <div class="uptime-tooltip">
                  <span class="tooltip-date">{day.date}</span>
                  <span class="tooltip-val">{day.uptime}% Uptime</span>
                </div>
              {/if}
            </span>
          {/each}
        </div>
      </div>
    </div>

    <!-- Column 3: The FAQ Accordion Card -->
    <div class="metric-card faq-accordion-card {theme === 'dark' ? 'glass-card-dark' : 'glass-card-light'}">
      <div class="faq-accordion-header">
        <svg class="faq-header-star" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
        </svg>
        <h3 class="faq-accent-title">Frequently Asked Questions</h3>
      </div>
      
      <div class="faq-accordion">
        <!-- FAQ 1 -->
        <div class="faq-item" class:active={activeFaq === 0}>
          <button class="faq-trigger" on:click={() => toggleFaq(0)}>
            <span>How fast is settlement?</span>
            <svg class="faq-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {#if activeFaq === 0}
            <div class="faq-content" transition:slide|local>
              <p>Settlement is instant. Funds hit your Flot Business account the moment a payment is successfully processed.</p>
            </div>
          {/if}
        </div>

        <!-- FAQ 2 -->
        <div class="faq-item" class:active={activeFaq === 1}>
          <button class="faq-trigger" on:click={() => toggleFaq(1)}>
            <span>What payment methods are supported?</span>
            <svg class="faq-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {#if activeFaq === 1}
            <div class="faq-content" transition:slide|local>
              <p>We support Mobile Money (Orange Money, Africell, Qcell), Visa, Mastercard, and direct Flot account transfers.</p>
            </div>
          {/if}
        </div>

        <!-- FAQ 3 -->
        <div class="faq-item" class:active={activeFaq === 2}>
          <button class="faq-trigger" on:click={() => toggleFaq(2)}>
            <span>How do I order a business card?</span>
            <svg class="faq-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {#if activeFaq === 2}
            <div class="faq-content" transition:slide|local>
              <p>Debit cards can be ordered directly from the Flot app after verifying your business details. They are shipped in 3 business days.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Stripe-style connection flow lines */
  .flow-line {
    fill: none;
    stroke: #00b4ff !important; /* Premium neon sky blue core in light mode for readability on off-white */
    stroke-width: 2.5px !important; /* Reduced node width to make them delicate and smaller */
    stroke-linecap: round;
    stroke-dasharray: 6, 100; /* 6% packet length, 100% path length spacing using pathLength="100" */
    filter: url(#glow-light-node); /* Apply premium multi-stage SVG glow filter */
    animation: flowNode 3.5s linear infinite;
    opacity: 0.95;
    will-change: stroke-dashoffset; /* Promote properties to GPU/compositor thread */
    /* Force GPU layers to ensure subpixel smoothness during animations */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  :global(.app-layout.theme-dark) .flow-line {
    stroke: #ffffff !important; /* Pure white core in dark mode for maximum contrast and high-voltage glow */
  }

  .line-1 { animation-delay: 0.2s; animation-duration: 2.8s; }
  .line-2 { animation-delay: 1.4s; animation-duration: 3.5s; }
  .line-3 { animation-delay: 0.8s; animation-duration: 3.0s; }
  .line-4 { animation-delay: 2.1s; animation-duration: 4.0s; }
  .line-5 { animation-delay: 1.7s; animation-duration: 3.3s; }
  .line-6 { animation-delay: 0.5s; animation-duration: 2.5s; }
  .line-7 { animation-delay: 2.5s; animation-duration: 3.8s; }

  /* 2-point linear keyframes allow the browser to run animations natively on the compositor thread for maximum smoothness */
  @keyframes flowNode {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }

  .hero-section {
    padding-top: calc(var(--space-4xl) + 60px);
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
    align-items: center;
  }

  /* Centered Header Styles */
  .hero-center-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    z-index: 10;
  }

  .hero-badge {
    background: rgba(133, 253, 198, 0.15);
    color: #0b663b;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    width: max-content;
  }

  .hero-heading {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.04em;
    color: var(--color-text-main);
  }

  .text-accent-gradient {
    font-weight: 700;
    background: linear-gradient(135deg, #1A1A1A 0%, #000 40%, #0c663b 100%);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    position: relative;
    display: inline-block;
    padding-bottom: 2px;
  }
  
  .text-accent-gradient::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #85FDC6 0%, #aefee0 100%);
    border-radius: 100px;
  }

  .hero-subtext {
    font-size: 15px;
    color: var(--color-text-sec);
    max-width: 620px;
    line-height: 1.6;
    margin: 0 auto;
  }

  /* Double-Pill CTA button (Vizii inspired) */
  .cta-double-pill {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  .cta-pill-inner {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid var(--color-border-light);
    border-radius: 100px;
    padding: 5px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    gap: 8px;
  }

  .cta-primary-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 13.5px;
    font-weight: 600;
    color: var(--color-text-main);
    background-color: var(--color-accent);
    padding: 10px 22px;
    border-radius: 100px;
    box-shadow: 0 2px 8px rgba(133, 253, 198, 0.25);
    transition: var(--transition-smooth);
  }

  .cta-primary-pill:hover {
    background-color: var(--color-accent-hover);
    transform: scale(1.02);
    box-shadow: 0 4px 14px rgba(133, 253, 198, 0.4);
  }

  .cta-primary-pill:hover .arrow-icon {
    transform: translateX(3px);
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .cta-secondary-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-sec);
    padding: 0 16px 0 8px;
    transition: var(--transition-smooth);
  }

  .cta-secondary-link:hover {
    color: var(--color-text-main);
  }

  .whatsapp-icon {
    color: #25d366;
  }

  .pulse-dot-green {
    width: 6px;
    height: 6px;
    background-color: #25d366;
    border-radius: 50%;
    position: relative;
    display: inline-block;
  }

  .pulse-dot-green::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #25d366;
    animation: pulse-ring-green 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  @keyframes pulse-ring-green {
    0% { transform: scale(0.33); opacity: 1; }
    80%, 100% { transform: scale(3.5); opacity: 0; }
  }

  /* Interactive Canvas Layout */
  .hero-canvas-container {
    width: 100%;
    max-width: 1100px;
    height: 480px;
    position: relative;
    margin: 20px auto 0 auto;
    overflow: visible;
  }

  .canvas-backlight {
    position: absolute;
    width: 350px;
    height: 350px;
    left: calc(50% - 175px);
    top: calc(50% - 175px);
    background: radial-gradient(circle, rgba(133, 253, 198, 0.28) 0%, rgba(133, 253, 198, 0) 70%);
    filter: blur(40px);
    z-index: 1;
    pointer-events: none;
    transition: transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1);
  }

  .canvas-grid-pattern {
    position: absolute;
    width: 320px;
    height: 320px;
    left: calc(50% - 160px);
    top: calc(50% - 160px);
    background-image: radial-gradient(rgba(26, 26, 26, 0.05) 1px, transparent 0);
    background-size: 16px 16px;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
  }

  .canvas-connectors {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    /* Promote entire SVG container to GPU compositor thread for subpixel anti-aliasing */
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  .center-core-seal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }

  .core-logo-orb {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid rgba(133, 253, 198, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 30px rgba(133, 253, 198, 0.25), inset 0 2px 4px rgba(255,255,255,1);
    cursor: pointer;
  }

  .logo-img-core {
    width: 38px;
    height: 38px;
    object-fit: contain;
    border-radius: 8px;
  }

  /* Floating Nodes (Absolute Positions) */
  .floating-node {
    position: absolute;
    z-index: 4;
    transition: transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1);
  }

  /* Credit Cards */
  .node-card-yellow {
    left: 8%;
    top: 6%;
  }

  .node-card-black {
    right: 8%;
    top: 8%;
    z-index: 6; /* black card on top */
  }

  .node-card-green {
    right: 12%;
    bottom: 4%;
  }

  /* Metric Badges */
  .node-dashboard-left {
    left: 4%;
    bottom: 22%;
    padding: 14px 20px;
    border-radius: 16px;
    width: max-content;
    box-shadow: 0 8px 24px rgba(0,0,0,0.02);
  }

  .node-dashboard-right {
    right: 28%;
    top: 2%;
    padding: 12px 18px;
    border-radius: 16px;
    width: max-content;
    box-shadow: 0 8px 24px rgba(0,0,0,0.02);
  }

  .mini-metrics-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mini-metrics-group .label {
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-weight: 600;
  }

  .mini-metrics-group .metrics-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mini-metrics-group .val {
    font-family: var(--font-heading);
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  .mini-metrics-group .trend {
    font-size: 10px;
    color: #28a745;
    font-weight: 600;
    background: rgba(40,167,69,0.08);
    padding: 1px 6px;
    border-radius: 100px;
  }

  .pulse-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(40, 167, 69, 0.08);
    border-radius: 100px;
    padding: 1px 6px;
  }

  .pulse-indicator .status-lbl {
    font-size: 7px;
    font-weight: 700;
    color: #28a745;
  }

  /* Network Pills */
  .node-orange-money {
    left: 35%;
    top: 10%;
    padding: 8px 14px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
  }

  .orange-text {
    color: #ff6600;
  }

  .node-africell {
    left: 28%;
    bottom: 8%;
    padding: 8px 14px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
  }

  .red-text {
    color: #e30613;
  }

  /* Gentle bounce animations for floating cards */
  .float-bounce-1 {
    animation: float-card-1 6s ease-in-out infinite;
  }
  .float-bounce-2 {
    animation: float-card-2 7s ease-in-out infinite;
  }
  .float-bounce-3 {
    animation: float-card-3 8s ease-in-out infinite;
  }

  @keyframes float-card-1 {
    0%, 100% { transform: translateY(0) rotate(-4deg); }
    50% { transform: translateY(-12px) rotate(-2deg); }
  }

  @keyframes float-card-2 {
    0%, 100% { transform: translateY(0) rotate(8deg); }
    50% { transform: translateY(-10px) rotate(6deg); }
  }

  @keyframes float-card-3 {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-8px) rotate(-4deg); }
  }

  /* Pause bounce animations on hover for clean UX card tilt */
  .floating-node:hover {
    animation-play-state: paused;
    z-index: 10;
  }

  /* Partner Logo Bar */
  /* Partner Compliance Row */
  .hero-partners-row {
    width: 100%;
    border-top: 1px solid var(--color-border-light);
    border-bottom: 1px solid var(--color-border-light);
    padding: 18px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
    background: rgba(250, 250, 250, 0.4);
  }

  .partners-title {
    font-size: 9px;
    font-weight: 700;
    color: var(--color-text-muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .partners-logos-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 28px;
  }

  .partner-logo-item {
    font-family: var(--font-heading);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--color-text-sec);
    display: flex;
    align-items: center;
    gap: 7px;
    transition: var(--transition-smooth);
    cursor: default;
  }

  .partner-logo-item .partner-logo-svg {
    transition: var(--transition-smooth);
    color: var(--color-text-muted);
  }

  .partner-logo-item:hover {
    color: var(--color-text-main);
  }

  /* Shifting brand colors on hover for compliance SVGs */
  .partner-logo-item:hover .seal-logo {
    color: #bfa15f;
    filter: drop-shadow(0 0 4px rgba(191, 161, 95, 0.2));
  }
  .partner-logo-item:hover .orange-money-logo {
    color: #ff6600;
    filter: drop-shadow(0 0 6px rgba(255, 102, 0, 0.3));
  }
  .partner-logo-item:hover .africell-money-logo {
    color: #e30613;
    filter: drop-shadow(0 0 6px rgba(227, 6, 19, 0.3));
  }
  .partner-logo-item:hover .qcell-money-logo {
    color: #00A859;
    filter: drop-shadow(0 0 6px rgba(0, 168, 89, 0.3));
  }
  .partner-logo-item:hover .visa-logo {
    color: #1a1f71;
    filter: drop-shadow(0 0 4px rgba(26, 31, 113, 0.25));
  }
  .partner-logo-item:hover .mc-logo {
    filter: drop-shadow(0 0 4px rgba(235, 0, 27, 0.25));
  }
  .partner-logo-item:hover .mc-logo .mc-left-circle {
    color: #eb001b;
  }
  .partner-logo-item:hover .mc-logo .mc-right-circle {
    color: #f79e1b;
  }
  .partner-logo-item:hover .lock-logo {
    color: #25d366;
    filter: drop-shadow(0 0 4px rgba(37, 211, 102, 0.2));
  }

  .partner-logo-item.font-accent {
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  
  /* Bottom Metrics Grid (3 Columns) */
  .metrics-grid {
    display: grid;
    grid-template-columns: 1.25fr 1fr 1fr;
    gap: 24px;
    margin-top: 10px;
    width: 100%;
  }

  .metric-card {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 224px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01), inset 0 1px 1px rgba(255, 255, 255, 0.6);
    border: 1px solid var(--color-border-light);
    border-radius: 24px;
    transition: var(--transition-smooth);
    position: relative;
    overflow: hidden;
  }

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03), inset 0 1px 1.5px rgba(255, 255, 255, 0.8);
    border-color: rgba(26, 26, 26, 0.1);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .label-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .metric-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    font-weight: 700;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin-top: 2px;
    color: var(--color-text-main);
    line-height: 1.1;
  }

  .percent-tag {
    font-size: 10px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 20px;
    width: max-content;
    margin-top: 3px;
  }

  .percent-tag.positive {
    background: rgba(40, 167, 69, 0.06);
    color: #28a745;
    border: 0.5px solid rgba(40, 167, 69, 0.1);
  }

  /* SVG Chart styles */
  .chart-container {
    position: relative;
    margin-top: 10px;
  }

  .chart-svg {
    overflow: visible;
  }

  .interactive-dot {
    fill: var(--color-text-main);
    stroke: #fff;
    stroke-width: 2px;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.2), fill 0.2s ease;
  }

  .interactive-dot.hovered {
    fill: var(--color-accent-hover);
    transform: scale(1.5);
    transform-origin: center;
  }

  .chart-tooltip {
    position: absolute;
    background: #111111;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    pointer-events: none;
    transform: translateX(-50%);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    transition: left 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .chart-tooltip .tooltip-val {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 11px;
  }

  .chart-tooltip .tooltip-date {
    font-size: 8px;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }

  .chart-tooltip::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 3px 3px 0;
    border-style: solid;
    border-color: #111111 transparent;
  }

  /* Inline Chart Timelines */
  .timeline-row {
    display: flex;
    gap: 2px;
    background: rgba(26, 26, 26, 0.025);
    border-radius: 8px;
    padding: 2px;
    border: 1px solid rgba(26, 26, 26, 0.04);
    height: max-content;
  }

  .timeline-row span {
    padding: 4px 6px;
    font-size: 8.5px;
    font-weight: 650;
    border-radius: 6px;
    cursor: pointer;
    transition: var(--transition-smooth);
    color: var(--color-text-sec);
  }

  .timeline-row span:hover {
    color: var(--color-text-main);
  }

  .timeline-row span.active {
    background: #ffffff;
    color: var(--color-text-main);
    font-weight: 700;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  /* Unified Center Health & Revenue Card */
  .unified-health-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22px 24px;
    gap: 0;
  }

  .health-top-section {
    display: flex;
    flex-direction: column;
    height: 48%;
    justify-content: flex-start;
  }

  .health-top-section .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .live-pulse-container {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(40, 167, 69, 0.08);
    border-radius: 100px;
    padding: 2px 7px;
    height: max-content;
    border: 0.5px solid rgba(40, 167, 69, 0.12);
  }

  .live-text {
    font-size: 8px;
    font-weight: 700;
    color: #28a745;
    letter-spacing: 0.06em;
  }

  /* Single transaction feed ledger */
  .live-ledger-single {
    height: 20px;
    margin-top: 8px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
  }

  .single-tx-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: rgba(26, 26, 26, 0.65);
    font-weight: 500;
    width: 100%;
  }

  .tx-badge {
    background: rgba(26, 26, 26, 0.04);
    border-radius: 100px;
    padding: 1px 6px;
    font-weight: 700;
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    border: 0.5px solid rgba(26, 26, 26, 0.03);
  }

  .tx-badge.visa { color: #1a1f71; background: rgba(26, 31, 113, 0.04); }
  .tx-badge.mastercard { color: #eb001b; background: rgba(235, 0, 27, 0.04); }
  .tx-badge.orange { color: #ff6600; background: rgba(255, 102, 0, 0.04); }
  .tx-badge.africell { color: #e30613; background: rgba(227, 6, 19, 0.04); }
  .tx-badge.qcell { color: #00A859; background: rgba(0, 168, 89, 0.04); }
  .tx-badge.flot { color: #0b663b; background: rgba(11, 102, 59, 0.04); }

  .tx-amount {
    color: #0b663b;
    font-weight: 700;
    margin-left: auto;
    font-family: var(--font-heading);
  }

  /* Middle Divider */
  .health-divider {
    width: 100%;
    height: 1px;
    background-color: var(--color-border-light);
    margin: 4px 0;
  }

  .health-bottom-section {
    display: flex;
    flex-direction: column;
    height: 48%;
    justify-content: flex-end;
  }

  /* Health Uptime stats */
  .stats-split {
    display: flex;
    gap: 20px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-item .label {
    font-size: 7.5px;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
  }

  .stat-item .val {
    font-family: var(--font-heading);
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  /* Uptime ticks status */
  .uptime-bar-status {
    display: flex;
    gap: 3.5px;
    margin-top: 8px;
    align-items: center;
    height: 10px;
    position: relative;
  }

  .uptime-tick {
    flex-grow: 1;
    height: 8px;
    border-radius: 1.5px;
    background: #e1e2e6;
    transition: transform 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }

  .uptime-tick.green {
    background: #28a745;
  }

  .uptime-tick.yellow {
    background: #ffc107;
  }

  .uptime-tick:hover {
    transform: scaleY(1.4);
    background: var(--color-accent-hover) !important;
  }

  /* Uptime Tooltip */
  .uptime-tooltip {
    position: absolute;
    background: #111111;
    color: #ffffff;
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 9px;
    font-weight: 600;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 10;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .uptime-tooltip .tooltip-date {
    font-size: 7.5px;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }

  .uptime-tooltip::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 3px 3px 0;
    border-style: solid;
    border-color: #111111 transparent;
  }

  /* FAQ Accordion Card */
  .faq-accordion-card {
    overflow-y: hidden; /* disable scrollbar */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }

  .faq-accordion-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-main);
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: 8px;
  }

  .faq-header-star {
    color: var(--color-accent-hover);
    animation: star-spin-pulse 5s linear infinite;
  }

  @keyframes star-spin-pulse {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }

  .faq-accent-title {
    font-family: var(--font-heading);
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0;
    margin-top: 4px;
  }

  .faq-item {
    border: none;
    border-bottom: 1px solid var(--color-border-light);
    background: transparent;
    width: 100%;
    transition: var(--transition-smooth);
    overflow: hidden;
    border-radius: 0;
    box-shadow: none;
  }

  .faq-item:last-child {
    border-bottom: none;
  }

  .faq-item.active {
    box-shadow: none;
    border-bottom: 1px solid var(--color-border-light);
  }

  .faq-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    text-align: left;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-sec);
    transition: var(--transition-smooth);
  }

  .faq-trigger:hover {
    color: var(--color-text-main);
  }

  .faq-icon {
    color: var(--color-text-muted);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
  }

  .faq-item.active .faq-trigger {
    color: var(--color-text-main);
  }

  .faq-item.active .faq-icon {
    transform: rotate(135deg); /* converts + into x */
    color: var(--color-text-main);
  }

  .faq-content {
    font-size: 10.5px;
    color: var(--color-text-sec);
    padding: 0 0 10px 0;
    line-height: 1.55;
  }

  /* Responsive Styling */
  @media (max-width: 1024px) {
    .hero-heading {
      font-size: 52px;
    }

    .hero-canvas-container {
      height: 420px;
    }

    .node-card-yellow {
      left: 4%;
      top: 4%;
    }

    .node-card-black {
      right: 4%;
      top: 6%;
    }

    .node-card-green {
      right: 8%;
      bottom: 2%;
    }

    .metrics-grid {
      grid-template-columns: 1.2fr 1fr;
    }

    .faq-accordion-card {
      grid-column: span 2;
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      padding-top: calc(var(--space-4xl) + 20px);
    }

    .hero-heading {
      font-size: 42px;
    }

    .hero-canvas-container {
      height: 480px;
    }

    /* Hide connection SVG lines on mobile to avoid clutter */
    .canvas-connectors {
      display: none;
    }

    /* Reposition nodes on mobile for stackable vertical visual flow */
    .node-card-yellow {
      left: 10%;
      top: 5%;
      transform: scale(0.8) !important;
    }

    .node-card-black {
      right: 10%;
      top: 10%;
      transform: scale(0.85) !important;
    }

    .node-card-green {
      right: 15%;
      bottom: 5%;
      transform: scale(0.8) !important;
    }

    .node-dashboard-left {
      left: 5%;
      bottom: 15%;
      transform: scale(0.85);
    }

    .node-dashboard-right {
      right: 25%;
      top: 2%;
      transform: scale(0.85);
    }

    .node-orange-money {
      left: 45%;
      top: 30%;
    }

    .node-africell {
      left: 15%;
      bottom: 5%;
    }

    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .faq-accordion-card {
      grid-column: span 1;
    }
  }

  @media (max-width: 480px) {
    .hero-heading {
      font-size: 34px;
    }

    .hero-canvas-container {
      height: 380px;
    }

    /* Stack cards heavily on small viewports */
    .node-card-yellow {
      left: 0;
      top: 15%;
      transform: scale(0.7) rotate(-6deg) !important;
    }

    .node-card-black {
      right: 0;
      top: 20%;
      transform: scale(0.75) rotate(4deg) !important;
    }

    .node-card-green {
      right: 5%;
      bottom: 5%;
      transform: scale(0.7) rotate(-2deg) !important;
    }

    .node-dashboard-left, .node-dashboard-right {
      display: none; /* Hide mini dashboards on micro viewports */
    }

    .node-orange-money, .node-africell {
      transform: scale(0.8);
    }
    
    .partners-logos-container {
      gap: 16px;
    }
  }
</style>
