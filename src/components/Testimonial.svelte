<script>
  import { fade } from "svelte/transition";
  import fatmataImage from "../assets/testimonial_fatmata.png";
  import mohamedImage from "../assets/testimonial_mohamed.png";

  const testimonials = [
    {
      text: "Flot has completely transformed how we sell our products in Freetown. We printed the QR tags and customers scan and pay with mobile money instantly.",
      author: "Fatmata S.",
      title: "Boutique Owner, Freetown",
      subquote: "No bulky POS, just scan & pay.",
      image: fatmataImage
    },
    {
      text: "Integrating the Flot Checkout widget took us less than 15 minutes. Our conversion rates increased by 34% in the first week.",
      author: "Mohamed B.",
      title: "E-commerce Developer",
      subquote: "Brilliant checkout API, fast setup.",
      image: mohamedImage
    }
  ];

  let current = 0;

  function cycleTestimonial() {
    current = (current + 1) % testimonials.length;
  }
</script>

<section class="testimonial-section section-container">
  <div class="testimonial-grid">
    <!-- Left Column: Testimonial Sublabel & Quote Headings -->
    <div class="testimonial-left">
      <div class="testimonial-sublabel">Testimonials</div>
      
      <!-- Big Quote Heading -->
      <h2 class="testimonial-heading">What they say</h2>
 
      <!-- Large Quotation Icon decoration -->
      <div class="quote-icon">“</div>
 
      <!-- Testimonial Quote Text Container -->
      <div class="quote-text-container">
        {#key current}
          <p class="quote-paragraph" in:fade={{ duration: 300 }}>
            {testimonials[current].text}
          </p>
        {/key}
      </div>
    </div>
 
    <!-- Right Column: Profile Info & Cycle Controller -->
    <div class="testimonial-right">
      <!-- Cycle Button at the top right -->
      <div class="cycle-btn-row">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="next-slide-btn" on:click={cycleTestimonial}>
          <span>Next</span>
          <svg class="arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
 
      <!-- User Profile Card -->
      <div class="user-profile-panel">
        {#key current}
          <div class="profile-inner" in:fade={{ duration: 300 }}>
            <img class="profile-photo" src={testimonials[current].image} alt={testimonials[current].author} />
            <div class="profile-meta">
              <h3 class="author-name">{testimonials[current].author}</h3>
              <span class="author-title">{testimonials[current].title}</span>
            </div>
            <p class="profile-subquote">
              “{testimonials[current].subquote}”
            </p>
          </div>
        {/key}
      </div>
    </div>
  </div>
</section>

<style>
  .testimonial-section {
    border-bottom: 1px solid var(--color-border-light);
    overflow: visible;
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .testimonial-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .testimonial-sublabel {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-sec);
    text-transform: capitalize;
    margin-bottom: 12px;
  }

  .testimonial-heading {
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 140px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text-main);
    margin-top: 24px;
    height: 90px;
    display: flex;
    align-items: flex-end;
  }

  .quote-text-container {
    margin-top: 40px;
    min-height: 160px; /* Prevent layout shift when swapping text */
  }

  .quote-paragraph {
    font-family: var(--font-heading);
    font-size: 34px;
    line-height: 1.3;
    font-weight: 500;
    color: var(--color-text-main);
    letter-spacing: -0.02em;
  }

  /* Right column profile card */
  .testimonial-right {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-top: 14px;
  }

  .cycle-btn-row {
    display: flex;
    justify-content: flex-end;
  }

  .next-slide-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-main);
    border-bottom: 1.5px solid var(--color-text-main);
    padding-bottom: 2px;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .next-slide-btn:hover {
    color: var(--color-text-sec);
    border-color: var(--color-text-sec);
  }

  .next-slide-btn:hover .arrow {
    transform: translate(2px, -2px);
  }

  .next-slide-btn .arrow {
    transition: transform 0.3s ease;
  }

  .user-profile-panel {
    min-height: 260px;
  }

  .profile-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-photo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .profile-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 16px;
  }

  .author-name {
    font-size: 20px;
    font-weight: 600;
  }

  .author-title {
    font-size: 12px;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  .profile-subquote {
    font-size: 13px;
    color: var(--color-text-sec);
    font-style: italic;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .testimonial-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .quote-paragraph {
      font-size: 24px;
    }
    
    .testimonial-right {
      order: -1;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-top: 0;
    }
    
    .user-profile-panel {
      min-height: auto;
    }
  }
</style>
