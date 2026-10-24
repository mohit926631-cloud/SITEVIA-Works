# SITEVIA WORKS — Frontend Polish, Motion System & Interactive Features

Comprehensive architectural plan to enhance the existing SITEVIA WORKS website with strict Indian WhatsApp phone validation, service inquiry preselection, persistent dark/light mode toggle, a restrained site-wide subtle motion system, a slow-rotating circular brand badge, and an interactive "With / Without Website" comparison flip demo.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The existing application structure, pricing tiers (₹2,999 / ₹5,499 / ₹7,999), 4-step wizard form, WhatsApp numbers (+91 95110 07593), and content remain completely intact. All changes are additive, non-breaking enhancements conforming to the user's explicit design specification.

- **WhatsApp Phone Validation**: Validates 10-digit Indian mobile numbers (`^[6-9]\d{9}$`) while allowing optional `+91` prefix and stripping whitespace/dashes. Validated on Step 1 and re-validated before the final WhatsApp redirect.
- **Inquiry Deep-Linking**: Clicking "Inquire" on any industry/service card passes both `businessType` and `websiteType` to Step 2, while preserving package selection.
- **Dark/Light Mode**: Persisted in `localStorage`, defaulting to `light` mode, with a clean Sun/Moon toggle button in the header.
- **Motion System**: Built with `motion/react` and pure CSS compositor animations with `viewport: { once: true }`. Zero bounce, zoom, or loop (except the continuous badge rotation). Full `prefers-reduced-motion` support.
- **"With / Without Website" Flip Demo**: Placed strategically between the Trust Strip and How It Works sections, featuring a simulated search query typing animation, state toggle, and smooth `layout` reordering.

---

## 1. Overview & Core Concept

### What It Does
Upgrades SITEVIA WORKS from a static agency page into a polished, responsive web presence with strict lead validation, seamless theme switching, restrained entrance animations, and an interactive proof demo illustrating the business impact of having a verified website.

### Target Audience & Persona
Indian small business owners, doctors, salon proprietors, restaurateurs, and independent professionals evaluating website development agencies.

### Key Value
- **Lead Quality**: Blocks invalid phone numbers before submitting inquiries.
- **Immediate Relevancy**: When a salon owner clicks "Inquire" under Salons, the wizard is already customized for a Salon & Beauty Website.
- **Visual Confidence**: Dark/light mode adaptability and subtle motion signal technical capability and craft.
- **Proof of Impact**: The interactive Google Search simulation visually demonstrates how a website boosts search visibility.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[Visitor Browses Site]
       │
       ├──► Toggles Dark / Light Mode in Header (persists across visits)
       │
       ├──► Sees Rotating Brand Badge near Hero CTA ("SITEVIA WORKS • 7-DAY DELIVERY •")
       │
       ├──► Interacts with "With / Without Website" Flip Demo
       │       └── Toggles state: "Your Business" reorders to Rank #1 with WhatsApp & Call actions
       │
       ├──► Clicks "Inquire" on any Industry Card (e.g. Restaurants & Dining)
       │       └── Navigates to Contact Wizard with Pre-selected:
       │             - Business Type: "Restaurant"
       │             - Website Type: "Restaurant & Café Website"
       │
       └──► Enters WhatsApp Number in Step 1
               └── Validates 10-digit Indian format (blocks invalid input with inline alert)
```

### Motion & Interaction Language
- **Entrance Animation**: `opacity: 0, y: 16` to `opacity: 1, y: 0` with a smooth easing curve (`easeOut`, duration `0.45s`).
- **Trigger Strategy**: `viewport: { once: true, margin: "-40px" }` so animations trigger once and never replay on upward scroll.
- **Staggered Grids**: Container stagger of `0.07s` left-to-right across cards in a row.
- **Hover Transitions**: Primary buttons smoothly transition background fill color on hover without scaling, sliding, or layout shifting.

---

## 3. Key Product Decisions & Implementation Details

### Part A — Fixes

#### 1. WhatsApp Number Validation
- **Regex**: `^(?:\+91|91)?\s*([6-9]\d{9})$`
- Normalizes input by removing spaces, hyphens, and brackets. Validates that the core number has exactly 10 digits starting with 6, 7, 8, or 9.
- Inline error styling: red highlight border (`border-rose-500`) with alert icon and message: *"Please enter a valid 10-digit Indian WhatsApp number."*
- Double validation: Checked on Step 1 Continue and verified in Step 4 before triggering WhatsApp URL.

#### 2. Service & Industry Inquire Preselection
- Mapping table connecting `TARGET_AUDIENCES` cards to form options:
  - `restaurants` ➔ Business: `Restaurant`, Website: `Restaurant & Café Website`
  - `salons` ➔ Business: `Salon / Beauty`, Website: `Salon & Beauty Website`
  - `gyms` ➔ Business: `Gym / Fitness`, Website: `Gym & Fitness Website`
  - `fashion` ➔ Business: `Fashion Studio`, Website: `Business Website`
  - `shops` ➔ Business: `Local Shop`, Website: `Business Website`
  - `clinics` ➔ Business: `Clinic / Healthcare`, Website: `Business Website`
  - `freelancers` ➔ Business: `Freelancer`, Website: `Portfolio`
  - `creators` ➔ Business: `Creator / Photographer`, Website: `Portfolio`
  - `startups` ➔ Business: `Startup`, Website: `Landing Page`
- Clicking "Inquire" updates both `selectedBusinessType` and `selectedWebsiteType` in `App.tsx` and passes them directly to `ProjectEnquiry`.

#### 3. Dark / Light Mode Toggle
- Default theme: `light`.
- Reads initial theme from `localStorage.getItem('sitevia-theme')` or system preference.
- Applies `.dark` class to `document.documentElement` and synchronizes `color-scheme: light / dark`.
- Header button placed beside the Share button with animated Sun/Moon icons.
- CSS transitions on `background-color` and `color` (`duration-200`) for smooth switching.

---

### Part B — Site-Wide Subtle Motion

#### 4. Hero Reveal
- Headline wrapped in an overflow-hidden mask; lines rise from `y: 100%` to `y: 0`.
- Mockup and device frame gently fade in (`opacity: 0` ➔ `1`).
- CTA buttons fade in concurrently with parent hero container.

#### 5. Text & Section Intros
- Reusable `FadeInWhenVisible` motion wrapper using `motion.div` with `viewport: { once: true }`.
- Applied to section titles, intros, and prose across Home, Services, Pricing, and About pages.

#### 6. Cards & Grids Stagger
- Motion container variants with `staggerChildren: 0.08` and child item variants (`opacity: 0, y: 16`).
- Applied to Pricing Cards, Comparison Table, Service Cards, and Audience Cards.

#### 7. Media & Images
- Image containers fade in softly without zoom, scaling, or Ken Burns movements.

#### 8. Buttons & Controls
- Primary pill buttons transition background color smoothly (`transition-colors duration-200`). No `scale(1.05)` or floating transform.
- High-contrast text ensured in both themes (white text on dark/blue hover states).

#### 9. Accordion & Modal Transitions
- FAQ accordion content animated using `motion.div` with `initial={{ height: 0, opacity: 0 }}` and `animate={{ height: 'auto', opacity: 1 }}`.
- Wizard steps slide smoothly with `AnimatePresence mode="wait"`.

#### 10. Hide-on-Scroll Header & Top Progress Bar
- Tracks `scrollY` and scroll delta: hides (`y: -100%`) when scrolling down past 100px; immediately slides down (`y: 0`) when scrolling up.
- Top scroll progress bar pinned at `top: 0, left: 0, height: 2px` with `scaleX: scrollProgress`.
- Mobile sticky quick-actions bar remains locked to bottom of mobile viewports without interference.

---

### Part C — Two New Interactive Elements

#### 11. Rotating Circular Brand Badge
- Rendered near the Hero CTA buttons.
- SVG `<textPath>` wrapping text: `"SITEVIA WORKS • 7-DAY DELIVERY •"`.
- Center icon: small arrow pointing towards the CTA.
- Rotation: continuous 360° spin over 24s (`animation: spin 24s linear infinite`).
- Mobile responsive: sized `w-20 h-20` on mobile, `w-24 h-24` on desktop, positioned cleanly without obscuring action buttons.

#### 12. "With / Without Website" Flip Demo
- Component: `src/components/WebsiteDifferenceDemo.tsx`
- Positioned right between `TrustStrip` and `HowItWorks` on the homepage.
- **Controls**: Segmented toggle between `"Without a website"` and `"With a website"`.
- **Search Simulation**: Mock search bar with an automated typewriter effect cycling through:
  - `"salon near me"`
  - `"restaurant near me"`
  - `"cafe near me"`
  - `"gym near me"`
- **Animated List**:
  - *Without a website*: Competitor #1 and Competitor #2 ranked at top. "Your business" ranked at bottom, muted/greyed out with `✕ No website — not showing up in local searches`.
  - *With a website*: Framer Motion `layout` animation smoothly animates "Your business" to Rank #1 with a highlighted blue/emerald badge, verified checkmark, and active actions: `Website • WhatsApp • Call now`.
- **Footer Note**: *"Illustration only — example businesses, not real clients."*

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  - Theme State (light/dark with localStorage sync)     │
│  - Navigation State & Inquiry Preselection Handlers   │
│  - Top Scroll Progress Bar (2px hairline)             │
└──────────────────────────┬─────────────────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
┌──────────────────┐               ┌──────────────────┐
│    Navbar.tsx    │               │  TechGridBg.tsx  │
│ - Hide-on-scroll │               │ (CSS 3D Horizon) │
│ - Theme Toggle   │               └──────────────────┘
│ - Share Button   │
└──────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│                 HomePage.tsx (Sections)                │
│                                                        │
│ 1. Hero.tsx                                            │
│    ├── Heading mask-reveal                             │
│    └── RotatingCircularBadge.tsx ("7-DAY DELIVERY")    │
│                                                        │
│ 2. InfiniteMarquee.tsx                                 │
│                                                        │
│ 3. TrustStrip.tsx (Benefits grid)                      │
│                                                        │
│ 4. WebsiteDifferenceDemo.tsx [NEW]                     │
│    ├── Typewriter Search Bar ("salon near me")         │
│    ├── "Without" vs "With" Toggle Switch               │
│    └── Animated Reordering Search Result Cards         │
│                                                        │
│ 5. HowItWorks.tsx (4-step agency process)              │
│                                                        │
│ 6. WhoWeBuildFor.tsx (Audience Cards)                  │
│    └── "Inquire" click -> passes Business & Web Type   │
│                                                        │
│ 7. FAQSection.tsx (Smooth Accordion motion)            │
└────────────────────────────────────────────────────────┘
```

---

## 5. Verification & Quality Assurance Plan

1. **Phone Validation Tests**:
   - `9876543210` ➔ Valid, advances.
   - `+91 98765 43210` ➔ Valid, advances.
   - `12345` ➔ Blocked with inline red error.
   - `5555555555` ➔ Blocked (does not start with 6–9).
2. **Preselection Tests**:
   - Click "Inquire" on *Restaurants & Dining* ➔ Wizard Step 2 opens with *Restaurant* and *Restaurant & Café Website* selected.
   - Click "Inquire" on *Salons & Spas* ➔ Wizard Step 2 opens with *Salon / Beauty* and *Salon & Beauty Website* selected.
3. **Theme Persistence**:
   - Toggle to Dark ➔ refresh page ➔ persists in Dark.
   - Toggle to Light ➔ refresh page ➔ persists in Light.
4. **Motion Restraint**:
   - Scroll down ➔ elements reveal once.
   - Scroll up ➔ no replay or jarring restarts.
   - Check `prefers-reduced-motion` media query disables animations.
5. **Interactive Flip Demo**:
   - Typewriter loop runs continuously.
   - Switching toggle reorders cards smoothly without layout jumps.
