# ColorEat Cafe — Online Menu

Mobile-friendly online menu for ColorEat Cafe (Oakville, ON). Built with Astro 5 and Tailwind CSS 4.

## Features

- Full restaurant menu (Breakfast, Crêpes, Main Menu, Drinks & Desserts)
- Mobile-first responsive design
- Bilingual: English + Ukrainian
- Downloadable PDF menus
- Static site — fast, no backend needed

## Development

```bash
bun install
bun run dev      # Start dev server at localhost:4321
bun run build    # Build static site to ./dist
bun run preview  # Preview the built site
```

## Deployment

Automatically deployed to GitHub Pages on push to `main` via GitHub Actions.

## Editing the Menu

Menu data is stored as JSON in `src/data/`:
- `menu-main.json` — Main menu (appetizers, salads, soups, mains, sides)
- `menu-breakfast.json` — Breakfast / Brunch
- `menu-crepes.json` — Crêpes (sweet & savory)
- `menu-drinks.json` — Drinks & Desserts
- `restaurant.json` — Restaurant info (address, phone, hours, social links)

UI translations are in `src/i18n/en.json` and `src/i18n/ua.json`.
