document.addEventListener("DOMContentLoaded", () => {
  const legalLink = document.getElementById("legalLink");
  const legalModal = document.getElementById("legalModal");
  const legalClose = document.getElementById("legalClose");

  if (legalLink && legalModal) {
    legalLink.addEventListener("click", (e) => {
      e.preventDefault();
      legalModal.classList.add("show");
    });
    legalClose.addEventListener("click", () => legalModal.classList.remove("show"));
    legalModal.addEventListener("click", (e) => {
      if (e.target === legalModal) legalModal.classList.remove("show");
    });
  }

  // ---------- Reveal panels ----------
  const panels = document.querySelectorAll(".reveal-panel");
  const navButtons = document.querySelectorAll(".nav-btn[data-panel]");

  function closeAllPanels() {
    panels.forEach((p) => {
      p.classList.remove("show");
      p.hidden = true;
    });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById("panel-" + btn.dataset.panel);
      if (!panel) return;
      const wasOpen = panel.classList.contains("show");
      closeAllPanels();
      if (!wasOpen) {
        panel.hidden = false;
        void panel.offsetWidth; // restart animation
        panel.classList.add("show");
        if (panel.id === "panel-usecases") resetCarousel();
      }
    });
  });

  // ---------- Use-cases carousel ----------
  let carouselIndex = 0;
  const carouselPanel = document.getElementById("panel-usecases");
  const nextBtn = document.getElementById("carouselNext");
  const dots = carouselPanel ? carouselPanel.querySelectorAll(".dot") : [];

  function carouselCards() {
    return carouselPanel ? carouselPanel.querySelectorAll(".carousel-card") : [];
  }

  function updateCarousel() {
    const cards = carouselCards();
    cards.forEach((c, i) => {
      c.hidden = i !== carouselIndex;
      c.classList.remove("pop");
    });
    const current = cards[carouselIndex];
    if (current) {
      void current.offsetWidth;
      current.classList.add("pop");
    }
    dots.forEach((d, i) => d.classList.toggle("active", i === carouselIndex));
  }

  function resetCarousel() {
    carouselIndex = 0;
    updateCarousel();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const cards = carouselCards();
      carouselIndex = (carouselIndex + 1) % cards.length;
      updateCarousel();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      carouselIndex = i;
      updateCarousel();
    });
  });
});
