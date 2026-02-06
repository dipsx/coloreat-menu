---
name: ColorEat v1.1 improvements
overview: Polish the ColorEat online menu site with visual improvements, Google Maps embed, detailed working hours, Schema.org structured data, and a custom 404 page.
todos:
  - id: hours-data
    content: Update restaurant.json with detailed per-day hours + coordinates + Google Maps URL (need to confirm actual hours with user)
    status: completed
  - id: i18n-update
    content: Add day names, "Open now"/"Closed", "Get Directions" translations to en.json and ua.json
    status: completed
  - id: opening-hours
    content: Create OpeningHours.astro component (weekly table, today highlight, open/closed status via client JS)
    status: completed
  - id: map-embed
    content: Create MapEmbed.astro component with Google Maps iframe + Get Directions link
    status: completed
  - id: schema-restaurant
    content: Create SchemaRestaurant.astro with Restaurant JSON-LD, add to Layout.astro
    status: completed
  - id: schema-menu
    content: Create SchemaMenu.astro with Menu/MenuSection/MenuItem JSON-LD, add to menu pages
    status: completed
  - id: seo-meta
    content: Add Twitter cards, robots meta, improved og:description to Layout.astro
    status: completed
  - id: visual-polish
    content: Add CSS animations (hero entrance, scroll reveal), menu item hover effects, decorative dividers, improved service icons
    status: completed
  - id: home-redesign
    content: "Update EN + UA home pages: hero animation, map embed in Visit Us, opening hours component"
    status: completed
  - id: 404-page
    content: Create 404.astro page with site layout, friendly message, navigation links
    status: completed
  - id: build-test
    content: Build, verify all pages, check structured data with Google Rich Results Test
    status: completed
isProject: false
---

# ColorEat Menu v1.1 -- Improvements

## 1. Visual Polish

**Home page hero** -- add a subtle decorative pattern or texture overlay to the gradient hero instead of plain blurry circles. Add a slight entrance animation (fade-in + slide-up) for the hero text using CSS `@keyframes`.

**Menu items** -- add a subtle left border accent on hover, slightly larger price text, and gentle fade-in animation for sections as they scroll into view (using `IntersectionObserver`). Add visual separators between menu categories (decorative line with a small ornament).

**General** -- refine spacing, add subtle `transition` on all interactive elements, improve the service cards with icons that better represent each service (fork/knife for dine-in, bag for takeout, bike for delivery). Add a warm decorative divider pattern between page sections.

Files to edit:

- [src/styles/global.css](src/styles/global.css) -- add keyframe animations, scroll reveal utilities
- [src/components/MenuItem.astro](src/components/MenuItem.astro) -- hover accent, improved spacing
- [src/components/MenuSection.astro](src/components/MenuSection.astro) -- decorative category dividers
- [src/pages/en/index.astro](src/pages/en/index.astro) + [src/pages/ua/index.astro](src/pages/ua/index.astro) -- hero animation, better icons

---

## 2. Google Maps Embed

Add an interactive Google Maps embed to the "Visit Us" section on the home page. Use a simple iframe embed (no API key needed) pointing to "ColorEat, 363 Kerr St, Oakville, ON".

Add map coordinates and a Google Maps link to [src/data/restaurant.json](src/data/restaurant.json):

```json
"coordinates": { "lat": 43.4456, "lng": -79.6799 },
"googleMapsUrl": "https://maps.google.com/?q=ColorEat+363+Kerr+St+Oakville+ON"
```

Create a new `MapEmbed.astro` component with the iframe, styled as a rounded card matching the site design. Include a "Get Directions" link below the map.

Files to create/edit:

- [src/data/restaurant.json](src/data/restaurant.json) -- add coordinates, maps URL
- New: `src/components/MapEmbed.astro` -- iframe + "Get Directions" link
- [src/pages/en/index.astro](src/pages/en/index.astro) + [src/pages/ua/index.astro](src/pages/ua/index.astro) -- replace text-only "Visit Us" with map section

---

## 3. Detailed Working Hours

Replace the simple `"hours"` string in [src/data/restaurant.json](src/data/restaurant.json) with a structured per-day schedule:

```json
"hours": {
  "monday":    { "open": "11:00", "close": "20:00" },
  "tuesday":   { "open": "11:00", "close": "20:00" },
  "wednesday": { "open": "11:00", "close": "20:00" },
  "thursday":  { "open": "11:00", "close": "20:00" },
  "friday":    { "open": "11:00", "close": "21:00" },
  "saturday":  { "open": "10:00", "close": "21:00" },
  "sunday":    { "open": "10:00", "close": "20:00" }
}
```

*(The exact hours above are placeholder -- you will need to confirm them.)*

Create a new `OpeningHours.astro` component that:

- Renders the full weekly schedule in a clean table/list
- Highlights today's row with the brand color
- Shows "Open now" / "Closed" status based on current time (client-side JS)

Use this component in the home page "Visit Us" section and in the footer.

Files to create/edit:

- [src/data/restaurant.json](src/data/restaurant.json) -- structured hours
- New: `src/components/OpeningHours.astro` -- hours display + "open now" logic
- [src/i18n/en.json](src/i18n/en.json) + [src/i18n/ua.json](src/i18n/ua.json) -- day names, "Open now" / "Closed" translations
- [src/pages/en/index.astro](src/pages/en/index.astro) + [src/pages/ua/index.astro](src/pages/ua/index.astro) -- use new component
- [src/components/Footer.astro](src/components/Footer.astro) -- show today's hours

---

## 4. SEO -- Schema.org Structured Data

Add JSON-LD structured data to the site using two schemas:

**a) Restaurant (on all pages)** -- embedded in [src/layouts/Layout.astro](src/layouts/Layout.astro):

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "ColorEat Cafe",
  "description": "...",
  "address": { "@type": "PostalAddress", ... },
  "telephone": "(289) 400-4695",
  "servesCuisine": "Ukrainian",
  "openingHoursSpecification": [ ... per day ... ],
  "hasMenu": "https://dipsx.github.io/coloreat-menu/en/menu/",
  "url": "https://dipsx.github.io/coloreat-menu/",
  "sameAs": ["https://instagram.com/coloreat.cafe/"]
}
```

**b) Menu with MenuSections and MenuItems (on menu pages)** -- new `SchemaMenu.astro` component embedded in the menu pages. Generates JSON-LD from the existing JSON data files.

**c) Additional meta tags** in Layout.astro:

- `twitter:card`, `twitter:title`, `twitter:description`
- `robots: index, follow`
- Better per-page `og:description`

Files to create/edit:

- New: `src/components/SchemaRestaurant.astro` -- Restaurant JSON-LD
- New: `src/components/SchemaMenu.astro` -- Menu JSON-LD from data files
- [src/layouts/Layout.astro](src/layouts/Layout.astro) -- add Twitter cards, robots, schema component
- [src/pages/en/menu/index.astro](src/pages/en/menu/index.astro) + UA variant -- add menu schema

---

## 5. Custom 404 Page

Create [src/pages/404.astro](src/pages/404.astro) that:

- Uses the site Layout (with header/footer)
- Shows a friendly "Page not found" message in English (since we can't detect locale from a 404)
- Has a "Back to Menu" and "Back to Home" button
- Matches the site's visual style

---

## Implementation Order

Steps ordered by dependency and impact.