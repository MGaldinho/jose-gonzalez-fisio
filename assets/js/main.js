document.addEventListener("DOMContentLoaded", () => {
  const OFFSET = 90; // altura de navbar aprox
  loadReviews();

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

async function loadReviews() {
  const container = document.getElementById("reviews-container");
  if (!container) return;

  try {
    const res = await fetch("assets/data/reviews.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar reviews.json");

    const reviews = await res.json();
    container.innerHTML = "";

    reviews.slice(0, 9).forEach(r => {
      container.insertAdjacentHTML("beforeend", reviewCard(r));
    });

  } catch (e) {
    // fallback silencioso, no rompe la web
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-secondary mb-0">
          Las reseñas se están actualizando. Volvé a visitarnos en unos minutos.
        </div>
      </div>
    `;
  }
}

function reviewCard({ text, name, tag }) {
  const safeText = escapeHtml(text ?? "");
  const safeName = escapeHtml(name ?? "Paciente");
  const safeTag  = escapeHtml(tag ?? "");

  return `
    <div class="col-md-4">
      <article class="card testimonial-card h-100">
        <div class="card-body">
          <p class="testimonial-text">“${safeText}”</p>
          <p class="testimonial-author mb-0">${safeName}</p>
          ${safeTag ? `<small>${safeTag}</small>` : ""}
        </div>
      </article>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}