/**
 * Locomotive Scroll - Advanced Buttery Smooth Scrolling
 */

(function () {
  "use strict";

  let scroll;

  function init() {
    // Check if Locomotive Scroll is loaded
    if (typeof LocomotiveScroll === "undefined") {
      console.error("❌ Locomotive Scroll not loaded!");
      return;
    }

    // Initialize Locomotive Scroll
    scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 1,
      class: "is-inview",
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    console.log("✅ Locomotive Scroll initialized");

    // Integrate with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== "undefined") {
      scroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.defaults({
        scroller: "[data-scroll-container]",
      });

      ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.querySelector("[data-scroll-container]").style
          .transform
          ? "transform"
          : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () => scroll.update());
      ScrollTrigger.refresh();

      console.log("✅ Locomotive Scroll + ScrollTrigger integrated");
    }

    // Update on window resize
    window.addEventListener("resize", () => {
      scroll.update();
    });

    // Expose globally
    window.locomotiveScroll = scroll;

    console.log("✅ Buttery smooth scroll ready!");
  }

  // Initialize after page load
  window.addEventListener("load", function () {
    setTimeout(init, 100);
  });

  // Cleanup function
  window.destroySmoothScroll = function () {
    if (scroll) {
      scroll.destroy();
    }
  };
})();
