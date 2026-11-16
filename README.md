# Shiyi He — personal website

A static personal website with selected research projects, publications, experience, and a personal photo archive.

Published with GitHub Pages from the root of `main`. No build step is required; `.nojekyll` keeps the static files unchanged.

## Photo archive

Visitors can browse separate Baking, Snowboarding, Music, and Travel & Photography albums. The website has no upload or editing interface. Media and thumbnails live under `assets/albums/`, with entries in `assets/albums/manifest.json`. Video entries use `type: "video"` and a poster image. Playback stops when leaving or closing the viewer.

Trips currently appear as text records (`showTripPhotos: false`); the original photos and city-cover credits are retained for future use.

## Pages

- `/`: research introduction and selected projects
- `/publications/`: papers and posters
- `/experiences/`: education, internships, teaching, and service
- `/personal/`: trips and interests

Project details use hash routes such as `/#project/qualivision`.
