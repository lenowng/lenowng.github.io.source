# Requirements: Nightr.dev Personal Brand & Agency Site

Professional portfolio and agency website for **Nightr.dev**, specializing in high-end automation, Shopify architecture, and cloud infrastructure.

## 1. Project Overview
- **Objective:** Establish a high-end digital presence that showcases technical expertise in Shopify, AWS, and Automation.
- **Target Audience:** Digital brands, e-commerce merchants, and tech companies seeking specialized architecture.
- **Primary Repo:** `lenowng.github.io` (GitHub Pages).

## 2. Tech Stack Requirements
- **Framework:** Vite + React (TypeScript) for a fast, modern development experience.
- **Deployment:** GitHub Pages via GitHub Actions (Static Site Generation).
- **Styling:** 
  - Vanilla CSS (for maximum flexibility and performance).
  - CSS Variables for the "Dim" design system (per `BRANDING.md`).
- **Animations:** Framer Motion for high-end micro-interactions and page transitions.
- **Icons:** Lucide React or customized SVG icons.

## 3. Core Features & Functional Requirements
### A. Interactive Hero Section
- **Visuals:** Grid background (CSS Grid) with SVG noise overlay.
- **Feature:** A terminal-style "Interactive CLI" where users can type commands (e.g., `services`, `contact`) to interact with the site.
- **Aesthetic:** "Building the web’s dark mode."

### B. Portfolio (Case Studies)
- **Visuals:** Syntax-highlighted code editor UI (VS Code style).
- **Functionality:** Filterable projects categorized by "Shopify", "AWS", "Automation", and "Full-Stack".
- **Detail:** Project pages showcasing "Automation Logic" and "Tech Stack".

### C. Services "Clusters"
- Modular display of services:
  - Commerce Architecture (Shopify Headless/Liquid).
  - Workflow Engineering (Apps Script/Bespoke APIs).
  - Infrastructure (AWS Scalability/Security).

### D. System Health (Footer)
- A "Server Heartbeat" pulse animation.
- Dynamic "System Status: Nominal" display.

## 4. Design System (Per BRANDING.md)
- **Primary Background:** `#0B0E14` (Deep Obsidian).
- **Surface/Card:** `#161B22` (Midnight Grey).
- **Primary Accent:** `#00FF9C` (Cyber Lime).
- **Secondary Accent:** `#FF9900` (AWS Orange).
- **Typography:** Modern, tech-focused font (e.g., 'Inter' or 'Outfit').
- **Effects:** Glassmorphism (`backdrop-filter: blur(12px)`) for navigation.

## 5. Performance & SEO
- **Optimization:** Image optimization via modern formats (WebP/AVIF).
- **SEO:** Metadata for all pages, Open Graph images, and semantic HTML5.
- **Load Times:** Optimized LCP (Largest Contentful Paint) and high Core Web Vitals scores.

## 6. Implementation Milestones
1. **Foundation:** Initialize Vite/React environment and CSS design tokens.
2. **Core Layout:** Build the Sidebar/Nav and Grid background system.
3. **Hero & CLI:** Implement the interactive terminal and typewriter effects.
4. **Content Modules:** Develop Portfolio and Service cluster components.
5. **Deployment:** Configure GitHub Actions for automated deployment to GitHub Pages.
