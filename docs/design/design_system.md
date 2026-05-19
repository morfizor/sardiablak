# Sardiablak Design System

This document outlines the core design decisions, tokens, and component guidelines for the Sardiablak project to ensure a cohesive, "pro max" premium user experience.

## 1. Typography

We pair two modern typefaces from Google Fonts to achieve clean geometric headings and excellent body readability:

- **Headings (h1, h2, h3, h4):** `'Poppins', sans-serif`
  - Bold/Extra-bold (600, 700, 800) with tighter letter-spacing (`-0.02em`) for a modern, architectural structure.
- **Body Text:** `'Inter', sans-serif`
  - Regular (400) or Medium (500) with relaxed line-height (`1.6`) for high readability.
- **Base Font Size:** `16px`

## 2. Color Palette

The color palette is designed to convey trust, quality, and a modern aesthetic, moving away from generic flat colors to rich corporate navy and vibrant accent blues.

### Primary Colors
- **Deep Corporate Navy (Brand Primary):** `#0B2545` (Used for primary text, deep backgrounds, and high contrast)
- **Vibrant Royal Blue (Accent):** `#0066FF` (Used for primary buttons, highlights, links, and brand accents)
- **Rich Dark Blue (Accent Hover):** `#0052CC` (Used for hover states on primary action items)
- **Steel Slate Blue:** `#134074` (Secondary color for structural elements or subtitle text)

### Neutral Colors
- **Background Base:** `#FCFDFE` (Cool premium light grey/white for main content areas)
- **Card/Surface:** `#FFFFFF` (Pure white background for clean layout cards)
- **Muted Surface:** `#F1F5F9` (Subtle off-white background used for sections to create visual depth)
- **Text Primary:** `#0F172A` (Slate-900, softer than pure black for superior reading comfort)
- **Text Muted:** `#475569` (Slate-600, for descriptions and secondary text)
- **Border/Divider:** `#E2E8F0` (Slate-200)
- **Border Hover:** `#CBD5E1` (Slate-300)

## 3. Shadows & Depth

Shadows are soft, blue-tinted, and dispersed to integrate seamlessly with the primary brand colors, avoiding harsh black dropshadows.

- **Small:** `0 2px 8px -2px rgba(11, 37, 69, 0.06), 0 1px 3px -1px rgba(11, 37, 69, 0.06)`
- **Medium (Default Cards):** `0 12px 24px -6px rgba(11, 37, 69, 0.08), 0 4px 12px -2px rgba(11, 37, 69, 0.04)`
- **Large:** `0 24px 48px -12px rgba(11, 37, 69, 0.12), 0 8px 24px -4px rgba(11, 37, 69, 0.06)`
- **Hover Glow:** `0 20px 40px -8px rgba(0, 102, 255, 0.12), 0 4px 12px -2px rgba(0, 102, 255, 0.06)`

## 4. Animation & Interaction

Interactions are designed to be extremely snappy, fast, and stable, avoiding slow floaty movements or distracting layouts.

- **Transitions:**
  - `--transition-smooth: all 0.15s ease-in-out;` (For smooth color transitions, borders, and shadows)
  - `--transition-fast: all 0.08s ease-in-out;` (For immediate feedback on smaller buttons or toggle buttons)
- **Flat Layout Principle:**
  - No vertical offset (`translateY`) or bounce on hover or active states. All interactive elements stay in place to maintain layout integrity.
  - No image zoom/scaling (`transform: scale(...)`) on gallery thumbnails, product cards, or masonry items.
- **Hover Effects:**
  - **Buttons:** Background color transition (to hover variant) and subtle border changes.
  - **Cards & Masonry Items:** Soft glow border-color changes and standard to hover shadow adjustments.

## 5. Components

- **Buttons:** Clean rounded corners (`border-radius: 8px`), high contrast backgrounds, and fast color transitions on hover.
- **Header:** Sticky top with a solid white background (`#FFFFFF`) to blend seamlessly with the company logo's background. The height is controlled by a dynamic CSS variable `--header-height` (`90px` on desktop, `75px` on mobile). It contains the real company logo (`media/Termekink/logo.jpg`) styled as a flexible image with a height of `60px` on desktop and `48px` on mobile/tablet. Also includes a mobile menu toggle (`☰`) that is hidden (`display: none;`) on desktop screens and only shown below `900px` screen width.
- **Hero & Subpage Headers:** High-contrast text overlays using subtle shadows (`text-shadow`) on a dark image background without using glassmorphic content cards or distracting bottom gradient fades, keeping all layout boundaries clean and sharp.

