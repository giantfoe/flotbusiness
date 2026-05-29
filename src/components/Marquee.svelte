<script>
  export let items = ["Orange", "Africell", "Visa", "Mastercard", "Flot"];
  export let speed = "25s"; // Animation speed
</script>

<div class="marquee-container">
  <div class="marquee-track" style:animation-duration={speed}>
    <!-- Group 1 -->
    <div class="marquee-content">
      {#each Array(4) as _}
        {#each items as item}
          <div class="marquee-item">
            <span>{item}</span>
            <span class="marquee-star">✳</span>
          </div>
        {/each}
      {/each}
    </div>
    <!-- Group 2 (duplicated for seamless loop) -->
    <div class="marquee-content" aria-hidden="true">
      {#each Array(4) as _}
        {#each items as item}
          <div class="marquee-item">
            <span>{item}</span>
            <span class="marquee-star">✳</span>
          </div>
        {/each}
      {/each}
    </div>
  </div>
</div>
