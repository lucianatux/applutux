/* =================================================================
   LU TUX — SCRIPT
   1. Nav: fondo blureado al hacer scroll
   2. Menú mobile (hamburguesa)
   3. Scroll reveal con IntersectionObserver
   4. Año dinámico en el footer
   ================================================================= */

(function () {
  "use strict";

  // --- 1. Nav scroll ---
  const nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("fijo", window.scrollY > 40);
      },
      { passive: true },
    );
  }

  // --- 2. Menú mobile ---
  const ham = document.getElementById("ham");
  const mob = document.getElementById("mob");
  if (ham && mob) {
    ham.addEventListener("click", () => mob.classList.add("on"));
  }
  // expongo cerrarMenu para los onclick inline del HTML
  window.cerrarMenu = function () {
    if (mob) mob.classList.remove("on");
  };

  // --- 3. Scroll reveal ---
  const elementos = document.querySelectorAll(".sr");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // pequeño escalonado para que se vean en cascada
            setTimeout(() => entry.target.classList.add("on"), i * 60);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    elementos.forEach((el) => obs.observe(el));
  } else {
    // fallback: mostrar todo de una
    elementos.forEach((el) => el.classList.add("on"));
  }

  // --- 4. Año dinámico ---
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll(".probs .card").forEach((card) => {
    const btn = card.querySelector(".card-toggle");
    const slider = card.querySelector(".card-slider");

    btn.addEventListener("click", () => {
      card.classList.toggle("mostrar-solucion");

      if (card.classList.contains("mostrar-solucion")) {
        slider.style.transform = "translateX(-50%)";
        btn.classList.add("activa");
        btn.innerHTML = "←";
        btn.setAttribute("aria-label", "Ver problema");
      } else {
        slider.style.transform = "translateX(0)";
        btn.classList.remove("activa");
        btn.innerHTML = "→";
        btn.setAttribute("aria-label", "Ver solución");
      }
    });
  });
})();
