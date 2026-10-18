# Crescentech website

A static multi-page site with no build step:

| Page | File |
|---|---|
| Home | `index.html` |
| Services | `services.html` |
| Portfolio | `portfolio.html` |
| Pricing | `pricing.html` |
| About | `about.html` |
| Contact | `contact.html` |

Shared styles are in `css/style.css`, scripts are in `js/main.js` and images are in `assets/`.

## Preview locally
Page links use clean addresses (`/services`, not `services.html`), so preview with a server that supports them:

    cd website
    npx serve .

Then open the address it prints (usually http://localhost:3000).
On Vercel, `vercel.json` (`"cleanUrls": true`) serves `/services` from `services.html` and redirects old `.html` links.

## Add new portfolio work
1. Export the image as `.webp` at about 1800px on the long side and put it in `assets/work/`.
2. Save a smaller copy (about 760px) with the same file name in `assets/thumb/`.
3. Add a line to the `WORK` list at the top of `js/main.js`:
   `['file-name', 'Project title', 'Branding' | 'Social Media' | 'Merchandise' | 'Outdoor'],`

## Change prices
Edit the price table in `pricing.html`.

## Brand colours (top of `css/style.css`)
- Blue `#1a2fe0`
- Gold `#f5b301`

## Before going live
- Replace the LinkedIn link in the footer of each page (search for `TODO`).
- Confirm the Instagram and X handles (`crescentechke`).

## Hosting (free options)
- **Netlify** or **Vercel**: drag the `website` folder into the dashboard.
- **GitHub Pages**: push the folder to a repo and enable Pages.
- Point a domain (e.g. crescentech.co.ke) at it from your registrar.
