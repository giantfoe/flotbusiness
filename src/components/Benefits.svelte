<script>
  import Card from "./Card.svelte";
  import { fly } from "svelte/transition";

  // Converter States
  let baseCurrency = "SLE";
  let targetCurrency = "USD";
  let baseAmount = 2250;
  
  // Static conversion rate (1 USD = 22.5 SLE)
  const exchangeRate = 22.5; 
  
  $: targetAmount = calculateConversion(baseAmount, baseCurrency);

  function calculateConversion(amount, base) {
    if (isNaN(amount) || amount === null) return "0.00";
    if (base === "SLE") {
      return (amount / exchangeRate).toFixed(2);
    } else {
      return (amount * exchangeRate).toFixed(2);
    }
  }

  function swapCurrencies() {
    const temp = baseCurrency;
    baseCurrency = targetCurrency;
    targetCurrency = temp;
    
    // Convert current target amount back to base amount
    if (baseCurrency === "SLE") {
      baseAmount = parseFloat((baseAmount * exchangeRate).toFixed(2));
    } else {
      baseAmount = parseFloat((baseAmount / exchangeRate).toFixed(2));
    }
  }

  // Benefit Active Tab (for hover states)
  let hoveredTest = 0;
</script>

<section id="pricing" class="benefits-dark-wrapper">
  <div class="benefits-section section-container">
    <div class="benefits-main-grid">
      <!-- Left Column: Benefits text copy -->
      <div class="benefits-left">
        <div class="benefits-sublabel">Payment Methods</div>
        <h2 class="benefits-heading">
          One Integration.<br />Multiple Ways to Get Paid.
        </h2>

        <!-- Feature List -->
        <div class="benefits-features-list">
          <!-- Feature 1 -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="benefit-feature-item" 
            class:focused={hoveredTest === 0}
            on:mouseover={() => hoveredTest = 0}
          >
            <div class="feature-icon-container">
              <!-- Cards icon SVG -->
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div class="feature-details">
              <h3 class="feature-title">Global Cards</h3>
              <p class="feature-desc">
                Accept Visa and Mastercard globally. Fully integrated checkout ready for international card processing.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="benefit-feature-item" 
            class:focused={hoveredTest === 1}
            on:mouseover={() => hoveredTest = 1}
          >
            <div class="feature-icon-container">
              <!-- Mobile Money phone icon SVG -->
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
                <path d="M12 6v8M10 8h3.5a1.5 1.5 0 0 1 0 3H10.5M10.5 11H14a1.5 1.5 0 0 1 0 3H11" />
              </svg>
            </div>
            <div class="feature-details">
              <h3 class="feature-title">Local Mobile Money</h3>
              <p class="feature-desc">
                Support Orange Money, Africell, and Qcell across all local networks with instant settlements.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Exchange Widget -->
      <div class="benefits-right">
        <!-- Floating details stars decoration -->
        <span class="star-decor star-top-left">✳</span>
        <span class="star-decor star-bottom-right">✳</span>

        <div class="exchange-widget-card glass-card-dark">
          <!-- Nested Card display -->
          <div class="exchange-card-visual">
            <Card type="black" cardholder="Fatmata S." expiry="05/29" />
          </div>

          <!-- Calculator inputs -->
          <div class="exchange-calculator">
            <h3 class="exchange-calc-title">Exchange rate calculator</h3>

            <div class="calculator-form-container">
              {#key baseCurrency}
                <!-- Base Currency Input -->
                <div class="calc-input-row" in:fly={{ y: 10, duration: 200 }}>
                  <div class="amount-entry">
                    <span class="label">Amount</span>
                    <input 
                      type="number" 
                      class="amount-input" 
                      bind:value={baseAmount} 
                      placeholder="0.00" 
                    />
                  </div>
                  <div class="currency-select-badge">
                    <span class="flag-icon">
                      {#if baseCurrency === "SLE"}
                        <svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="border-radius: 50%; overflow: hidden; display: inline-block; vertical-align: middle;">
                          <rect width="30" height="10" fill="#12AD2B" />
                          <rect y="10" width="30" height="10" fill="#FFFFFF" />
                          <rect y="20" width="30" height="10" fill="#0072C6" />
                        </svg>
                      {:else}
                        <svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="border-radius: 50%; overflow: hidden; display: inline-block; vertical-align: middle;">
                          <rect width="30" height="30" fill="#FFFFFF" />
                          <rect y="0" width="30" height="2.3" fill="#B22234" />
                          <rect y="4.6" width="30" height="2.3" fill="#B22234" />
                          <rect y="9.2" width="30" height="2.3" fill="#B22234" />
                          <rect y="13.8" width="30" height="2.3" fill="#B22234" />
                          <rect y="18.4" width="30" height="2.3" fill="#B22234" />
                          <rect y="23" width="30" height="2.3" fill="#B22234" />
                          <rect y="27.6" width="30" height="2.3" fill="#B22234" />
                          <rect width="13" height="16.1" fill="#3C3B6E" />
                          <circle cx="3" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="4.7" cy="5.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="8.2" cy="5.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="3" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="4.7" cy="10.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="8.2" cy="10.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="3" cy="13" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="13" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="13" r="0.6" fill="#FFFFFF" />
                        </svg>
                      {/if}
                    </span>
                    <span class="currency-name">{baseCurrency}</span>
                    <span class="dropdown-chevron">▼</span>
                  </div>
                </div>

                <!-- Swap Button Circle -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="swap-action-circle" on:click={swapCurrencies}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M7 9l5-5 5 5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 4v16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17 15l-5 5-5-5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>

                <!-- Target Currency Output -->
                <div class="calc-input-row readonly" in:fly={{ y: -10, duration: 200 }}>
                  <div class="amount-entry">
                    <span class="label">Converted Amount</span>
                    <span class="amount-value">{targetCurrency === 'USD' ? '$' : ''}{targetAmount}</span>
                  </div>
                  <div class="currency-select-badge">
                    <span class="flag-icon">
                      {#if targetCurrency === "SLE"}
                        <svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="border-radius: 50%; overflow: hidden; display: inline-block; vertical-align: middle;">
                          <rect width="30" height="10" fill="#12AD2B" />
                          <rect y="10" width="30" height="10" fill="#FFFFFF" />
                          <rect y="20" width="30" height="10" fill="#0072C6" />
                        </svg>
                      {:else}
                        <svg class="flag-svg" viewBox="0 0 30 30" width="16" height="16" style="border-radius: 50%; overflow: hidden; display: inline-block; vertical-align: middle;">
                          <rect width="30" height="30" fill="#FFFFFF" />
                          <rect y="0" width="30" height="2.3" fill="#B22234" />
                          <rect y="4.6" width="30" height="2.3" fill="#B22234" />
                          <rect y="9.2" width="30" height="2.3" fill="#B22234" />
                          <rect y="13.8" width="30" height="2.3" fill="#B22234" />
                          <rect y="18.4" width="30" height="2.3" fill="#B22234" />
                          <rect y="23" width="30" height="2.3" fill="#B22234" />
                          <rect y="27.6" width="30" height="2.3" fill="#B22234" />
                          <rect width="13" height="16.1" fill="#3C3B6E" />
                          <circle cx="3" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="3" r="0.6" fill="#FFFFFF" />
                          <circle cx="4.7" cy="5.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="8.2" cy="5.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="3" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="8" r="0.6" fill="#FFFFFF" />
                          <circle cx="4.7" cy="10.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="8.2" cy="10.5" r="0.6" fill="#FFFFFF" />
                          <circle cx="3" cy="13" r="0.6" fill="#FFFFFF" />
                          <circle cx="6.5" cy="13" r="0.6" fill="#FFFFFF" />
                          <circle cx="10" cy="13" r="0.6" fill="#FFFFFF" />
                        </svg>
                      {/if}
                    </span>
                    <span class="currency-name">{targetCurrency}</span>
                    <span class="dropdown-chevron">▼</span>
                  </div>
                </div>
              {/key}

              <!-- Exchange rate sub-info -->
              <div class="rate-subinfo">
                1 USD = 22.5 SLE (Local Market Rate)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .benefits-dark-wrapper {
    background-color: var(--color-bg-dark);
    width: 100%;
    color: #fff;
  }

  .benefits-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .benefits-main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .benefits-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .benefits-sublabel {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .benefits-heading {
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: #fff;
  }

  .benefits-features-list {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: var(--space-md);
  }

  .benefit-feature-item {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid transparent;
    transition: var(--transition-smooth);
  }

  .benefit-feature-item.focused {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .feature-icon-container {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--color-accent);
    color: var(--color-text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .feature-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .feature-title {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }

  .feature-desc {
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  /* Right column currency exchanger */
  .benefits-right {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .star-decor {
    position: absolute;
    color: var(--color-accent);
    font-size: 24px;
    opacity: 0.8;
  }

  .star-top-left {
    top: 0;
    left: 20px;
  }

  .star-bottom-right {
    bottom: 0;
    right: 20px;
  }

  .exchange-widget-card {
    width: 380px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 28px;
  }

  .exchange-card-visual {
    display: flex;
    justify-content: center;
    transform: scale(0.95);
  }

  .exchange-calculator {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .exchange-calc-title {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }

  .calculator-form-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
  }

  .calc-input-row {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-smooth);
  }

  .calc-input-row:focus-within {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.07);
  }

  .amount-entry {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .amount-entry .label {
    font-size: 9px;
    text-transform: uppercase;
    color: var(--color-text-muted);
    letter-spacing: 0.02em;
  }

  .amount-input {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    width: 130px;
  }

  /* Remove number input spin arrows */
  .amount-input::-webkit-outer-spin-button,
  .amount-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .amount-value {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }

  .currency-select-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    cursor: pointer;
  }

  .currency-select-badge .flag-icon {
    display: flex;
    align-items: center;
  }

  .currency-select-badge .currency-name {
    font-weight: 700;
    font-size: 12px;
  }

  .currency-select-badge .dropdown-chevron {
    font-size: 8px;
    color: var(--color-text-muted);
  }

  /* Swap Button Positioning */
  .swap-action-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--color-accent);
    color: var(--color-text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: var(--transition-smooth);
  }

  .swap-action-circle:hover {
    background-color: var(--color-accent-hover);
    transform: translate(-50%, -50%) rotate(180deg);
  }

  /* Form spacing offset for middle button overlap */
  .calc-input-row:first-child {
    padding-bottom: 22px;
  }

  .calc-input-row.readonly {
    padding-top: 22px;
  }

  .rate-subinfo {
    font-size: 11px;
    color: var(--color-text-muted);
    text-align: center;
    margin-top: 8px;
    font-weight: 500;
  }

  @media (max-width: 900px) {
    .benefits-main-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
  }

  @media (max-width: 480px) {
    .benefits-heading {
      font-size: 36px;
    }
    
    .exchange-widget-card {
      width: 100%;
      padding: 20px;
    }
    
    .exchange-card-visual {
      transform: scale(0.85);
    }
  }
</style>
