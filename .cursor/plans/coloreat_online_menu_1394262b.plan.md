---
name: ColorEat Online Menu
overview: Создание статического мобильно-ориентированного сайта-меню для ресторана ColorEat Cafe (украинская кухня, Oakville, ON) с двумя языками (EN/UA), PDF-скачиванием и деплоем на GitHub Pages.
todos:
  - id: init-project
    content: Initialize Astro 5 project with Tailwind CSS 4, configure for GitHub Pages static output
    status: completed
  - id: data-files
    content: "Create JSON data files with full menu content (EN + UA) from the PDF menus -- 4 files: main, breakfast, crepes, drinks-desserts + restaurant info"
    status: completed
  - id: layout-components
    content: Build base Layout, Header (with language switcher), Footer (address, phone, socials, delivery links)
    status: completed
  - id: menu-components
    content: Build MenuSection, MenuItem, DietaryBadge, CategoryNav components -- mobile-first responsive design
    status: completed
  - id: pages
    content: "Create pages: home (EN/UA) with restaurant info + delivery options, menu page (EN/UA) with all categories"
    status: completed
  - id: pdf-download
    content: Add PDF files to public/ and create download buttons on the site
    status: completed
  - id: styling-polish
    content: "Polish visual design: colors, typography, spacing, animations, dark/light considerations"
    status: completed
  - id: gh-actions
    content: Set up GitHub Actions workflow for automatic deployment to GitHub Pages on push to main
    status: completed
  - id: git-init
    content: Initialize git repo, create .gitignore, initial commit, push to GitHub
    status: in_progress
isProject: false
---

# ColorEat Online Menu -- Technical Specification & Plan

## 1. Project Summary (TZ / Requirements)

**ColorEat Cafe** -- small Ukrainian restaurant in Oakville, ON (363 Kerr St). The restaurant plans to distribute flyers with a QR code linking to an online menu. The site must:

- Display the full restaurant menu in a mobile-friendly format (primary use case: scan QR from phone)
- Provide downloadable PDF versions of the menus
- Be available in English (primary) and Ukrainian
- Be a static site with no backend, hosted for free on GitHub Pages
- Be simple, beautiful, and fast-loading

**What the site is NOT (for v1):**

- No online ordering / cart / checkout
- No reservations system
- No CMS / admin panel
- No user accounts

**Information displayed on the site:**

- Restaurant name, tagline ("A piece of Ukraine in Oakville"), address, phone, hours
- Links to DoorDash, Uber Eats for delivery
- Mention of dine-in, takeout, delivery options
- Full menu across 4 categories: Breakfast/Brunch, Crepes, Drinks & Desserts, Main Menu
- Each item: name, price, description, dietary tags (vegetarian, gluten-free, dairy-free)
- Allergy notice
- Downloadable PDF menus
- Links to Instagram, possibly other socials

---

## 2. Technology Stack


| Layer | Choice | Rationale |
| ----- | ------ | --------- |


- **Framework**: Astro 5 -- generates static HTML/CSS, zero JavaScript by default, fast page loads, ideal for content-driven static sites. Component-based for clean code.
- **Styling**: Tailwind CSS 4 -- utility-first, excellent for mobile-first responsive design, fast prototyping.
- **Content**: JSON data files for menu items -- easy to edit, no database needed. Separate files per menu category.
- **i18n**: Astro's built-in i18n routing (`/en/`, `/ua/`) with translation JSON files.
- **Deployment**: GitHub Pages via GitHub Actions (Astro has official adapter).
- **Domain**: Custom domain will be connected later via GitHub Pages CNAME.

---

## 3. Site Structure

```
/ (redirect to /en/)
/en/ -- Home/landing page with restaurant info + navigation to menus
/en/menu/ -- Full menu page (all categories with tab/section navigation)
/ua/ -- Ukrainian version of home
/ua/menu/ -- Ukrainian version of menu
```

The menu page will have smooth-scroll sections or tab navigation for:

- Breakfast / Brunch
- Crepes (Sweet + Savory)
- Drinks & Desserts
- Main Menu (Cold Appetizers, Hot Appetizers, Salads, Soups, Main Courses, Sides)

A sticky header or floating category selector will let users jump between sections quickly on mobile.

---

## 4. Design Approach

- **Mobile-first**: Designed for 375px+ screens, responsive up to desktop
- **Color palette**: Derived from ColorEat branding (warm, inviting -- likely earth tones, Ukrainian-inspired accents -- yellow/blue hints)
- **Typography**: Clean, readable sans-serif (Inter or similar Google Font)
- **Layout**: Single-column on mobile, card-based menu items, clear price display
- **Dietary badges**: Small colored pills (V for Vegetarian, GF for Gluten-Free, DF for Dairy-Free)
- **PDF download**: Prominent button/link in header or menu page
- **QR landing**: The QR code on flyers will point to the root URL, which redirects to `/en/`

---

## 5. Project File Structure

```
online-menu-1/
  astro.config.mjs
  package.json
  tailwind.config.mjs
  tsconfig.json
  public/
    menus/                     # PDF files for download
      ColorEat-Main-Menu.pdf
      ColorEat-Breakfast-Menu.pdf
      ColorEat-Crepes-Menu.pdf
      ColorEat-Drinks-Menu.pdf
    favicon.svg
  src/
    data/
      menu-main.json           # Main menu items (EN + UA)
      menu-breakfast.json      # Breakfast items
      menu-crepes.json         # Crepes items
      menu-drinks.json         # Drinks & Desserts items
      restaurant.json          # Restaurant info (address, phone, hours, socials)
    i18n/
      en.json                  # UI translations (English)
      ua.json                  # UI translations (Ukrainian)
    components/
      Header.astro             # Logo, language switcher, nav
      Footer.astro             # Address, phone, socials, delivery links
      MenuSection.astro        # Renders a category section
      MenuItem.astro           # Single menu item card
      DietaryBadge.astro       # V, GF, DF badges
      CategoryNav.astro        # Sticky category navigation
      PdfDownload.astro        # PDF download buttons
      DeliveryLinks.astro      # DoorDash, Uber Eats buttons
    layouts/
      Layout.astro             # Base HTML layout
    pages/
      index.astro              # Redirect to /en/
      en/
        index.astro            # English home
        menu.astro             # English menu
      ua/
        index.astro            # Ukrainian home
        menu.astro             # Ukrainian menu
  .github/
    workflows/
      deploy.yml               # GitHub Actions for GitHub Pages deploy
```

---

## 6. Content Data Model

Each menu item in JSON:

```json
{
  "id": "ukrainian-borscht",
  "name": { "en": "Ukrainian Borscht", "ua": "Український борщ" },
  "description": {
    "en": "A hearty Ukrainian soup made with beef broth, beets, cabbage, and potatoes...",
    "ua": "Наваристий український суп на яловичому бульйоні з буряком, капустою та картоплею..."
  },
  "price": 16.00,
  "note": { "en": "Option without additions: $12", "ua": "Без додатків: $12" },
  "dietary": ["df"],
  "category": "soups"
}
```

---

## 7. Deployment Pipeline

1. Push to `main` branch on GitHub
2. GitHub Actions workflow builds the Astro site (`astro build`)
3. Output is deployed to GitHub Pages
4. Site available at `https://username.github.io/online-menu-1/` initially
5. Later: connect custom domain via CNAME record in DNS + `public/CNAME` file

---

## 8. Implementation Order

Steps below are ordered by priority for a working v1.