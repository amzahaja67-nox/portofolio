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
