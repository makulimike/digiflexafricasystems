# DigiFlex Systems — Website

A static, frontend-only website (HTML5, CSS3, vanilla JavaScript — no
frameworks, no backend) for a network infrastructure and security
solutions company.

## Structure

```
digiflex-systems/
  index.html
  services.html
  about.html
  projects.html
  contact.html
  css/
    style.css        (design tokens, layout, components)
    responsive.css    (media queries: 1200 / 960 / 700 / 480px)
  js/
    main.js           (nav, sticky header, reveal-on-scroll, back-to-top)
    contact.js         (contact form validation + mock submit)
  images/              (reserved for photography — see images/README.txt)
```

Open `index.html` directly in a browser — no build step or server required.

## Before going live, replace these placeholders

- Phone number: `+254 XXX XXX XXX` (appears in header, footer, contact page)
- WhatsApp link number in `contact.html` (`https://wa.me/254XXXXXXXXX`)
- Email address `info@digiflexsystems.co.ke` if a different address is preferred
- Social media links (`#`) in the footer
- Connect the contact form to a real backend or email service — see the
  comment at the top of `js/contact.js` for where to plug in a `fetch()`
  call once one is available.

## Design notes

- Colors, type (Manrope for headings / Inter for body) and layout tokens
  live at the top of `css/style.css` under `:root`.
- Visuals are built as inline SVG technical schematics (rack elevations,
  cabling/patch-panel diagrams, topology sketches) rather than stock
  photography, matching the "technical, not generic-AI-startup" direction.
  Real project photography can be dropped into `images/` and swapped in later.
