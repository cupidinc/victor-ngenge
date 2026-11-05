(() => {
  const canvas = document.querySelector(".starfield");
  const context = canvas?.getContext("2d", { alpha: true });
  const year = document.querySelector("#year");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) year.textContent = String(new Date().getFullYear());

  const stars = [];
  const maxStars = 90;
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let pointer = null;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(maxStars, Math.floor((width * height) / 14500));
    stars.length = 0;
    for (let index = 0; index < count; index += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.25 + 0.35,
        alpha: Math.random() * 0.42 + 0.12,
        drift: (Math.random() - 0.5) * 0.09,
        hover: 0,
      });
    }
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i += 1) {
      const star = stars[i];
      if (!reducedMotion.matches) star.x += star.drift;
      if (star.x < -5) star.x = width + 5;
      if (star.x > width + 5) star.x = -5;

      const pointerDistance = pointer ? Math.hypot(star.x - pointer.x, star.y - pointer.y) : Infinity;
      const targetHover = pointerDistance < 150 ? 1 : 0;
      star.hover = reducedMotion.matches ? targetHover : star.hover + (targetHover - star.hover) * 0.14;
      const hover = star.hover;

      for (let j = i + 1; j < stars.length; j += 1) {
        const other = stars[j];
        const dx = star.x - other.x;
        const dy = star.y - other.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 112) {
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(103, 145, 220, ${(1 - distance / 112) * 0.1})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
      }
      context.beginPath();
      context.arc(star.x, star.y, star.radius + hover * 0.65, 0, Math.PI * 2);
      context.shadowBlur = hover * 9;
      context.shadowColor = "rgba(77, 145, 255, .75)";
      const brightness = star.alpha + hover * 0.35;
      context.fillStyle = `rgba(${Math.round(210 - hover * 20)}, ${Math.round(224 + hover * 4)}, 255, ${Math.min(0.95, brightness)})`;
      context.fill();
      context.shadowBlur = 0;
    }
    if (!reducedMotion.matches && running) frame = window.requestAnimationFrame(draw);
  }

  function updatePointer(event) {
    if (event.pointerType === "touch") {
      pointer = null;
      if (reducedMotion.matches) draw();
      return;
    }
    pointer = { x: event.clientX, y: event.clientY };
    if (reducedMotion.matches) draw();
  }

  function clearPointer(event) {
    if (event.relatedTarget === null) {
      pointer = null;
      if (reducedMotion.matches) draw();
    }
  }

  function start() {
    if (running || reducedMotion.matches) return;
    running = true;
    frame = window.requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(frame);
    draw();
  }

  if (canvas && context) {
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerout", clearPointer, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });
    reducedMotion.addEventListener?.("change", () => {
      if (reducedMotion.matches) {
        pointer = null;
        stop();
      }
      else start();
    });
  }

  const projectCards = [...document.querySelectorAll(".project-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectCount = document.querySelector(".project-count");
  const projectDialog = document.querySelector(".project-dialog");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category.split(" ").includes(filter);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (projectCount) projectCount.textContent = `${String(visibleCount).padStart(2, "0")} CONCEPTS`;
    });
  });

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!projectDialog) return;
      projectDialog.querySelector("#dialog-title").textContent = card.dataset.title;
      projectDialog.querySelector("#dialog-type").textContent = card.dataset.type.toUpperCase();
      projectDialog.querySelector(".dialog-description").textContent = card.dataset.description;
      projectDialog.querySelector(".dialog-stack").textContent = card.dataset.stack;
      projectDialog.showModal();
    });
  });

  projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });

  if (canvas && context) {
    resize();
    start();
  }
})();
