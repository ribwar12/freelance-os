---
name: FreelanceOS Neo-Brutalist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4b4731'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7c775f'
  outline-variant: '#cdc7aa'
  surface-tint: '#6a5f00'
  primary: '#6a5f00'
  on-primary: '#ffffff'
  primary-container: '#ffe600'
  on-primary-container: '#726600'
  inverse-primary: '#dec800'
  secondary: '#216a51'
  on-secondary: '#ffffff'
  secondary-container: '#a7efcf'
  on-secondary-container: '#266e55'
  tertiary: '#625595'
  on-tertiary: '#ffffff'
  tertiary-container: '#e9e0ff'
  on-tertiary-container: '#695c9d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fde400'
  primary-fixed-dim: '#dec800'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#a9f1d1'
  secondary-fixed-dim: '#8ed5b6'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#e7deff'
  tertiary-fixed-dim: '#ccbeff'
  on-tertiary-fixed: '#1e0e4e'
  on-tertiary-fixed-variant: '#4a3d7c'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  canvas-cream: '#FDFBF7'
  surface-white: '#FFFFFF'
  border-black: '#000000'
  success-mint: '#A8F0D0'
  warning-tangerine: '#FFB347'
  warning-yellow: '#FFD166'
  accent-lavender: '#C4B5FD'
  danger-coral: '#FF708A'
  neutral-slate: '#E2E8F0'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '900'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-uppercase:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system embraces an uncompromising, playful, yet precision-engineered Neo-Brutalist aesthetic tailored for high-agency independent operators, creators, and freelance professionals. The emotional goal is immediate tactile empowerment—transforming administrative chores like invoicing, budgeting, and client roster management into an energetic, punchy, physical experience reminiscent of tactile retro cash registers, physical stamped receipts, and playful industrial tools.

### Design Movement & Core Archetype
- **Movement:** Pure Neo-Brutalism paired with functional productivity utility.
- **Visual Weight:** Chunky structural containers bounded by crisp 2px to 3px solid pitch-black ink outlines (`#000000`).
- **Tactility:** Zero soft ambient or diffused gaussian blurs. Visual weight is anchored entirely by directional, razor-sharp hard drop shadows (`4px 4px 0px #000000` and `6px 6px 0px #000000`). Buttons visually "depress" straight into the canvas when pressed (`translate(2px, 2px)` with reduced shadow).
- **Tone:** Loud, audacious, hyper-legible, organized, and confident.

## Colors

The color palette pairs a warm, unbleached cream paper base with striking hyper-saturated pastel and electric accents, bound firmly together by stark jet-black borders.

### Palette Architecture
- **Canvas Base (`#FDFBF7`):** Warm Off-White / Cream Paper. Acts as the underlying desk/mat surface for the interface.
- **Card Surfaces (`#FFFFFF`):** High-contrast pure white panels sitting directly on the cream paper ground, framed by ink-black borders.
- **Primary Accent (`#FFE600`):** Electric Yellow. Applied to top-level actions, primary call-to-actions, highlighted invoice sums, and active navigation nodes.
- **Secondary / Paid (`#A8F0D0`):** Mint Pastel. Signals positive cash flow, paid invoices, collected revenue, and healthy metrics.
- **Tertiary / Projects (`#C4B5FD`):** Lavender Pop. Serves project timeline trackers, workspace tags, and secondary decorative blocks.
- **Warning & Pending (`#FFB347` / `#FFD166`):** Warm Tangerine and Soft Gold for pending approvals, invoices awaiting clearance, and nearing deadlines.
- **Danger / Urgent (`#FF708A`):** Retro Coral. Reserved for overdue invoices, destructive actions, and active discount subtractions.
- **Structural Black (`#000000`):** The structural backbone for all boundaries, hard shadows, dividers, and typography.

## Typography

The typographic hierarchy intentionally clashes bold geometric display forms with clinical, machine-like tabular figures:

1. **Headings (`Space Grotesk`):** Cut with heavy weights (800 and 900) to convey strong authority and mechanical presence. Headings use tight negative letter-spacing for immediate impact.
2. **Body (`Plus Jakarta Sans`):** Clean, neutral, high-legibility sans-serif with medium weight (500) to maintain crisp readability within thick black table cells and dense modal forms.
3. **Accents, Badges & Ledgers (`JetBrains Mono`):** Applied to monetary sums, invoice reference serials, IBAN numbers, tax calculations, and status badges. Guarantees tabular lining alignment for mathematical figures.

## Layout & Spacing

The layout is built upon a high-structure fluid 12-column grid system resting inside an outer canvas wrapper constrained to a maximum width of 1440px.

### Form Factors & Breakpoints
- **Desktop (1024px+):** 12-column grid, `gutter: 1.5rem` (24px), outer canvas `margin: 2rem` (32px). Splits cleanly into typical 8/4 splits (e.g., invoice list alongside project summary widget, or invoice line items alongside live receipt preview).
- **Tablet (768px – 1023px):** 6-column grid with elements reflowing into 3-column dual panels or full-width blocks.
- **Mobile (< 768px):** Single-column stacked flow. Outer gutters step down to `gutter-mobile: 1rem` (16px), margins reduce to `margin-mobile: 1rem` (16px), and interactive touch points maintain a minimum 48px height.

### Layout Rhythms
- **Component Padding:** Standard cards use internal padding of `space-lg` (24px). Compact metric cards and status bars utilize `space-md` (16px).
- **Section Spacing:** Major content blocks and table frames are spaced apart by `space-xl` (32px).

## Elevation & Depth

Visual hierarchy and depth reject ambient gradients, transparent glassmorphism, or blurry dropshadows in favor of hard-edged, physical offset stamping.

### Shadow Presets
- **Card / Standard Element Elevation:** 
  `box-shadow: 4px 4px 0px #000000;`
  Used on default cards, status tiles, and table containers.
- **High-Priority / Hero Elevation:**
  `box-shadow: 6px 6px 0px #000000;`
  Used for sticky floating receipts, modals, and primary action toolbars.
- **Active / Depressed State:**
  `transform: translate(2px, 2px); box-shadow: 2px 2px 0px #000000;`
  Or for a complete click actuation:
  `transform: translate(4px, 4px); box-shadow: 0px 0px 0px #000000;`
- **Border Foundation:**
  All elevated elements must feature a perimeter outline of `2px solid #000000` (or `3px solid #000000` for primary cards and modal dialogs) to ensure the shadow visually detaches from the component body.

## Shapes

The design uses a rounded geometry balanced with hard borders. Surfaces avoid sharp, brutalist 90-degree points in favor of friendly, chunky contours:

- **Buttons & Interactive Controls:** Standardized to `12px` to `16px` radius (`rounded-xl`), creating a punchy toy-like stamp appearance.
- **Panels & Containers:** Standardized to `16px` (`rounded-xl`) and `24px` (`rounded-2xl`) for larger canvas cards and pop-up modals.
- **Badges & Pills:** `9999px` (`rounded-full`) for status indicators (Paid, Pending, Overdue, Draft) wrapped in crisp `2px` black lines.
- **Form Inputs:** `8px` to `12px` radius (`rounded-lg` / `rounded-xl`).

## Components

### Buttons
- **Primary CTA:** Background `#FFE600`, text `#000000` (Space Grotesk, bold uppercase), 2px solid `#000000` border, `4px 4px 0px #000000` hard shadow, rounded-xl. Hover adds `translate(-1px, -1px)` with `5px 5px 0px #000000` shadow. Active state depresses to `translate(2px, 2px)` with `2px 2px 0px #000000`.
- **Secondary Button:** Background `#FFFFFF`, text `#000000`, 2px solid `#000000` border, `4px 4px 0px #000000` shadow.
- **Destructive Button:** Background `#FF708A`, text `#000000`, 2px solid `#000000` border, `4px 4px 0px #000000` shadow.

### Cards & Metric Tiles
- Surface `#FFFFFF` (or designated pastel: `#A8F0D0` for Revenue, `#FFB347` for Pending, `#C4B5FD` for Projects), 2px or 3px solid black border, `4px 4px 0px #000000` drop shadow.
- Optional header accent stripe: 8px solid colored band at the top perimeter separated by a 2px horizontal black dividing line.

### Inputs & Selectors
- Background `#FFFFFF`, 2px solid `#000000` border, rounded-lg, 12px 16px internal padding.
- Text uses body-md in solid black; placeholder uses 50% muted black.
- **Focus State:** Background remains white or turns slightly cream (`#FDFBF7`), accompanied by an offset highlight ring or a `2px 2px 0px #000000` active input shadow.

### Status Pills & Chips
- Fully rounded pills (`rounded-full`), 2px solid `#000000` border, padding 4px 12px.
- Typographic style: `data-sm` (JetBrains Mono bold, all caps).
  - **PAID:** `#A8F0D0` (Mint Pastel)
  - **PENDING:** `#FFE600` (Electric Yellow) or `#FFD166`
  - **OVERDUE / URGENT:** `#FF708A` (Retro Coral)
  - **DRAFT:** `#E2E8F0` (Slate Gray)

### Tables & Data Grids
- Outer table framed within a 2px solid `#000000` border container with `4px 4px 0px #000000` shadow.
- Table headers set in `label-uppercase` with a solid neutral or pastel background, bordered beneath with a 2px solid black line.
- Rows separated with 2px borders, hovering into a subtle highlight tint (such as 10% `#FFE600` or `#FDFBF7`).
- Monetary totals and reference IDs rendered in `JetBrains Mono`.

### Modals & Dialogs
- Backdrop overlay using a 30% translucent black ink or 45-degree diagonal black micro-hatch pattern.
- Dialog container: `#FFFFFF` surface, 3px solid black border, `6px 6px 0px #000000` hard shadow, rounded-2xl, topped with a vibrant colored modal banner.