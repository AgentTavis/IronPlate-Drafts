# Matthews Construction, Logo Notes

## Current Logo

Two logo files were extracted from the live site, and one of them is the strongest logo asset on the entire slate.

### 1. Primary brand logo (vector master)

URL: `https://www.matthewsconstruction.com/static/images/MC.275c2236451e.svg`

**Format: SVG.** This is a clean, scalable vector mark, no quality loss at any size, no rasterization. It can be used directly in the new build as-is. This is the gold standard logo asset and most businesses on this slate don't have a vector master.

The "MC" filename suggests an "MC" monogram or wordmark. Visual inspection after download will confirm the exact composition.

### 2. 70-Year Anniversary Mark

URL: `https://www.matthewsconstruction.com/static/images/MC-70yr-logo.93dd37f15648.png`

Format: PNG. Anniversary variant celebrating 1955 to 2025 (70 years). Currently in active use on the site for the 70-year milestone marketing.

Recommended use:
- Homepage banner during the anniversary year (2025)
- Footer milestone callout
- News / press materials
- Phase out gradually post-2025 unless owner wants the heritage marker permanent

## Source

Pulled from the live matthewsconstruction.com site on May 6, 2026. Both assets are self-hosted on the brand's own infrastructure under `/static/images/`. The hash-suffixed filenames (`275c2236451e`, `93dd37f15648`) indicate a modern build pipeline (Django Wagtail or similar) that fingerprints assets for cache-busting.

The download script in this folder will save both to `04-Logos/`.

## Quality Assessment

| Asset | Quality | Notes |
|---|---|---|
| MC.svg | **Excellent** | Vector master, scales to any size, ready to use |
| MC-70yr-logo.png | **Good** | Anniversary variant, web-resolution PNG. Higher-res would be ideal for print. |

The vector SVG is a rare and valuable asset. Most businesses on this slate require a vector redraw before final build. Matthews doesn't.

## To Acquire from Andy

The logo situation is much better than usual. The primary asks are:

- **Higher-resolution version of the 70-year anniversary PNG** for print / large-format use (the web JPG is sufficient for digital but not print)
- **Light-on-dark logo variant** if the brand has one. The current SVG appears to be designed for use on white backgrounds; a white-on-red or white-on-black variant would help with hero overlays.
- **Brand guidelines document** if any exists. With 70 years of heritage, internal guidelines almost certainly exist.
- **Print-quality PNG variants** at 300 DPI for any print collateral the new build needs to support
- **Permission to slightly modify the logo color** if the brand-red palette gets minor adjustment (e.g., shifting `#CC2229` to a slightly deeper or warmer red)

## Design Notes for the New Build

The primary SVG is the workhorse:
- Use it in nav (small)
- Use it in footer (medium)
- Use it on the homepage hero alongside the 70-year anniversary mark
- Use it on the favicon (need to convert to a square ICO for older browser support; SVG favicons work in modern browsers)

The 70-year mark is the homepage banner / hero anniversary moment:
- Use it in the homepage hero overlay
- Use it in the About page header alongside the founding story
- Use it in the footer during 2025 only (phase out 2026+)

Pairing typography: Oswald for headline treatments next to the logo, Instrument Sans for body. Both already on the brand.

## Files in This Folder

(Currently empty. The download script will save:
- `MC.275c2236451e.svg` → primary logo (rename to `matthews-construction-logo.svg` after download)
- `MC-70yr-logo.93dd37f15648.png` → anniversary mark (rename to `matthews-construction-70-year.png`)

Not labeled "(new)" per the deprecated naming rule.)
