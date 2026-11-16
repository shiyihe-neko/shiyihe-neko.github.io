const archiveState = { photos: {}, active: null, viewer: -1 };
const archiveEscape = value => String(value).replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[character]));
const archiveUrl = path => new URL(path, document.baseURI).href;
const archivePhotoList = id => archiveState.photos[id] || [];

function archiveMediaSummary(items) {
  const videos = items.filter(item => item.type === 'video').length;
  const photos = items.length - videos;
  return [photos ? `${photos} ${photos === 1 ? 'photo' : 'photos'}` : '', videos ? `${videos} ${videos === 1 ? 'video' : 'videos'}` : ''].filter(Boolean).join(' · ') || '0 photos';
}

function stopArchiveVideo() {
  const video = document.querySelector('.viewer-video');
  if (!video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.hidden = true;
}

function archiveAlbums() {
  const tones = ['lilac', 'blue', 'green'];
  return [
    ...personalContent.trips.map((trip, index) => ({ ...trip, id:trip.id || trip.place.toLowerCase(), name:trip.place, tone:tones[index], kind:'trip' })),
    ...personalContent.interests.map(interest => ({ id:interest.id || interest.name.toLowerCase(), name:interest.name, context:'', tone:interest.color, emoji:interest.emoji, kind:'interest' }))
  ];
}

function archiveFolder(album) {
  const city = album.cover ? `<img class="folder-city" src="${archiveEscape(archiveUrl(album.cover))}" alt="" loading="lazy"><span class="folder-city-tint" aria-hidden="true"></span>` : '';
  const event = album.context ? `<span class="folder-context">${archiveEscape(album.context)}</span><span class="folder-detail">${archiveEscape(album.detail)}</span>` : '';
  return `<button type="button" class="archive-folder folder-${album.tone}${album.cover ? ' folder-with-city' : ''}" data-album="${album.id}" aria-label="Open ${archiveEscape(album.name)} album">
    <span class="folder-tab" aria-hidden="true"></span><span class="folder-back" aria-hidden="true"></span>
    <span class="folder-sheet sheet-back" aria-hidden="true"></span><span class="folder-sheet sheet-front" data-cover="${album.id}" aria-hidden="true"></span>
    <span class="folder-front">${city}${album.emoji ? `<span class="folder-mark" aria-hidden="true">${album.emoji}</span>` : ''}<span class="folder-name">${archiveEscape(album.name)}</span>${event}<span class="folder-count" data-count="${album.id}">0 photos</span></span>
  </button>`;
}

function archiveTripEntry(album) {
  return `<article class="trip-entry trip-entry-${album.tone}"><h3>${archiveEscape(album.name)}</h3><a href="${archiveEscape(album.conferenceUrl)}" target="_blank" rel="noopener noreferrer" title="${archiveEscape(album.conferenceName)}">${archiveEscape(album.context)}</a><p>${archiveEscape(album.detail)}</p></article>`;
}

function joyPhotoStack(id) {
  const photos = archivePhotoList(id);
  const front = id === 'baking' ? 'christmas-cake.jpg' : 'snowboard-portrait.jpg';
  const ordered = [...photos.filter(photo => !photo.src.endsWith(front)), ...photos.filter(photo => photo.src.endsWith(front))];
  const positions = [[34,43,-12],[67,48,11],[46,48,-5],[40,52,7],[62,44,-8],[49,54,5],[34,47,-7],[66,50,12],[48,44,-5],[38,52,-11],[61,47,8]];
  return ordered.map((photo,index) => {
    let [x,y,rotation] = positions[index % positions.length];
    if (photo.src.endsWith(front)) [x,y,rotation] = [51,50,-4];
    const isDessertCover = id === 'baking' && photo.src.endsWith(front);
    const imageSrc = isDessertCover ? 'assets/albums/baking/christmas-cake-cover.webp' : photo.thumb;
    return `<span class="stack-print" style="--pile-x:${x}%;--pile-y:${y}%;--pile-rotation:${rotation}deg;--pile-layer:${index+1}"><img src="${archiveEscape(archiveUrl(imageSrc))}" alt="" width="${isDessertCover ? 284 : photo.width}" height="${isDessertCover ? 426 : photo.height}" loading="lazy"></span>`;
  }).join('');
}

function refreshJoyPiles() {
  document.querySelectorAll('[data-photo-stack]').forEach(stack => { stack.innerHTML = joyPhotoStack(stack.dataset.photoStack); });
}

function renderJoyZine() {
  return `<section class="joy-zine" id="interests" aria-labelledby="joys-title">
    <div class="joy-heading"><h2 id="joys-title">Some joys of my life</h2><p class="joy-intro">A few ways I switch off and recharge.</p></div>
    <div class="joy-spreads">
      <article class="joy-baking" aria-label="Baking"><button type="button" class="joy-photo-stack" data-photo-stack="baking" data-album="baking" aria-label="Open Baking photo album">${joyPhotoStack('baking')}</button><p>When I’m feeling burned out, I bake something pretty to share with friends.</p></article>
      <article class="joy-music joy-with-photo" aria-label="Music"><button type="button" class="joy-single-photo" data-album="jpop" aria-label="Open Music photo album"><img src="assets/albums/jpop/live-show-thumb.webp" width="1620" height="1080" alt="A live performance under purple stage lights" loading="lazy"></button><p>Always up for a concert, especially if Fujii Kaze is playing :)</p></article>
      <article class="joy-travel joy-with-photo" aria-label="Travel & Photography"><button type="button" class="joy-single-photo" data-album="travel" aria-label="Open Travel and Photography photo album"><img src="assets/albums/travel/garden-and-red-roof-thumb.webp" width="1440" height="960" alt="A red-roofed building framed by trees and a green lawn" loading="lazy"></button><p>I take way too many travel photos. They’re my favorite souvenirs</p></article>
      <article class="joy-snow" aria-label="Snowboarding"><button type="button" class="joy-photo-stack" data-photo-stack="snowboarding" data-album="snowboarding" aria-label="Open Snowboarding photo album">${joyPhotoStack('snowboarding')}</button><p>I love snowboarding. The rush of a good run and the fresh mountain air clear my head.</p></article>
    </div>
  </section>`;
}

function renderPersonalPage() {
  stopArchiveVideo();
  currentProject = null;
  isDeck = false;
  archiveState.active = null;
  document.body.dataset.page = 'personal';
  document.title = 'Personal — Shiyi He';
  setSiteNavigation('personal');
  const albums = archiveAlbums();
  const showTripPhotos = personalContent.showTripPhotos !== false;
  const coverCredits = albums.filter(album => album.credit && (album.kind !== "trip" || showTripPhotos));
  main.innerHTML = `<div class="personal-page wrap">
    <div class="personal-intro"><h1>Personal.</h1><img class="personal-cat" src="assets/brand/shiyi-cat.svg?v=city-archive-20261116" width="80" height="80" alt="A little hand-drawn cat"></div>
    <nav class="personal-index" aria-label="On this page"><a href="personal/#trips">Trips</a><a href="personal/#interests">Little joys</a></nav>
    <section class="archive-section" id="trips" aria-labelledby="trips-title"><h2 id="trips-title">Trips</h2><div class="${showTripPhotos ? "folder-collection trip-folders" : "trip-entry-grid"}">${albums.filter(album => album.kind === 'trip').map(showTripPhotos ? archiveFolder : archiveTripEntry).join('')}</div></section>
    ${renderJoyZine()}
    ${coverCredits.length ? `<details class="archive-credits"><summary>Photo credits</summary><ul>${coverCredits.map(album => `<li>${archiveEscape(album.name)}: <a href="${archiveEscape(album.credit.source)}" target="_blank" rel="noopener noreferrer">${archiveEscape(album.credit.author)}</a> · <a href="${archiveEscape(album.credit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${archiveEscape(album.credit.license)}</a>. Cropped, resized, and tinted.</li>`).join('')}</ul></details>` : ''}
  </div>
  <dialog class="album-window" aria-labelledby="album-title">
    <header class="album-header"><div><h2 id="album-title"></h2><p class="album-meta"><a class="album-conference" target="_blank" rel="noopener noreferrer" hidden></a><span id="album-count"></span></p><p id="album-description" hidden></p></div><div class="album-actions"><button type="button" class="album-close" aria-label="Close album">×</button></div></header>
    <div class="album-body"><div class="album-grid"></div><div class="album-viewer" hidden><div class="viewer-toolbar"><button type="button" class="viewer-back">← Album</button><span class="viewer-count"></span></div><div class="viewer-stage"><button type="button" class="viewer-prev" aria-label="Previous photo">‹</button><img class="viewer-image" alt=""><video class="viewer-video" controls playsinline preload="metadata" hidden aria-label="Music video"></video><button type="button" class="viewer-next" aria-label="Next photo">›</button></div></div></div>
  </dialog>`;
  setupArchiveDialog();
  main.querySelectorAll('[data-album]').forEach(button => button.addEventListener('click', () => openArchiveAlbum(button.dataset.album)));
  updateArchiveFolders();
  loadArchive();
  const target = ['trips','interests'].includes(location.hash.slice(1)) ? location.hash.slice(1) : null;
  if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
  else window.scrollTo(0, 0);
}

async function loadArchive() {
  try {
    const response = await fetch(archiveUrl('assets/albums/manifest.json'), { cache:'no-store' });
    if (!response.ok) throw new Error('Archive unavailable');
    const manifest = await response.json();
    archiveState.photos = Object.fromEntries(Object.entries(manifest.albums || {}).map(([id, album]) => [id, album.photos || []]));
  } catch { archiveState.photos = {}; }
  if (document.body.dataset.page !== 'personal') return;
  updateArchiveFolders();
  refreshJoyPiles();
  if (archiveState.active) renderArchiveAlbum();
}

function updateArchiveFolders() {
  for (const album of archiveAlbums()) {
    const photos = archivePhotoList(album.id);
    const count = document.querySelector(`[data-count="${album.id}"]`);
    if (count) count.textContent = archiveMediaSummary(photos);
    const cover = document.querySelector(`[data-cover="${album.id}"]`);
    if (cover) cover.innerHTML = photos[0] ? `<img src="${archiveEscape(archiveUrl(photos[0].thumb))}" alt="" loading="lazy">` : '';
    const button = document.querySelector(`[data-album="${album.id}"]`);
    if (button) button.setAttribute('aria-label', `Open ${album.name} album, ${archiveMediaSummary(photos)}`);
  }
}

function setupArchiveDialog() {
  const dialog = document.querySelector('.album-window');
  archiveState.gridObserver?.disconnect();
  archiveState.gridObserver = new ResizeObserver(layoutArchiveGrid);
  archiveState.gridObserver.observe(dialog.querySelector('.album-grid'));
  dialog.querySelector('.album-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-back').addEventListener('click', closeArchiveViewer);
  dialog.querySelector('.viewer-prev').addEventListener('click', () => showArchivePhoto(archiveState.viewer - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => showArchivePhoto(archiveState.viewer + 1));
  dialog.addEventListener('cancel', event => {
    if (archiveState.viewer >= 0) { event.preventDefault(); closeArchiveViewer(); }
  });
  dialog.addEventListener('keydown', event => {
    if (archiveState.viewer < 0 || event.target.closest('video')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showArchivePhoto(archiveState.viewer - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showArchivePhoto(archiveState.viewer + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    stopArchiveVideo();
    const id = archiveState.active;
    archiveState.active = null;
    archiveState.viewer = -1;
    const trigger = archiveState.trigger?.isConnected ? archiveState.trigger : document.querySelector(`[data-album="${id}"]`);
    trigger?.focus({ preventScroll: true });
  });
}

function openArchiveAlbum(id) {
  if (!archiveAlbums().some(album => album.id === id && (album.kind !== "trip" || personalContent.showTripPhotos !== false))) return;
  archiveState.trigger = document.activeElement;
  archiveState.active = id;
  archiveState.viewer = -1;
  const dialog = document.querySelector('.album-window');
  renderArchiveAlbum();
  dialog.querySelector(".album-body").scrollTop = 0;
  dialog.showModal();
  dialog.querySelector(".album-close").focus({ preventScroll: true });
  requestAnimationFrame(layoutArchiveGrid);
}

function renderArchiveAlbum() {
  const album = archiveAlbums().find(item => item.id === archiveState.active);
  if (!album) return;
  const photos = archivePhotoList(album.id);
  const dialog = document.querySelector('.album-window');
  dialog.querySelector('#album-title').textContent = album.name;
  dialog.querySelector('#album-count').textContent = archiveMediaSummary(photos);
  const description = dialog.querySelector('#album-description');
  description.textContent = album.description || '';
  description.hidden = !album.description;
  const event = dialog.querySelector('.album-conference');
  event.hidden = !album.context;
  if (album.context) { event.textContent = `${album.context} · ${album.detail}`; event.href = album.conferenceUrl; event.title = album.conferenceName; }
  const grid = dialog.querySelector('.album-grid');
  grid.innerHTML = photos.length ? photos.map((photo, index) => {
    const isVideo = photo.type === 'video';
    const label = `${isVideo ? 'Play' : 'View'} ${album.name} ${isVideo ? 'video' : 'photo'} ${index + 1}`;
    return `<article class="album-photo"><button type="button" class="photo-open" data-photo="${index}" aria-label="${archiveEscape(label)}"><img src="${archiveEscape(archiveUrl(photo.thumb))}" alt="${archiveEscape(album.name)} ${isVideo ? 'video preview' : 'photo'} ${index + 1}" width="${photo.width}" height="${photo.height}" loading="lazy">${isVideo ? '<span class="video-badge"><span aria-hidden="true">▶</span> 0:30</span>' : ''}</button></article>`;
  }).join('') : `<div class="album-empty"><svg viewBox="0 0 48 40" aria-hidden="true"><rect x="3" y="8" width="42" height="29" rx="5"/><path d="m14 8 4-5h12l4 5"/><circle cx="24" cy="22" r="9"/></svg><p>No photos yet.</p></div>`;
  grid.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => showArchivePhoto(Number(button.dataset.photo))));
  requestAnimationFrame(layoutArchiveGrid);
  grid.hidden = archiveState.viewer >= 0;
  dialog.querySelector('.album-viewer').hidden = archiveState.viewer < 0;
  if (archiveState.viewer >= 0) showArchivePhoto(archiveState.viewer);
}

// Preserve photo order and full images, while filling gaps beneath shorter photos.
function layoutArchiveGrid() {
  const grid = document.querySelector('.album-window[open] .album-grid');
  if (!grid || grid.hidden || !grid.clientWidth) return;
  for (const card of grid.querySelectorAll('.album-photo')) {
    const image = card.querySelector('img');
    const style = getComputedStyle(card);
    const frame = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
      + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const height = image.clientWidth * Number(image.getAttribute('height')) / Number(image.getAttribute('width'));
    card.style.gridRowEnd = `span ${Math.ceil(height + frame + 16)}`;
  }
}

function showArchivePhoto(index) {
  const photos = archivePhotoList(archiveState.active);
  if (!photos.length) { closeArchiveViewer(); return; }
  archiveState.viewer = (index + photos.length) % photos.length;
  const dialog = document.querySelector('.album-window');
  const photo = photos[archiveState.viewer];
  const image = dialog.querySelector('.viewer-image');
  stopArchiveVideo();
  const isVideo = photo.type === 'video';
  const video = dialog.querySelector('.viewer-video');
  image.hidden = isVideo;
  if (isVideo) {
    video.hidden = false;
    video.src = archiveUrl(photo.src);
    video.poster = archiveUrl(photo.poster || photo.thumb);
    video.setAttribute('aria-label', `${dialog.querySelector('#album-title').textContent} video ${archiveState.viewer + 1}`);
  } else {
    image.src = archiveUrl(photo.src);
    image.alt = `${dialog.querySelector('#album-title').textContent} photo ${archiveState.viewer + 1}`;
  }
  dialog.querySelector('.viewer-count').textContent = `${archiveState.viewer + 1} / ${photos.length}`;
  dialog.querySelector('.album-grid').hidden = true;
  dialog.querySelector('.album-viewer').hidden = false;
  dialog.querySelector('.viewer-prev').disabled = photos.length < 2;
  dialog.querySelector('.viewer-next').disabled = photos.length < 2;
}

function closeArchiveViewer() {
  stopArchiveVideo();
  archiveState.viewer = -1;
  const dialog = document.querySelector('.album-window');
  dialog.querySelector('.album-grid').hidden = false;
  dialog.querySelector('.album-viewer').hidden = true;
  requestAnimationFrame(layoutArchiveGrid);
}

