/**
 * Barba.js - Smooth Page Transitions with GSAP ScrollTrigger
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof barba === "undefined") {
      console.warn("⚠️ Barba.js not loaded");
      return;
    }

    console.log("✅ Barba.js initialized");

    barba.init({
      debug: false,
      transitions: [
        {
          name: "fade-transition",

          leave(data) {
            // Kill all ScrollTrigger instances before leaving
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            }

            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          },

          enter(data) {
            window.scrollTo(0, 0);

            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          },

          after(data) {
            reinitializeScripts();
          },
        },
      ],

      prevent: ({ el }) => {
        if (el.href && el.href.indexOf(window.location.origin) === -1)
          return true;
        if (el.target === "_blank") return true;
        if (el.hasAttribute("data-barba-prevent")) return true;
        return false;
      },
    });

    function reinitializeScripts() {
      // Restart Lenis if available
      if (typeof window.lenis !== "undefined") {
        window.lenis.start();
        window.lenis.scrollTo(0, { immediate: true });
      }

      // Refresh ScrollTrigger
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }

      // Reinitialize scroll animations
      if (typeof window.reinitializeScrollAnimations === "function") {
        window.reinitializeScrollAnimations();
      }

      // Reinitialize WOW.js
      if (typeof WOW !== "undefined") {
        new WOW().init();
      }

      // Reinitialize AOS
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }

      // Reinitialize Bootstrap components
      if (typeof bootstrap !== "undefined") {
        var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]'),
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }

      // Reinitialize video carousel
      const videoCarouselScript = document.querySelector('script[src="js/video-carousel.js"]');
      if (videoCarouselScript) {
        // Remove old script
        videoCarouselScript.remove();
        // Add new script
        const newScript = document.createElement('script');
        newScript.src = 'js/video-carousel.js';
        document.body.appendChild(newScript);
      }

      // Hide spinner
      const spinner = document.getElementById("spinner");
      if (spinner) {
        setTimeout(() => {
          spinner.classList.remove("show");
        }, 100);
      }

      console.log("✅ Scripts reinitialized");
    }

    barba.hooks.before(() => {
      const spinner = document.getElementById("spinner");
      if (spinner) spinner.classList.add("show");
    });
  });
})();
