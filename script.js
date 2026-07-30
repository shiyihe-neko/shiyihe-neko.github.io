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
        document.getElementById(trigger.dataset.openNote)?.showModal();
    });
});

document.querySelectorAll(".story-note").forEach((note) => {
    note.querySelector(".note-close")?.addEventListener("click", () => note.close());
    note.addEventListener("click", (event) => {
        if (event.target === note) note.close();
    });
});
