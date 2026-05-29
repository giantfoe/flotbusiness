# Design System Specification - Flot Business

This document serves as the visual source of truth for the Flot Business landing page. It ensures visual consistency, precise coloring, and layout guidelines during customization.

---

## 🎨 Color Palette

| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Brand Accent (Mint)** | `#85FDC6` | Buttons, badge backgrounds, active navigation markers, key icons |
| **Off-White (Light Bg)**| `#FAFAFA` | Main page background, light containers |
| **Matte Black (Dark Bg)**| `#111111` | Benefits & integrations dark layout background |
| **Rich Charcoal (Text)**| `#1A1A1A` | Primary headers, bold titles |
| **Slate Grey (Text Sec)** | `#666666` | Standard descriptions, body text |
| **Cool Grey (Text Muted)**| `#999999` | Subtext, timestamps, borders |
| **Pure White**          | `#FFFFFF` | Navbar container, widget cards |
| **Card Borders (Light)** | `rgba(26, 26, 26, 0.06)` | Outline borders for metrics and onboarding steps |
| **Card Borders (Dark)**  | `rgba(255, 255, 255, 0.08)`| Outer border of dark widgets |

---

## 📐 Typography & Spacing

### Typography
- **Headings**: `Outfit`, Sans-Serif (Google Fonts). Set `font-weight: 300` or `500` for thin, premium modern lines.
- **Body & Code**: `Inter`, Sans-Serif. Clean, readable structure.
- **Letter Spacing**: `-0.03em` for headings, normal for body.

### Spacing System
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

---

## ✨ Glassmorphism & Borders

### Glassmorphic Card (Light)
- **Background**: `rgba(255, 255, 255, 0.65)`
- **Border**: `1px solid rgba(255, 255, 255, 0.8)`
- **Blur**: `backdrop-filter: blur(16px);`
- **Shadow**: `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.03), inset 0 1px 2px rgba(255, 255, 255, 0.8);`

### Glassmorphic Card (Dark)
- **Background**: `rgba(26, 26, 26, 0.65)`
- **Border**: `1px solid rgba(255, 255, 255, 0.06)`
- **Blur**: `backdrop-filter: blur(20px);`
- **Shadow**: `box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1);`

---

## ⚡ Animations & Interactions

### 3D Card Hover
- Applies smooth interactive tilt rotation on credit cards:
  - Max rotation: `12deg`
  - Max scale: `1.04`
  - Timing: `cubic-bezier(0.16, 1, 0.3, 1) 0.6s`

### Selection Tints
- Default selection background is aquamarine green at 20% opacity (`rgba(133, 253, 198, 0.2)`), preserving readability of selected text.
