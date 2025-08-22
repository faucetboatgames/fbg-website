# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Faucet Boat Games, built as a single-page Vue 3 application using TypeScript and Vite. It's a static site showcasing the studio's game portfolio with both current and upcoming titles.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Pinia** for state management
- **Vite** for build tooling and development server
- **SCSS** for styling with scoped styles

### Project Structure
- `src/main.ts` - Application entry point with Pinia setup
- `src/App.vue` - Main application layout with hero, featured game, game sections, and footer
- `src/stores/gameStore.ts` - Pinia store containing all game data (current and upcoming games)
- `src/types/Game.ts` - TypeScript interface for Game objects
- `src/components/` - Reusable Vue components
- `src/assets/` - Static assets (images, styles)

### Key Components
- **GameCard.vue** - Flip card component showing game thumbnail on front, details on back
- **CollapsibleSection.vue** - Expandable section component used for game categories
- **GameGrid.vue** - Grid layout for game cards (referenced but not yet implemented)

### Data Architecture
Games are managed through the Pinia store with two categories:
- `currentGames` - Released/available games displayed in hexagon grid
- `upcomingGames` - Future releases displayed in timeline format

Each game follows the `Game` interface with properties: id, title, description, status, thumbnailUrl, bannerUrl, features, platforms, genre, and optional releaseDate.

### Styling Approach
- CSS custom properties for theming (--color-primary, --color-secondary, --color-accent, --color-text)
- SCSS with scoped styles in each component
- Responsive design with mobile-first approach
- Grid layouts for game displays (hexagon grid for current, timeline for upcoming)
- Hover effects and transitions throughout

### Static Site Deployment
The site is configured for static deployment with `base: './'` in vite.config.ts and includes a CNAME file for GitHub Pages deployment.

### Press Releases System
Press releases are managed through a build-time system:
- **Source files**: `/press-releases/*.md` - Markdown files with YAML frontmatter
- **Generated data**: `src/data/press-releases.ts` - Auto-generated TypeScript data
- **Documentation**: `docs/press-releases.md` - How to add new press releases
- **Build process**: Automatically converts markdown files to structured data for static deployment
- **Routes**: Home page shows latest release preview, `/press-releases` shows full list with expandable content