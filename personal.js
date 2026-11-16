const archiveState = { photos: {}, active: null, viewer: -1 };
const archiveEscape = value => String(value).replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[character]));
const archiveUrl = path => new URL(path, document.baseURI).href;
const archivePhotoList = id => archiveState.photos[id] || [];

function archiveAlbums() {
  const tones = ['lilac', 'blue', 'green'];
  return [
    ...personalContent.trips.map((trip, index) => ({ ...trip, id:trip.id || trip.place.toLowerCase(), name:trip.place, tone:tones[index], kind:'trip' })),
    ...personalContent.interests.map(interest => ({ id:interest.name.toLowerCase(), name:interest.name, context:'', tone:interest.color, emoji:interest.emoji, kind:'interest' }))
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

function renderPersonalPage() {
  currentProject = null;
  isDeck = false;
  archiveState.active = null;
  document.body.dataset.page = 'personal';
  document.title = 'Personal — Shiyi He';
  setSiteNavigation('personal');
  const albums = archiveAlbums();
  main.innerHTML = `<div class="personal-page wrap">
    <div class="personal-intro"><h1>Personal.</h1><img class="personal-cat" src="assets/brand/shiyi-cat.svg?v=city-archive-20261116" width="80" height="80" alt="A little hand-drawn cat"></div>
    <nav class="personal-index" aria-label="On this page"><a href="personal/#trips">Trips</a><a href="personal/#interests">Interests</a></nav>
    <section class="archive-section" id="trips" aria-labelledby="trips-title"><h2 id="trips-title">Trips</h2><div class="folder-collection trip-folders">${albums.filter(album => album.kind === 'trip').map(archiveFolder).join('')}</div></section>
    <section class="archive-section" id="interests" aria-labelledby="interests-title"><h2 id="interests-title">Beyond research, I also enjoy…</h2><div class="folder-collection interest-folders">${albums.filter(album => album.kind === 'interest').map(archiveFolder).join('')}</div></section>
  </div>
  <dialog class="album-window" aria-labelledby="album-title">
    <header class="album-header"><div><h2 id="album-title"></h2><p id="album-count"></p><a class="album-conference" target="_blank" rel="noopener noreferrer" hidden></a></div><div class="album-actions"><button type="button" class="album-close" aria-label="Close album">×</button></div></header>
    <div class="album-body"><div class="album-grid"></div><div class="album-viewer" hidden><div class="viewer-toolbar"><button type="button" class="viewer-back">← Album</button><span class="viewer-count"></span></div><div class="viewer-stage"><button type="button" class="viewer-prev" aria-label="Previous photo">‹</button><img class="viewer-image" alt=""><button type="button" class="viewer-next" aria-label="Next photo">›</button></div></div></div>
    <p class="album-credit" hidden></p>
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
  if (archiveState.active) renderArchiveAlbum();
}

function updateArchiveFolders() {
  for (const album of archiveAlbums()) {
    const photos = archivePhotoList(album.id);
    const count = document.querySelector(`[data-count="${album.id}"]`);
    if (count) count.textContent = `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`;
    const cover = document.querySelector(`[data-cover="${album.id}"]`);
    if (cover) cover.innerHTML = photos[0] ? `<img src="${archiveEscape(archiveUrl(photos[0].thumb))}" alt="" loading="lazy">` : '';
    const button = document.querySelector(`[data-album="${album.id}"]`);
    if (button) button.setAttribute('aria-label', `Open ${album.name} album, ${photos.length} photos`);
  }
}

function setupArchiveDialog() {
  const dialog = document.querySelector('.album-window');
  dialog.querySelector('.album-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-back').addEventListener('click', closeArchiveViewer);
  dialog.querySelector('.viewer-prev').addEventListener('click', () => showArchivePhoto(archiveState.viewer - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => showArchivePhoto(archiveState.viewer + 1));
  dialog.addEventListener('cancel', event => {
    if (archiveState.viewer >= 0) { event.preventDefault(); closeArchiveViewer(); }
  });
  dialog.addEventListener('keydown', event => {
    if (archiveState.viewer < 0) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showArchivePhoto(archiveState.viewer - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showArchivePhoto(archiveState.viewer + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    const id = archiveState.active;
    archiveState.active = null;
    archiveState.viewer = -1;
    document.querySelector(`[data-album="${id}"]`)?.focus();
  });
}

function openArchiveAlbum(id) {
  if (!archiveAlbums().some(album => album.id === id)) return;
  archiveState.active = id;
  archiveState.viewer = -1;
  const dialog = document.querySelector('.album-window');
  renderArchiveAlbum();
  dialog.showModal();
}

function renderArchiveAlbum() {
  const album = archiveAlbums().find(item => item.id === archiveState.active);
  if (!album) return;
  const photos = archivePhotoList(album.id);
  const dialog = document.querySelector('.album-window');
  dialog.querySelector('#album-title').textContent = album.name;
  dialog.querySelector('#album-count').textContent = `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`;
  const event = dialog.querySelector('.album-conference');
  event.hidden = !album.context;
  if (album.context) { event.textContent = `${album.context} · ${album.detail}`; event.href = album.conferenceUrl; event.title = album.conferenceName; }
  const credit = dialog.querySelector('.album-credit');
  credit.hidden = !album.credit;
  if (album.credit) credit.innerHTML = `Cover: <a href="${archiveEscape(album.credit.source)}" target="_blank" rel="noopener noreferrer">${archiveEscape(album.credit.author)}</a> · <a href="${archiveEscape(album.credit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${archiveEscape(album.credit.license)}</a> · resized / translucent`;
  const grid = dialog.querySelector('.album-grid');
  grid.innerHTML = photos.length ? photos.map((photo, index) => `<article class="album-photo"><button type="button" class="photo-open" data-photo="${index}" aria-label="View ${archiveEscape(album.name)} photo ${index + 1}"><img src="${archiveEscape(archiveUrl(photo.thumb))}" alt="${archiveEscape(album.name)} photo ${index + 1}" width="${photo.width}" height="${photo.height}" loading="lazy"></button></article>`).join('') : `<div class="album-empty"><svg viewBox="0 0 48 40" aria-hidden="true"><rect x="3" y="8" width="42" height="29" rx="5"/><path d="m14 8 4-5h12l4 5"/><circle cx="24" cy="22" r="9"/></svg><p>No photos yet.</p></div>`;
  grid.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => showArchivePhoto(Number(button.dataset.photo))));
  grid.hidden = archiveState.viewer >= 0;
  dialog.querySelector('.album-viewer').hidden = archiveState.viewer < 0;
  if (archiveState.viewer >= 0) showArchivePhoto(archiveState.viewer);
}

function showArchivePhoto(index) {
  const photos = archivePhotoList(archiveState.active);
  if (!photos.length) { closeArchiveViewer(); return; }
  archiveState.viewer = (index + photos.length) % photos.length;
  const dialog = document.querySelector('.album-window');
  const photo = photos[archiveState.viewer];
  const image = dialog.querySelector('.viewer-image');
  image.src = archiveUrl(photo.src);
  image.alt = `${dialog.querySelector('#album-title').textContent} photo ${archiveState.viewer + 1}`;
  dialog.querySelector('.viewer-count').textContent = `${archiveState.viewer + 1} / ${photos.length}`;
  dialog.querySelector('.album-grid').hidden = true;
  dialog.querySelector('.album-viewer').hidden = false;
  dialog.querySelector('.viewer-prev').disabled = photos.length < 2;
  dialog.querySelector('.viewer-next').disabled = photos.length < 2;
}

function closeArchiveViewer() {
  archiveState.viewer = -1;
  const dialog = document.querySelector('.album-window');
  dialog.querySelector('.album-grid').hidden = false;
  dialog.querySelector('.album-viewer').hidden = true;
}

