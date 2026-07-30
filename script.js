const navLinks = [...document.querySelectorAll(".nav-menu a")];
const sections = [...document.querySelectorAll("main .view")];
const viewName = document.querySelector(".view-name");
const menu = document.querySelector(".nav-menu");
const menuToggle = document.querySelector(".menu-toggle");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

menuToggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
        viewName.textContent = entry.target.dataset.title || id.charAt(0).toUpperCase() + id.slice(1);
        document.title = `${viewName.textContent} — Shiyi He`;
    });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => observer.observe(section));

document.querySelectorAll("[data-open-note]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const note = document.getElementById(trigger.dataset.openNote);
        note?.showModal();
        window.setTimeout(() => {
            initializeTravelMap();
            travelMap?.invalidateSize();
        }, 80);
    });
});

document.querySelectorAll(".story-note").forEach((note) => {
    note.querySelector(".note-close")?.addEventListener("click", () => note.close());
    note.addEventListener("click", (event) => {
        if (event.target === note) note.close();
    });
});

let travelMap;
const travelPlaces = [
    { id: "kyoto", label: "Kyoto", lat: 35.0116, lng: 135.7681 },
    { id: "tokyo", label: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { id: "nara", label: "Nara", lat: 34.6851, lng: 135.8048 }
];

function locatePlace(place) {
    if (!place) return;
    travelMap?.flyTo([place.lat, place.lng], 10, { duration: .75 });
    document.querySelectorAll("[data-place]").forEach((button) => {
        button.classList.toggle("active", button.dataset.place === place.id);
    });
    const story = document.querySelector(`[data-place-story="${place.id}"]`);
    story?.scrollIntoView({ behavior: "smooth", block: "start" });
    story?.classList.remove("is-located");
    window.setTimeout(() => story?.classList.add("is-located"), 450);
}

function initializeTravelMap() {
    if (travelMap || !window.L) return;
    travelMap = L.map("travel-map", { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(travelMap);
    const bounds = [];
    travelPlaces.forEach((place) => {
        const marker = L.marker([place.lat, place.lng], {
            icon: L.divIcon({ className: "", html: '<div class="travel-marker"></div>', iconSize: [17, 17], iconAnchor: [8, 8] })
        }).addTo(travelMap);
        marker.bindTooltip(place.label, { direction: "top", offset: [0, -7] });
        marker.on("click", () => locatePlace(place));
        bounds.push([place.lat, place.lng]);
    });
    travelMap.fitBounds(bounds, { padding: [42, 42] });
}

document.querySelectorAll("[data-place]").forEach((button) => {
    button.addEventListener("click", () => {
        locatePlace(travelPlaces.find((place) => place.id === button.dataset.place));
    });
});
