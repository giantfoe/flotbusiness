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
  import Lenis from "lenis";

  let variant = "a"; // "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
  let lenis;
  let rafId;

  onMount(() => {
    // Read from URL query param on mount
    const params = new URLSearchParams(window.location.search);
    const vParam = params.get("v") || params.get("variant");
    if (["a", "b", "c", "d", "e", "f", "g", "h"].includes(vParam)) {
      variant = vParam;
    } else {
      variant = "a";
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
  <Header />

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
      <HeroC theme="light" />
    {:else if variant === "f"}
      <!-- Variant F: Enblex Centered Layout (Dark) -->
      <HeroC theme="dark" />
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
    <CTA />
  </main>

  <!-- Symmetrical Floating 2-Row Variant Switcher -->
  <div class="variant-switcher glass-card-dark">
    <div class="switcher-row">
      <span class="switcher-row-label">LIGHT</span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'a' ? 'active' : ''}" 
        on:click={() => setVariant('a')}
      >
        A
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'b' ? 'active' : ''}" 
        on:click={() => setVariant('b')}
      >
        B
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'c' ? 'active' : ''}" 
        on:click={() => setVariant('c')}
      >
        C
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'g' ? 'active' : ''}" 
        on:click={() => setVariant('g')}
      >
        G
      </div>
    </div>
    <div class="switcher-row">
      <span class="switcher-row-label">DARK</span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'd' ? 'active' : ''}" 
        on:click={() => setVariant('d')}
      >
        D
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'e' ? 'active' : ''}" 
        on:click={() => setVariant('e')}
      >
        E
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'f' ? 'active' : ''}" 
        on:click={() => setVariant('f')}
      >
        F
      </div>
      
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
        class="switcher-btn {variant === 'h' ? 'active' : ''}" 
        on:click={() => setVariant('h')}
      >
        H
      </div>
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

  /* Symmetrical Floating 2-Row Switcher Capsule */
  .variant-switcher {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 18px;
    background: rgba(17, 17, 17, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.1);
  }

  .switcher-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .switcher-row-label {
    font-family: var(--font-body);
    font-size: 8px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    width: 36px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .switcher-btn {
    padding: 6px 12px;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: var(--transition-smooth);
    user-select: none;
    text-align: center;
    min-width: 28px;
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
      left: 16px;
      padding: 8px;
      border-radius: 14px;
    }
    
    .switcher-row {
      width: 100%;
      justify-content: space-between;
    }
    
    .switcher-btn {
      flex-grow: 1;
      padding: 5px;
    }
  }
</style>
