# LEON.WONG | Architecting Scale

Personal portfolio and digital hub for Leon Wong, Solutions Architect and Automation Engineer.

## Overview
This repository contains the front-end application for `lenowng.github.io`. 

The design follows the **Artisanal Logic** aesthetic, utilizing a disciplined structural layout, WebGL shader interactions, and a strict minimalist color palette to represent high-end engineering and automation.

## Tech Stack
- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (v3)
- **Routing:** React Router v7
- **Graphics:** Pure WebGL (Three.js-style implementation for background interactions)
- **Icons/Fonts:** Lucide React, Google Fonts (Inter, Material Symbols Outlined)

## Core Components
- **Hero System:** Features a bespoke, interactive WebGL shader (`ShaderBackground.tsx`) simulating intersecting grid lines that react to cursor movement.
- **The Digest:** An automated curated blog feed to highlight architectural insights and technical explorations.
- **Projects Feed:** Uses an `organic-offset` structural pattern to display engineering case studies with precision and negative space.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Development Server:**
   ```bash
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```

## Development Rules
Please see `RULE.md` for governing principles of this codebase, specifically regarding documentation alignment.
