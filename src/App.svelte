<script>
  import { onMount, onDestroy } from "svelte";
  import Header from "./components/Header.svelte";
  import Hero from "./components/Hero.svelte";
  import HeroB from "./components/HeroB.svelte";
  import HeroC from "./components/HeroC.svelte";
  import HeroD from "./components/HeroD.svelte";
  import Marquee from "./components/Marquee.svelte";
  import Mission from "./components/Mission.svelte";
  import AppShowcase from "./components/AppShowcase.svelte";
  import Services from "./components/Services.svelte";
  import Benefits from "./components/Benefits.svelte";
  import Testimonial from "./components/Testimonial.svelte";
  import CTA from "./components/CTA.svelte";
  import DownloadModal from "./components/DownloadModal.svelte";
  import Lenis from "lenis";

  let showDownloadModal = false;

  let variant = "c"; // "c" | "f" (Variant C is Centered Light, F is Centered Dark)
  let lenis;
  let rafId;

  onMount(() => {
    // Read from URL query param on mount
    const params = new URLSearchParams(window.location.search);
    const vParam = params.get("v") || params.get("variant");
    if (["c", "f"].includes(vParam)) {
      variant = vParam;
    } else {
      variant = "c";
    }

    // Initialize Lenis smooth scroll if the user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth inertia ease
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (lenis) lenis.destroy();
  });

  function setVariant(v) {
    variant = v;
    // Push new query parameter state dynamically
    const url = new URL(window.location);
    url.searchParams.set("v", v);
    window.history.pushState({}, "", url);

    // Reset scroll smoothly to top on change
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }
</script>

<div class="app-layout {['d', 'e', 'f', 'h'].includes(variant) ? 'theme-dark' : ''}">
  <!-- Global Navbar -->
  <Header onOpenDownload={() => showDownloadModal = true} />

  <!-- Main Scroll Container -->
  <main class="main-content">
    <!-- Render selected Hero Variant for A/B/C Testing -->
    {#if variant === "a"}
      <!-- Variant A: Dashboard Grid Layout (Light) -->
      <Hero theme="light" />
    {:else if variant === "d"}
      <!-- Variant D: Dashboard Grid Layout (Dark) -->
      <Hero theme="dark" />
    {:else if variant === "b"}
      <!-- Variant B: Draftr Split Layout (Light) -->
      <HeroB theme="light" />
    {:else if variant === "e"}
      <!-- Variant E: Draftr Split Layout (Dark) -->
      <HeroB theme="dark" />
    {:else if variant === "c"}
      <!-- Variant C: Enblex Centered Layout (Light) -->
      <HeroC theme="light" onOpenDownload={() => showDownloadModal = true} />
    {:else if variant === "f"}
      <!-- Variant F: Enblex Centered Layout (Dark) -->
      <HeroC theme="dark" onOpenDownload={() => showDownloadModal = true} />
    {:else if variant === "g"}
      <!-- Variant G: Cosmotic Parallax Layout (Light) -->
      <HeroD theme="light" />
    {:else if variant === "h"}
      <!-- Variant H: Cosmotic Parallax Layout (Dark) -->
      <HeroD theme="dark" />
    {/if}

    <!-- Intersecting scrolling banner 1 -->
    <Marquee items={["ORANGE", "AFRICELL", "VISA", "MASTERCARD", "FLOT"]} speed="25s" />

    <!-- Mission statement with scroll reveal & stats -->
    <Mission />

    <!-- Phone showcase mockup with floating badges -->
    <AppShowcase />

    <!-- Four simple steps accordion -->
    <Services />

    <!-- Benefits section (dark theme + currency converter) -->
    <Benefits />

    <!-- Intersecting scrolling banner 2 -->
    <Marquee items={["SELL EVERYWHERE", "PAY INSTANTLY", "ONE INTEGRATION"]} speed="35s" />

    <!-- Testimonials slider -->
    <Testimonial />

    <!-- CTA & Footer -->
    <CTA onOpenDownload={() => showDownloadModal = true} />
  </main>

  {#if showDownloadModal}
    <DownloadModal onClose={() => showDownloadModal = false} />
  {/if}

  <!-- Symmetrical Floating Theme Switcher Toggle -->
  <div class="variant-switcher glass-card-dark">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="switcher-btn {variant === 'c' ? 'active' : ''}" 
      on:click={() => setVariant('c')}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <span>Light</span>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="switcher-btn {variant === 'f' ? 'active' : ''}" 
      on:click={() => setVariant('f')}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span>Dark</span>
    </div>
  </div>
</div>

<style>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg-light);
    position: relative;
  }

  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  /* Floating Switcher Capsule */
  .variant-switcher {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 30px;
    background: rgba(17, 17, 17, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.15);
  }

  .switcher-btn {
    padding: 8px 16px;
    border-radius: 20px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: var(--transition-smooth);
    user-select: none;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .switcher-btn:hover {
    color: var(--color-white);
    background: rgba(255, 255, 255, 0.08);
  }

  .switcher-btn.active {
    color: #111111;
    background-color: var(--color-accent);
    box-shadow: 0 4px 12px rgba(133, 253, 198, 0.35);
  }

  @media (max-width: 768px) {
    .variant-switcher {
      bottom: 20px;
      right: 20px;
    }
  }

  @media (max-width: 600px) {
    .variant-switcher {
      bottom: 16px;
      right: 16px;
      left: auto;
      padding: 4px;
      border-radius: 30px;
    }
    
    .switcher-btn {
      padding: 6px 12px;
      font-size: 11px;
    }
  }
</style>
