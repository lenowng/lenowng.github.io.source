# Design System: Artisanal Logic

This document defines the strict, architectural design system used throughout the portfolio, reflecting precision, automation, and structural integrity.

## 1. Color Palette

The palette is stark, relying on contrast and subtle grays to create a clinical, high-end feel.

### Surfaces
- `bg-surface` (`#f9f9f9`): The primary background, bright but not blinding white.
- `bg-surface-container-low` (`#f4f3f3`): Secondary background for alternating sections.

### Text & Lines
- `text-primary` (`#171818`): Core typography and headings.
- `text-on-surface-variant` (`#444748`): Subtitles, metadata, and supporting text.
- `border-outline` (`#747878`): Structural borders and brackets.
- `border-outline-variant` (`#c4c7c7`): Hairline section dividers.

## 2. Typography

We exclusively use **Inter** (Google Fonts).

### Scales
- `display-lg`: 64px, tight tracking (`-0.02em`), light weight (300). Used for massive architectural statements (e.g. Hero).
- `headline-md`: 32px, regular tracking. Used for section titles (`01. THE DIGEST`).
- `body-lg`: 18px. Primary reading text for case studies and methodology.
- `body-sm`: 14px. Secondary descriptions.
- `label-caps`: 12px, wide tracking (`0.2em`), bold (600). Used for metadata, tags, and small functional UI elements.

## 3. Structural Patterns

### The Bracket Border (`.bracket-border`)
Used for encapsulating data structures like the Digest items or Project cards. Consists of a top and left border to simulate drafting lines.

### Organic Offsets (`.organic-offset-*`)
Used in the Projects section. Rather than a rigid grid, items are offset horizontally to create an artisanal, sculptural flow to the page while remaining structurally sound.

### The Fine Line (`.h-fine-line`, `.w-fine-line`)
Used to divide sections and establish visual anchors. Always 1px.

## 4. Interactive Elements

### WebGL Shader
The Hero section utilizes a pure WebGL canvas background that renders a dynamic, cursor-reactive grid of lines. This represents the "pulse" of automation running invisibly in the background.

### Fade-In-Up (`.fade-in-up`)
Used via IntersectionObserver for all elements entering the viewport, providing a smooth, high-end entrance animation.
