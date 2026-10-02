# FreelanceOS — Neo-Brutalist Design Specification & PRD
> **Master Design Document for Google Stitch**

---

## 1. Visual Identity & Design System (Neo-Brutalism)

### Core Aesthetic Principles
* **Heavy Outlines:** Consistent `2px` or `3px` solid black borders (`#000000`) on all containers, cards, inputs, and interactive components.
* **Hard Offset Shadows:** No blurry gaussian shadows or ambient glows. Use pure, hard offset shadows: `4px 4px 0px #000000` (or `6px 6px 0px #000000` for primary CTA cards).
* **Tactile Feedback:** Buttons depress when clicked (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).
* **Corner Radius:** Chunky `rounded-xl` (12px to 16px) or `rounded-2xl` on cards and buttons, always wrapped in a crisp black border.
* **Typography:** Bold, chunky, geometric sans-serif headings (weight 800/900). Monospace font for numerical amounts, invoice IDs, and dates.

### Color Palette (Neo-Brutalist High Contrast)
* **Canvas Background:** `#FDFBF7` (Warm Off-White / Cream Paper)
* **Pure Black (Ink/Borders):** `#000000` / `#121212`
* **Card Surface:** `#FFFFFF` (Pure White) with black borders
* **Primary Accent (Electric Yellow):** `#FFE600` (Used for key highlights, totals, primary CTA)
* **Success / Paid (Mint Pastel):** `#A8F0D0` (Used for revenue cards, paid badges, profit metrics)
* **Pending / Alert (Warm Tangerine/Peach):** `#FFB347` or `#FFD166`
* **Projects / Accent (Lavender Pop):** `#C4B5FD` (Used for project widgets and secondary highlights)
* **Danger / Urgent (Retro Coral):** `#FF708A` (Used for deletions, overdue items, discount deductions)

---

## 2. Reusable Component Kit

### Buttons
* **Primary Button:** `#FFE600` background, 2px solid black border, `4px 4px 0px #000000` hard shadow, bold black uppercase text, rounded-xl.
* **Secondary Button:** `#FFFFFF` background, 2px black border, `4px 4px 0px #000000` shadow.
* **Danger Button:** `#FF708A` background, 2px black border, `4px 4px 0px #000000` shadow.

### Cards
* White or pastel background, `2px` or `3px` solid black border, `4px 4px 0px #000000` hard drop shadow, padding `24px`. Optional top color header strip.

### Inputs & Dropdowns
* White background, `2px` solid black border, `rounded-lg`, inset padding, crisp black placeholder text. Focus state has `#FFE600` background accent or 2px outline offset.

### Badges & Status Pills
* Pill-shaped (`rounded-full`), `2px` solid black border, bold monospace text:
  * `PAID`: Mint Green `#A8F0D0`
  * `PENDING`: Electric Yellow `#FFE600`
  * `OVERDUE`: Retro Coral `#FF708A`
  * `DRAFT`: Slate Gray `#E2E8F0`

---

## 3. Screen Specifications

### Screen 1: Dashboard Overview (`/dashboard`)
* **Header Bar:**
  * App logo badge: "FL" inside a yellow rounded box with black border.
  * Platform title: "FreelanceOS".
  * User profile pill with avatar and greeting: "Hey, Alex!".
  * Quick-action buttons: `+ Issue New Invoice` (Electric Yellow CTA) and `+ Add Client`.
* **Top Metric Cards (4 Grid Columns):**
  1. **Total Revenue Collected:** Mint Green background, metric: `124,500,000 Toman`, label: "34 Paid Invoices", trending up badge.
  2. **Pending Clearance:** Electric Yellow background, metric: `38,200,000 Toman`, label: "5 Invoices Awaiting Payment".
  3. **Active Projects:** Lavender background, metric: "7 In-Progress", label: "2 Deadlines this week".
  4. **Total Client Roster:** Retro Coral background, metric: "18 Clients", label: "3 New this month".
* **Main Section (2 Columns, 8/4 Split):**
  * **Left (8 Cols): Recent Invoices Table:**
    * Table headers: `INVOICE ID`, `CLIENT`, `DUE DATE`, `AMOUNT`, `STATUS`, `ACTIONS`.
    * Rows with black divider lines, monospace IDs (e.g. `INV-2026-08`), client name + company subtitle, colorful status pills with black borders, and quick action icons (Eye, Mark Paid).
  * **Right (4 Cols): Active Projects Progress:**
    * List of current client projects with budget tags, chunky striped progress bars, and countdown tags ("5 days left").

---

### Screen 2: Interactive Invoice Creator (`/invoices/new`)
* **Layout:** Split Two-Column Builder.
* **Left Column (Invoice Form & Line Items):**
  * **Client & Details Card:**
    * Client selector dropdown with `+ New Client` inline trigger.
    * Linked project selector.
    * Invoice serial number field (auto-generated e.g. `INV-1405-99`).
    * Issue date and Due date pickers.
  * **Dynamic Line Items Card:**
    * Table of billable items: `Description`, `Hours/Qty`, `Unit Rate`, `Line Total`.
    * Retro trash can icon to delete rows.
    * Chunky `+ Add Service Line` button with black border.
  * **Notes & Bank Instructions:**
    * Textarea for payment terms, IBAN / Bank card details, and thank-you note.
* **Right Column (Live Cash Register Summary Widget):**
  * Sticky receipt-style card with a serrated/retro top border.
  * Live Subtotal calculation.
  * Interactive Discount input (`%`) with instant live deduction display.
  * 10% VAT Tax stepper toggle with instant addition display.
  * Prominent, high-contrast **FINAL TOTAL DUE** box highlighted in solid Electric Yellow (`#FFE600`) with heavy 3px black border and large bold monospace price.
  * Large tactile button: `💾 Save & Generate Official Invoice` with 4px hard black shadow.

---

### Screen 3: Invoices Directory & Filter Table (`/invoices`)
* **Header Controls:**
  * Page title: "Invoices & Billing Directory".
  * Segmented filter pills with 2px black borders: `All`, `Pending`, `Paid`, `Draft`. Active pill has black background with white text or bright yellow fill.
  * Live search input with retro magnifying glass icon.
* **Data Table:**
  * Full-width neo-brutalist table with black border frame.
  * Columns: Checkbox, `Invoice #`, `Client Name`, `Project`, `Issue Date`, `Due Date`, `Amount`, `Status`, `Actions`.
  * Actions column: Quick eye icon (View sheet), checkmark icon (Mark paid), and trash icon.
* **Bottom Bar:**
  * Summary tally: "Showing 10 of 42 invoices | Total Outstanding: $4,200".
  * Retro pagination buttons (`Previous`, `1`, `2`, `3`, `Next`) with 2px borders.

---

### Screen 4: Printable Official A4 Invoice Sheet (`/invoices/:id`)
* **Top Screen Bar (Non-printing):**
  * Back button: `← Back to Invoices`.
  * Status indicator badge.
  * Primary Action: `🖨️ Print / Download PDF` button in Electric Yellow.
* **Printable Sheet Area (Standard A4 Paper Ratio):**
  * Clean white paper card with crisp 2px black border (printable clean).
  * **Header:** Freelancer / Studio Logo, Business Name, Tax ID, Contact info (Email, Phone) on left; Invoice Number, Issue Date, Due Date in monospace badge on right.
  * **Client Details Grid:** Two cards: "Billed To (Client)" vs "Issued By (Freelancer)".
  * **Itemized Services Table:** Clean black bordered grid listing service description, hours/quantity, unit price, and subtotal.
  * **Financial Breakdown:** Subtotal, Discount applied, Tax amount, and Grand Total Due.
  * **Payment Box:** Bank Name, Card Number, Sheba / IBAN Number, Account Holder Name.
  * **Signature & Seal:** Space for authorized signature and digital seal.

---

### Screen 5: Clients & Projects Modals
* **Add New Client Modal:**
  * Pop-up dialog with 3px solid black border, 6px hard shadow, and pastel header bar.
  * Form fields: Full Name, Company / Organization, Phone Number, Email, Billing Address.
  * Action buttons: `Cancel` and `Save Client`.
* **Add New Project Modal:**
  * Form fields: Project Title, Client Dropdown, Total Agreed Budget, Estimated Deadline, Status selector.
  * Action buttons: `Cancel` and `Create Project`.
