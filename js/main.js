/* =========================================================
   DigiFlex Systems — main.js
   Navigation, scroll behaviour, reveal-on-scroll, back-to-top
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when a nav link is clicked (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close on escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Sticky header state on scroll ---------- */
  var header = document.querySelector(".site-header");

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------- Active navigation link ---------- */
  (function setActiveNavLink() {
    var links = document.querySelectorAll(".nav-links a");
    var currentPage = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(function (link) {
      var linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  })();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 480) {
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("is-visible");
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Smooth scroll for on-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
})();
