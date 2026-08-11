---
name: Cosmic Cinematic
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#191f31'
  surface-container-high: '#23293c'
  surface-container-highest: '#2e3447'
  on-surface: '#dce1fb'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dce1fb'
  inverse-on-surface: '#2a3043'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#4d8eff'
  on-tertiary-container: '#00285d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0c1324'
  on-background: '#dce1fb'
  surface-variant: '#2e3447'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 84px
    fontWeight: '800'
    lineHeight: 90px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  stats-number:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 2rem
  margin-mobile: 1.5rem
  margin-desktop: 4rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system is defined by a cinematic and immersive aesthetic that captures the vastness and mystery of space exploration. It prioritizes high-impact visuals, utilizing deep obsidian backgrounds contrasted with vibrant, glowing accents to evoke a sense of futuristic discovery.

The visual direction blends **Minimalism** with **Glassmorphism** and **High-Contrast** elements. Layouts are spacious and dramatic, using large-scale typography to establish a clear information hierarchy. The interface feels like a sophisticated flight deck or a high-end editorial experience, balancing technical precision with emotional, awe-inspiring imagery.

The target audience consists of explorers, enthusiasts, and researchers who value a premium, tech-forward experience that feels both reliable and visionary.

## Colors

The palette is built on a "Deep Space" foundation, using a dark mode architecture to allow luminous colors and imagery to pop.

- **Primary & Secondary:** A gradient of Electric Indigo and Vivid Purple serves as the primary action color, used for high-importance triggers and "glow" effects.
- **Tertiary:** A sharp, technical Blue is used for secondary accents, outlines, and data visualization elements.
- **Neutral:** The base is a true Obsidian (`#020617`), with varying shades of slate used for container surfaces and borders.
- **Functional:** Pure white is reserved for high-contrast headlines, while muted slates are used for supporting body text to maintain visual comfort.

Apply gradients with a 45-degree angle for buttons and progress indicators to mimic the movement of light in a vacuum.

## Typography

This design system employs a three-tier font strategy to balance impact, readability, and technical flair.

1. **Sora (Headlines):** Used for massive, high-impact titles. It features geometric shapes and a wide stance that feels modern and architectural.
2. **Hanken Grotesk (Body):** A clean, contemporary sans-serif that ensures high legibility for descriptions and long-form content against dark backgrounds.
3. **JetBrains Mono (Labels/Technical):** Used for micro-copy, coordinates, and metadata. The monospaced nature evokes a "computer terminal" or instrument panel aesthetic.

Use "Display" styles sparingly for hero sections. Headlines should often utilize uppercase or wide tracking for a more cinematic, expansive feel.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to create a sense of atmospheric "breathability."

- **Desktop:** 12-column grid with 64px (4rem) side margins.
- **Tablet:** 8-column grid with 32px (2rem) side margins.
- **Mobile:** 4-column grid with 24px (1.5rem) side margins.

Spacing is designed to be intentional and "heroic." Avoid clutter; use vertical stacks (`stack-lg`) to separate major content blocks. Information density should be low in hero areas and higher in technical dashboards or data-heavy sections. Elements like image cards should often bleed or sit within large gutters to emphasize the scale of space.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Light Emission** rather than traditional shadows.

1. **Base Layer:** Pure dark neutral background (`#020617`).
2. **Glass Layer:** Semi-transparent containers (10-20% opacity) with a heavy `backdrop-filter: blur(20px)`. Borders on these layers should be subtle, 1px solid at 15% white.
3. **Glow Elevation:** Active elements or primary cards utilize an outer glow (`box-shadow`) using the primary indigo/purple colors at very low opacity (10-20%) with high blur radius (40px+).
4. **Z-axis:** Higher elevation is represented by increased background opacity and sharper, brighter border highlights.

## Shapes

The shape language is sophisticated and modern, using "Rounded" (`0.5rem`) as the standard corner radius.

- **Standard (Base):** 8px radius for input fields, small buttons, and UI controls.
- **Large (Containers):** 16px radius for cards, modals, and featured image sections.
- **Extra Large (Hero):** 24px radius for the primary application container or background framing.

The use of rounded corners softens the technical edge of the monospaced fonts and dark colors, making the futuristic aesthetic feel more approachable and "human-centric."

## Components

### Buttons
- **Primary:** Gradient fill (Indigo to Purple) with white text. High-radius (pill-shaped) or `rounded-lg`. Apply a subtle glow on hover.
- **Secondary:** Ghost style with a 1px primary-colored border or a glass background.
- **Icon Buttons:** Circular glass containers with centered white icons.

### Cards
- Use glassmorphism as the standard. Cards should have a thin, 1px top-light border to catch the "simulated light source."
- Background images within cards should have a dark overlay to ensure text legibility.

### Inputs & Fields
- Dark, semi-transparent backgrounds with a 1px slate border.
- Focus state: Border transitions to primary indigo with a subtle outer glow.
- Labels: Always use the `label-caps` (JetBrains Mono) style above the field.

### Chips & Badges
- Small, pill-shaped elements. Use a solid primary color for status and a glass style for categories. Use `label-caps` typography.

### Data Points
- Featured numbers (stats) should use `stats-number` (Sora) with a slight horizontal rule below them to anchor the data, mirroring the instrument panels found in spacecraft.