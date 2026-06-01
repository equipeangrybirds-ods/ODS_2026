const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

function openMenu() {
  sideMenu.classList.add("open");
  overlay.hidden = false;
  hamburger.setAttribute("aria-expanded", "true");
}

function closeSideMenu() {
  sideMenu.classList.remove("open");
  overlay.hidden = true;
  hamburger.setAttribute("aria-expanded", "false");
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  closeSideMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

hamburger.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
overlay.addEventListener("click", closeSideMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSideMenu();
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.dataset.page;
    if (pageId) showPage(pageId);
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector("[data-prev]");
  const nextBtn = carousel.querySelector("[data-next]");
  const dotsBox = carousel.querySelector(".carousel-dots");
  let currentIndex = 0;

  function renderDots() {
    dotsBox.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Ir para imagem ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsBox.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === currentIndex);
    });

    dotsBox.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  renderDots();
  goToSlide(0);
});
