<script>
  import { fade } from "svelte/transition";
  import Card from "./Card.svelte";

  let activeStep = 1; // Default to Step 2 (Integrate Checkout)

  const steps = [
    {
      num: "01",
      title: "Create Account",
      desc: "Register at pay.flotme.ai in minutes. Fill in your business name, mobile money number or bank details, and start onboarding instantly.",
      icon: "user"
    },
    {
      num: "02",
      title: "Integrate Checkout",
      desc: "Drop in our interactive Svelte/JS Checkout widget or connect directly via our API library. Works with any stack.",
      icon: "code"
    },
    {
      num: "03",
      title: "Choose Channels",
      desc: "Activate cards, mobile money networks, or print physical QR codes and wearable QR tags to accept payments offline.",
      icon: "link"
    },
    {
      num: "04",
      title: "Settle Instantly",
      desc: "Receive settlement payouts instantly into your local Sierra Leone bank account or mobile money wallet. No delays.",
      icon: "bolt"
    }
  ];

  function setActive(index) {
    activeStep = index;
  }
</script>

<section id="developers" class="services-section section-container">
  <div class="services-sublabel">Integration</div>
  
  <div class="services-main-grid">
    <!-- Left Column: Step Accordion List -->
    <div class="services-left">
      <h2 class="services-heading">
        Go Live in Minutes
      </h2>

      <div class="steps-accordion-list">
        {#each steps as step, idx}
          <!-- svelte-ignore a11y-mouse-events-have-key-events -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div 
            class="step-accordion-item" 
            class:active={activeStep === idx}
            on:click={() => setActive(idx)}
            on:mouseover={() => setActive(idx)}
          >
            <div class="step-num">{step.num}</div>
            <div class="step-title">{step.title}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right Column: Interactive Details Panel -->
    <div class="services-right">
      <div class="details-preview-card glass-card-light">
        {#key activeStep}
          <div class="preview-inner" in:fade={{ duration: 300 }}>
            <!-- Step Specific Graphic -->
            <div class="preview-graphic">
              {#if activeStep === 0}
                <!-- Create Account Graphic -->
                <div class="account-mockup-container">
                  <div class="form-mockup">
                    <div class="field">
                      <span class="label">Merchant Name</span>
                      <div class="input-val">Fatmata S.</div>
                    </div>
                    <div class="field">
                      <span class="label">Settlement Account</span>
                      <div class="input-val">Orange Money Freetown</div>
                    </div>
                    <div class="field checked">
                      <span class="label">Onboarding Status</span>
                      <div class="badge-checked">✓ Active Merchant</div>
                    </div>
                  </div>
                </div>
              {:else if activeStep === 1}
                <!-- Integrate Checkout: Premium IDE Code Block -->
                <div class="code-preview-container">
                  <pre class="code-block"><code><span class="keyword">import</span> FlotCheckout <span class="keyword">from</span> <span class="string">'@flot/checkout'</span>;

<span class="keyword">const</span> checkout = <span class="keyword">new</span> <span class="function">FlotCheckout</span>(&#123;
  key: <span class="string">'pk_live_xxx'</span>,
  amount: <span class="number">5000</span>,
  currency: <span class="string">'SLE'</span>,
  methods: [<span class="string">'card'</span>, <span class="string">'mobile_money'</span>, <span class="string">'flot'</span>]
&#125;);

checkout.<span class="function">open</span>();</code></pre>
                </div>
              {:else if activeStep === 2}
                <!-- Choose Channels: QR stands, pay links, etc. -->
                <div class="channels-graphic">
                  <div class="channel-card qr-code-card">
                    <span class="channel-title">Scan QR Code</span>
                    <svg viewBox="0 0 100 100" width="80" height="80" class="qr-svg">
                      <rect width="100" height="100" fill="#fff" rx="8" />
                      <rect x="10" y="10" width="22" height="22" fill="#1A1A1A" />
                      <rect x="14" y="14" width="14" height="14" fill="#fff" />
                      <rect x="17" y="17" width="8" height="8" fill="#1A1A1A" />
                      
                      <rect x="68" y="10" width="22" height="22" fill="#1A1A1A" />
                      <rect x="72" y="14" width="14" height="14" fill="#fff" />
                      <rect x="75" y="17" width="8" height="8" fill="#1A1A1A" />
                      
                      <rect x="10" y="68" width="22" height="22" fill="#1A1A1A" />
                      <rect x="14" y="72" width="14" height="14" fill="#fff" />
                      <rect x="17" y="75" width="8" height="8" fill="#1A1A1A" />
                      
                      <rect x="42" y="14" width="8" height="8" fill="#1A1A1A" />
                      <rect x="42" y="32" width="14" height="6" fill="#1A1A1A" />
                      <rect x="14" y="42" width="16" height="8" fill="#1A1A1A" />
                      <rect x="68" y="42" width="8" height="18" fill="#1A1A1A" />
                      <rect x="42" y="68" width="14" height="14" fill="#1A1A1A" />
                      <rect x="78" y="78" width="12" height="12" fill="#85FDC6" />
                    </svg>
                    <span class="channel-sub">Boutique Checkout QR</span>
                  </div>
                </div>
              {:else if activeStep === 3}
                <!-- Settle Instantly -->
                <div class="settle-graphic-container">
                  <div class="payout-card">
                    <span class="label">Settled Amount</span>
                    <span class="amount">SLE 145,200</span>
                    <div class="settlement-target">
                      <span class="target-network">Orange Money payout</span>
                      <span class="target-status">✓ Completed</span>
                    </div>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Description Text -->
            <p class="preview-description">
              {steps[activeStep].desc}
            </p>

            <!-- Bottom Floating Icon -->
            <div class="preview-bottom-action">
              <div class="black-icon-circle">
                <span class="step-icon">
                  {#if steps[activeStep].icon === 'user'}
                    <svg class="icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#85FDC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  {:else}
                    {#if steps[activeStep].icon === 'code'}
                      <svg class="icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#85FDC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    {:else}
                      {#if steps[activeStep].icon === 'link'}
                        <svg class="icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#85FDC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      {:else}
                        {#if steps[activeStep].icon === 'bolt'}
                          <svg class="icon-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#85FDC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        {/if}
                      {/if}
                    {/if}
                  {/if}
                </span>
              </div>
            </div>
          </div>
        {/key}
      </div>
    </div>
  </div>
</section>

<style>
  .services-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-bottom: 1px solid var(--color-border-light);
  }

  .services-sublabel {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-sec);
    text-transform: capitalize;
  }

  .services-main-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .services-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .services-heading {
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
  }

  .steps-accordion-list {
    display: flex;
    flex-direction: column;
  }

  /* Accordion Switcher Items */
  .step-accordion-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px 0;
    border-top: 1px solid var(--color-border-light);
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .step-accordion-item:last-child {
    border-bottom: 1px solid var(--color-border-light);
  }

  .step-num {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-muted);
    transition: var(--transition-smooth);
  }

  .step-title {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 500;
    color: var(--color-text-muted);
    transition: var(--transition-smooth);
  }

  /* Active states */
  .step-accordion-item.active {
    padding-left: 8px;
  }

  .step-accordion-item.active .step-num {
    color: var(--color-text-main);
  }

  .step-accordion-item.active .step-title {
    color: var(--color-text-main);
    font-weight: 600;
  }

  /* Right column preview box */
  .services-right {
    display: flex;
    justify-content: center;
  }

  .details-preview-card {
    width: 440px;
    height: 480px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 28px;
    overflow: hidden;
  }

  .preview-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .preview-graphic {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 24px;
    height: 240px;
  }

  .preview-description {
    font-size: 13px;
    color: var(--color-text-sec);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .preview-bottom-action {
    display: flex;
    justify-content: flex-end;
  }

  .black-icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-svg {
    display: block;
  }

  /* Graphics style mockups */
  
  /* Step 01: Create Account */
  .account-mockup-container {
    width: 260px;
  }
  .form-mockup {
    background: #fff;
    border: 1px solid var(--color-border-light);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.03);
  }
  .form-mockup .field { display: flex; flex-direction: column; gap: 4px; }
  .form-mockup .label { font-size: 8px; color: var(--color-text-muted); text-transform: uppercase; }
  .form-mockup .input-val { font-size: 11px; font-weight: 500; padding: 6px 10px; background: #f5f6f8; border-radius: 6px; }
  .form-mockup .field.checked { flex-direction: row; justify-content: space-between; align-items: center; border-top: 1px dashed var(--color-border-light); padding-top: 10px; }
  .form-mockup .badge-checked { font-size: 10px; font-weight: 600; color: #28a745; background: rgba(40,167,69,0.1); padding: 2px 8px; border-radius: 12px; }

  /* Step 02: Code Preview */
  .code-preview-container {
    width: 100%;
    background: #111215;
    border-radius: 16px;
    padding: 20px;
    font-family: monospace;
    font-size: 11.5px;
    line-height: 1.6;
    color: #e0e0e6;
    text-align: left;
    box-shadow: 0 8px 24px rgba(0,0,0,0.05);
    border: 1px solid rgba(255,255,255,0.05);
    overflow-x: auto;
  }
  .code-block {
    margin: 0;
  }
  .code-block .keyword { color: #f92672; }
  .code-block .string { color: #85FDC6; }
  .code-block .number { color: #ae81ff; }
  .code-block .function { color: #66d9ef; }

  /* Step 03: Choose Channels */
  .channels-graphic {
    display: flex;
    justify-content: center;
  }
  .qr-code-card {
    background: #fff;
    border: 1px solid var(--color-border-light);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.03);
    width: 160px;
  }
  .qr-svg {
    border: 1px solid var(--color-border-light);
    border-radius: 8px;
    padding: 6px;
  }
  .channel-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
  }
  .channel-sub {
    font-size: 8px;
    color: var(--color-text-muted);
  }

  /* Step 04: Settle Instantly */
  .settle-graphic-container {
    width: 240px;
  }
  .payout-card {
    background: #fff;
    border: 1px solid var(--color-border-light);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.03);
  }
  .payout-card .label { font-size: 8px; color: var(--color-text-muted); text-transform: uppercase; }
  .payout-card .amount { font-family: var(--font-heading); font-size: 24px; font-weight: 700; color: var(--color-text-main); }
  .settlement-target { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-light); padding-top: 10px; margin-top: 4px; }
  .target-network { font-size: 9px; color: var(--color-text-sec); }
  .target-status { font-size: 9px; font-weight: 600; color: #28a745; background: rgba(40,167,69,0.1); padding: 2px 8px; border-radius: 10px; }

  @media (max-width: 900px) {
    .services-main-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .services-right {
      order: -1; /* Display graphic preview first on smaller screens */
    }
  }

  @media (max-width: 480px) {
    .services-heading {
      font-size: 36px;
    }
    .details-preview-card {
      width: 100%;
      height: auto;
      padding: 24px;
    }
    .preview-graphic {
      height: 180px;
    }
  }
</style>
