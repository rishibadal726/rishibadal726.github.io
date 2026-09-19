# Rishi Badal Portfolio

A responsive, static portfolio for software engineering internship applications. It has an Experience section and timeline, three project cards with individual case studies, an About and toolkit section, contact links, a persistent light/dark theme, an embedded resume page, and an embedded NASA HUNCH recognition letter.

## Tech stack

- Semantic HTML, CSS, and vanilla JavaScript for the mobile menu, saved theme preference, and hero typing animation
- CSS Grid, Flexbox, SVG assets, and responsive media queries; no build step
- Vimeo embeds for NASA HUNCH, a Canva presentation embed for Lunar Lander, and a Google Drive video embed for ValidMoviez
- Local, byte-for-byte copies of the supplied resume and NASA HUNCH recognition letter, rendered with a bundled PDF.js viewer and zoom controls

## Preview locally

From this directory run `python3 -m http.server 4173` and open `http://localhost:4173/`. The HTML pages also work under a GitHub Pages project root because links are relative.

## Update content

- Edit `index.html` for homepage copy, cards, dates, timeline, and links.
- Edit `projects/*.html` for case studies and video embeds. The Canva embed currently opens slide 10, where the playable Lunar Lander demo appears.
- Edit `styles.css` for shared typography, colors, layouts, and breakpoints; `details.css` for case studies and the resume viewer. `site.js` closes the mobile menu after a selection.
- Replace `assets/rishi-profile.JPG` for a new portrait. The NASA and GDSC logos live at `assets/nasa-hunch-logo.png` and `assets/gdsc-logo.png`.
- Replace `CS_RishiBadal_Resume.pdf` or `NASA_HUNCH_Recognition_Letter.pdf` with updated supplied PDFs if needed. The site deliberately embeds each file as supplied; review their contents before publishing publicly.

The locally bundled PDF.js files in `assets/pdfjs/` use the Apache 2.0 license included beside them. The PDF itself is unchanged.

The Lunar Lander card uses an edited cover derived from a frame of the user-provided presentation demo. The NASA HUNCH and ValidMoviez cards use thumbnail images from their user-provided video pages. The detail hero illustrations for NASA and ValidMoviez are conceptual graphics. Locally stored Devicon SVGs are covered by the included MIT license; the Pygame mark comes from the Pygame documentation. Brand marks remain their owners' property.

No commits or publication have been made. Review the local preview first.
