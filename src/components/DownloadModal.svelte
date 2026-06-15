<script>
  import { fade, scale } from "svelte/transition";

  export let onClose = () => {};
</script>

<!-- Backdrop -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={onClose}>
  <!-- Modal Window -->
  <div class="modal-window glass-card-dark" transition:scale={{ duration: 300, start: 0.95 }} on:click|stopPropagation>
    <!-- Close Button -->
    <button class="close-btn" on:click={onClose} aria-label="Close modal">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Header -->
    <div class="modal-header">
      <h2 class="modal-title">Get the Flot App</h2>
      <p class="modal-subtitle">Scan the QR code with your phone or choose a download option below.</p>
    </div>

    <!-- Content Grid -->
    <div class="modal-content-grid">
      <!-- QR Code Container -->
      <div class="qr-col">
        <div class="qr-card">
          <svg viewBox="0 0 100 100" class="modal-qr-svg">
            <rect width="100" height="100" fill="#fff" rx="12" />
            
            <!-- QR Code Corners -->
            <rect x="12" y="12" width="22" height="22" fill="#111" rx="2" />
            <rect x="16" y="16" width="14" height="14" fill="#fff" rx="1" />
            <rect x="19" y="19" width="8" height="8" fill="#111" rx="1" />
            
            <rect x="66" y="12" width="22" height="22" fill="#111" rx="2" />
            <rect x="70" y="16" width="14" height="14" fill="#fff" rx="1" />
            <rect x="73" y="19" width="8" height="8" fill="#111" rx="1" />
            
            <rect x="12" y="66" width="22" height="22" fill="#111" rx="2" />
            <rect x="16" y="70" width="14" height="14" fill="#fff" rx="1" />
            <rect x="19" y="73" width="8" height="8" fill="#111" rx="1" />

            <!-- Mock QR Data Pattern -->
            <rect x="42" y="16" width="8" height="8" fill="#111" rx="1" />
            <rect x="42" y="32" width="14" height="6" fill="#111" rx="1" />
            <rect x="16" y="42" width="16" height="8" fill="#111" rx="1" />
            <rect x="66" y="42" width="8" height="18" fill="#111" rx="1" />
            <rect x="42" y="66" width="14" height="14" fill="#111" rx="1" />
            <rect x="74" y="74" width="14" height="14" fill="#85FDC6" rx="2" />
            <rect x="52" y="48" width="10" height="10" fill="#111" rx="1" />
            <rect x="34" y="52" width="8" height="10" fill="#111" rx="1" />
          </svg>
          <span class="qr-label">Scan to Download</span>
        </div>
      </div>

      <!-- Platform Links -->
      <div class="links-col">
        <!-- App Store Link -->
        <a href="https://download.flotme.ai/ios" target="_blank" rel="noopener noreferrer" class="download-button apple-btn">
          <svg class="btn-logo" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.02 2.96 1.1.09 2.23-.58 2.95-1.39z"/>
          </svg>
          <div class="btn-text-wrapper">
            <span class="btn-small-text">Download on the</span>
            <span class="btn-large-text">App Store</span>
          </div>
        </a>

        <!-- Google Play Link -->
        <a href="https://download.flotme.ai/android" target="_blank" rel="noopener noreferrer" class="download-button play-btn">
          <svg class="btn-logo" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M3 22.25V1.75c0-.4.32-.75.72-.75.14 0 .27.04.39.12l16.14 9.4c.33.2.43.63.24.96-.06.1-.14.18-.24.24L4.11 23.13c-.33.19-.76.09-.95-.24-.08-.12-.12-.25-.12-.39zM18.3 12L4.5 3.9v16.2L18.3 12z"/>
          </svg>
          <div class="btn-text-wrapper">
            <span class="btn-small-text">Get it on</span>
            <span class="btn-large-text">Google Play</span>
          </div>
        </a>

        <!-- Direct APK Download Link -->
        <a href="https://download.flotme.ai/apk" target="_blank" rel="noopener noreferrer" class="download-button apk-btn">
          <svg class="btn-logo" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <div class="btn-text-wrapper">
            <span class="btn-small-text">Direct Download</span>
            <span class="btn-large-text">Android APK</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
  }

  .modal-window {
    width: 100%;
    max-width: 600px;
    padding: var(--space-2xl);
    position: relative;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
    background: rgba(17, 17, 17, 0.95);
    border-radius: 32px;
  }

  .close-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .close-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
    transform: scale(1.05);
  }

  .modal-header {
    margin-bottom: var(--space-xl);
    text-align: center;
  }

  .modal-title {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .modal-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.5;
  }

  .modal-content-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: var(--space-2xl);
    align-items: center;
  }

  .qr-col {
    display: flex;
    justify-content: center;
  }

  .qr-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 24px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .modal-qr-svg {
    width: 160px;
    height: 160px;
    display: block;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }

  .qr-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-accent);
  }

  .links-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .download-button {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #ffffff;
    transition: var(--transition-smooth);
  }

  .download-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .download-button.apple-btn:hover {
    background: #ffffff;
    color: #111111;
    border-color: #ffffff;
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
  }

  .download-button.play-btn:hover {
    background: var(--color-accent);
    color: #111111;
    border-color: var(--color-accent);
    box-shadow: 0 8px 20px rgba(133, 253, 198, 0.2);
  }

  .btn-logo {
    flex-shrink: 0;
  }

  .btn-text-wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .btn-small-text {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
  }

  .btn-large-text {
    font-size: 14px;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .modal-window {
      padding: var(--space-xl);
    }
    
    .modal-content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }
    
    .qr-col {
      display: none; /* Hide QR code on mobile devices */
    }
    
    .modal-title {
      font-size: 24px;
    }
  }
</style>
