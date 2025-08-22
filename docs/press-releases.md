# Press Releases

This directory contains press releases for Faucet Boat Games in Markdown format.

## How to Add a New Press Release

1. Create a new `.md` file in this directory (e.g., `2025-12-25-new-game-launch.md`)
2. Add frontmatter at the top of the file:

```yaml
---
id: unique-release-id
title: "Your Press Release Title"
date: "2025-12-25"
published: true
featured: false
---
```

3. Add your press release content below the frontmatter using Markdown syntax
4. Run `npm run build` to regenerate the press releases data
5. The press release will automatically appear on the website

## Frontmatter Options

- `id`: Unique identifier for the press release
- `title`: Display title 
- `date`: Publication date (YYYY-MM-DD format)
- `published`: Set to `true` to make it visible on the site
- `featured`: Set to `true` to mark as featured (shows special badge)

## Build Process

Press releases are processed at build time:
- The `scripts/generate-press-releases.js` script reads all `.md` files in this directory
- It parses the frontmatter and content
- It generates `src/data/press-releases.ts` with the processed data
- This ensures the site works as a static build on GitHub Pages

## Links

Use markdown link syntax `[text](url)` for internal links:
- `[Homepage](/)` - Links to the home page
- `[About](/about)` - Links to other pages

The formatting system will automatically style these links properly.