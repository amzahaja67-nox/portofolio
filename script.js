document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
      const menuButton = document.getElementById("menu-toggle");
      const mobileNav = document.getElementById("mobile-navigation");
      const header = document.getElementById("site-header");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const setMenu = (open) => {
        mobileNav.hidden = !open;
        mobileNav.classList.remove("is-opening");

        if (open && !reducedMotion) {
          requestAnimationFrame(() => mobileNav.classList.add("is-opening"));
        }

        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
        menuButton.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
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

      const year = document.getElementById("current-year");
      if (year) year.textContent = new Date().getFullYear();
});
