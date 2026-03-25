# Parkside. — Website

Static site for parkside.no. No build step required.

## Structure

```
07_NETTSTAD/
├── index.html          — Single-page site
├── styles.css          — Complete design system
├── script.js           — Minimal interaction layer
├── assets/
│   ├── logo/
│   │   └── parkside-wordmark.svg
│   └── work/
│       ├── kil-logo.png
│       ├── kil-wordmark.png
│       ├── kalsikt-logo.png
│       ├── kalsikt-wordmark.png
│       └── technical-drawing-01.png
├── .gitignore
└── README.md
```

## Deploy

### Vercel (recommended)
1. Push repo to GitHub
2. Import project on vercel.com
3. No build configuration needed — static site

### Netlify
1. Drag the `07_NETTSTAD/` folder into netlify.com/drop
2. Done

### Self-hosted / FTP
Upload all files to public root. No server-side requirements.

## Local development

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

## Notes

- Fonts loaded via Google Fonts (Inter, DM Mono). No fallback required for modern browsers.
- All project card visuals are CSS-only — no image dependencies except where noted.
- Assets in `assets/work/` can be replaced with higher-quality project images as they become available.
- Color system defined in CSS custom properties (`:root` in styles.css) — easy to adjust.

## Contact

post@parkside.no · +47 951 43 314 · Parkside1 AS · Org. 921 253 125
