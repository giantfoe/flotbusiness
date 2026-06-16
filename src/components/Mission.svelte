<script>
  import { onMount } from "svelte";

  const missionText = "Flot is a secure digital financial platform that helps individuals and businesses manage payments, transfers, and everyday financial transactions from a single app.";
  const words = missionText.split(" ");
  
  let sectionEl;
  let scrollProgress = 0; // 0 to 1

  function handleScroll() {
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate when the section enters the bottom of the screen to when it leaves the top
    const startOffset = viewportHeight * 0.9;
    const endOffset = viewportHeight * 0.2;
    
    const totalDistance = startOffset - endOffset;
    const currentPos = rect.top - endOffset;
    
    // Calculate progress (0 = not reached startOffset, 1 = scrolled past endOffset)
    let progress = 1 - (currentPos / totalDistance);
    scrollProgress = Math.max(0, Math.min(1, progress));
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<section ref={sectionEl} bind:this={sectionEl} class="mission-section section-container">
  <div class="mission-top-grid">
    <!-- Left Column: Team info -->
    <div class="founder-info">
      <h3 class="founder-name">Flot Team</h3>
      <span class="founder-title">Sierra Leone's Fintech Hub</span>
      
      <!-- Big number below -->
      <div class="founder-stat">150k+</div>
    </div>

    <!-- Right Column: Interactive Word Reveal -->
    <div class="mission-text-container">
      <p class="mission-paragraph">
        {#each words as word, i}
          {@const wordProgress = (i + 1) / words.length}
          {@const isActive = scrollProgress >= wordProgress * 0.85} 
          <span 
            class="reveal-word" 
            class:active={isActive}
            style:transition-delay="{i * 0.01}s"
          >
            {word}&nbsp;
          </span>
        {/each}
      </p>
    </div>
  </div>

  <!-- Bottom Column: 4 Stats -->
  <div class="stats-row">
    <div class="stat-col">
      <span class="stat-num">99.99%</span>
      <span class="stat-label">Uptime Guarantee (SLA)</span>
    </div>
    <div class="stat-col">
      <span class="stat-num">&lt;200ms</span>
      <span class="stat-label">P95 API Response Latency</span>
    </div>
    <div class="stat-col">
      <span class="stat-num">150k+</span>
      <span class="stat-label">Transactions Processed</span>
    </div>
    <div class="stat-col">
      <span class="stat-num">4.9/5</span>
      <span class="stat-label">Developer Rating (200+ reviews)</span>
    </div>
  </div>
</section>

<style>
  .mission-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
    border-bottom: 1px solid var(--color-border-light);
  }

  .mission-top-grid {
    display: grid;
    grid-template-columns: 1.1fr 2fr;
    gap: 40px;
    align-items: start;
  }

  .founder-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .founder-name {
    font-size: 20px;
    font-weight: 600;
  }

  .founder-title {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .founder-stat {
    font-family: var(--font-heading);
    font-size: 84px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text-main);
    margin-top: var(--space-xl);
  }

  .mission-text-container {
    padding-top: 10px;
  }

  .mission-paragraph {
    font-family: var(--font-heading);
    font-size: 42px;
    line-height: 1.25;
    font-weight: 500;
    color: var(--color-text-muted);
    letter-spacing: -0.02em;
  }

  .reveal-word {
    display: inline-block;
    color: #cecfd2;
    transition: color 0.4s ease;
  }

  .reveal-word.active {
    color: var(--color-text-main);
  }

  /* Bottom Stats Row */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    border-top: 1px solid var(--color-border-light);
    padding-top: var(--space-2xl);
  }

  .stat-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-num {
    font-family: var(--font-heading);
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    font-size: 12px;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .mission-top-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    
    .founder-stat {
      display: none; /* Hide double redundant stat on small devices */
    }

    .mission-paragraph {
      font-size: 28px;
    }

    .stats-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal-word {
      color: var(--color-text-main) !important;
      transition: none !important;
    }
  }
</style>
