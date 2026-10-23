document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
      const menuButton = document.getElementById("menu-toggle");
      const mobileNav = document.getElementById("mobile-navigation");
      const header = document.getElementById("site-header");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const currentPage = document.body.dataset.page;
      document.querySelectorAll(".brand-mark").forEach((mark) => {
        if (!mark.querySelector("svg")) {
          mark.innerHTML = '<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M11 12v16m0-8h10m0-8v16M25 12v16m0-8 8-8m-8 8 8 8" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="9" r="2.5" fill="#7dd3fc"/></svg>';
        }
      });
      const skillIcons = {
        HTML: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 3 1.5 17L12 22l6.5-2L20 3H4Z" fill="currentColor" stroke="none"/><path d="M8 7h8l-.3 2.5H10l.2 2h5.3l-.7 6-2.8.8-2.8-.8-.2-2.4h2.3l.1.7.6.2.6-.2.2-2H9.2L8.5 9.5 8 7Z" fill="#07111f" stroke="none"/></svg>',
        CSS: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 3 1.5 17L12 22l6.5-2L20 3H4Z" fill="currentColor" stroke="none"/><path d="M8 7h8l-.3 2.5h-5l.2 2h4.6l-.7 6-2.8.8-2.8-.8-.2-2.4h2.3l.1.7.6.2.6-.2.2-2H9.2L8.5 9.5 8 7Z" fill="#07111f" stroke="none"/></svg>',
        JavaScript: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" stroke="none"/><path d="M13.2 16.8c.5.8 1 1.2 1.9 1.2.7 0 1.1-.3 1.1-.8 0-.6-.5-.8-1.4-1.2-1.3-.6-2.2-1.2-2.2-2.6 0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.4.9c-.3-.5-.6-.7-1.1-.7-.4 0-.7.3-.7.6 0 .5.3.7 1.2 1.1 1.5.7 2.4 1.2 2.7 1.6 0 1.6-1.2 2.5-3 2.5-1.6 0-2.6-.7-3.2-1.8l1.3-1ZM6 16.9c.3.5.6.9 1.2.9.5 0 .8-.2.8-1v-5.5h1.9v5.6c0 1.9-1.1 2.7-2.7 2.7-1.4 0-2.2-.7-2.7-1.7L6 16.9Z" fill="#07111f" stroke="none"/></svg>',
        Python: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.7 2c-4.8 0-4.5 2.1-4.5 2.1v2.2h4.6v.8H5.4S2 6.7 2 12s3 5.3 3 5.3h1.8v-2.4s-.1-3 3-3h5.1s2.8 0 2.8-2.8V4.8S18.1 2 11.7 2Zm-2.5 2.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" fill="#3776ab" stroke="none"/><path d="M12.3 22c4.8 0 4.5-2.1 4.5-2.1v-2.2h-4.6v-.8h6.4S22 17.3 22 12s-3-5.3-3-5.3h-1.8v2.4s.1-3-3-3H9.1S6.3 12.1 6.3 15v4.3S5.9 22 12.3 22Zm2.5-2.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" fill="#ffd343" stroke="none"/></svg>'
      };
      document.querySelectorAll(".skill-card").forEach((card) => {
        const name = card.querySelector(".skill-copy strong")?.textContent.trim();
        const icon = skillIcons[name];
        const target = card.querySelector(".skill-symbol");
        if (icon && target) target.innerHTML = icon;
      });
      const interestIcons = {
        "Pengembangan web": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16"/></svg>',
        "UI/UX": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="11" cy="7" r=".8"/><circle cx="16" cy="8.5" r=".8"/></svg>',
        "Machine learning": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a3 3 0 0 0-5.8-1A3.5 3.5 0 0 0 4 10a3.5 3.5 0 0 0 1 6.3A3.5 3.5 0 0 0 9 21c1.3 0 2.3-.7 3-1.7M12 5a3 3 0 0 1 5.8-1A3.5 3.5 0 0 1 20 10a3.5 3.5 0 0 1-1 6.3A3.5 3.5 0 0 1 15 21c-1.3 0-2.3-.7-3-1.7M12 5v14M8 9c1.2 0 2 .7 2 2m-4 3c1.3-.1 2.1-.8 2.4-2m7-3c-1.2 0-2 .7-2 2m4 3c-1.3-.1-2.1-.8-2.4-2"/></svg>'
      };
      document.querySelectorAll(".interest-stack-card").forEach((card) => {
        const name = card.querySelector(".interest-stack-copy strong")?.textContent.trim();
        const icon = interestIcons[name];
        const target = card.querySelector(".interest-stack-icon");
        if (icon && target) target.innerHTML = icon;
      });
      const desktopNav = document.querySelector(".desktop-nav");
      if (desktopNav && !desktopNav.querySelector('[data-nav="home"]')) {
        const homeLink = document.createElement("a");
        homeLink.className = "nav-link";
        homeLink.dataset.nav = "home";
        homeLink.href = "index.html";
        homeLink.textContent = "Beranda";
        desktopNav.prepend(homeLink);
      }
      document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.dataset.nav === currentPage) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        }
      });

      const setMenu = (open) => {
        mobileNav.hidden = !open;
        mobileNav.classList.remove("is-opening");

        if (open && !reducedMotion) {
          requestAnimationFrame(() => mobileNav.classList.add("is-opening"));
        }

        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
        const menuIcon = menuButton.querySelector("use");
        if (menuIcon) menuIcon.setAttribute("href", open ? "#i-close" : "#i-menu");
        else menuButton.textContent = open ? "×" : "☰";
      };

      menuButton.addEventListener("click", () => setMenu(mobileNav.hidden));
      mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !mobileNav.hidden) {
          setMenu(false);
          menuButton.focus();
        }
      });

      const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });

      const revealItems = document.querySelectorAll(".reveal");
      revealItems.forEach((item) => {
        const delay = Number(item.dataset.delay || 0);
        item.style.setProperty("--reveal-delay", `${delay}ms`);
      });

      if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
      } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
        revealItems.forEach((item) => observer.observe(item));
      }

      const footer = document.querySelector(".footer");
      if (footer) {
        footer.innerHTML = `
          <div class="container-wide footer-inner">
            <div class="footer-brand"><a class="footer-name" href="index.html">Hamzah Kholilul Azka</a><span class="footer-tagline">Frontend Developer - Jambi - Indonesia</span></div>
            <nav class="footer-nav" aria-label="Navigasi footer">
              <a href="index.html">Beranda</a><a href="profil.html">Profil</a><a href="proyek.html">Proyek</a><a href="kontak.html">Kontak</a>
            </nav>
            <p class="footer-copy">© <span id="current-year">2026</span> Hamzah - All rights reserved</p>
          </div>`;
      }
      const year = document.getElementById("current-year");
      if (year) year.textContent = new Date().getFullYear();
});
