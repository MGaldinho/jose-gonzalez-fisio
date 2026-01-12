document.addEventListener("DOMContentLoaded", () => {
  const OFFSET = 90; // altura de navbar aprox

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const y = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Cerrar menú mobile si está abierto
      const nav = document.querySelector(".navbar-collapse");
      if (nav && nav.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav);
        bsCollapse.hide();
      }
    });
  });
});
