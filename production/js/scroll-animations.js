/**
 * GSAP ScrollTrigger Animations
 * Smooth scroll animations for website elements
 */

(function () {
  "use strict";

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === "undefined") {
      console.warn("⚠️ GSAP not loaded");
      return;
    }

    if (typeof ScrollTrigger === "undefined") {
      console.warn("⚠️ ScrollTrigger not loaded");
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    console.log("✅ GSAP ScrollTrigger initialized");

    // Register ScrollToPlugin for smooth scrolling
    if (typeof ScrollToPlugin !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
      console.log("✅ GSAP ScrollToPlugin initialized");
    }

    // Smooth scroll configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // 1. Fade In animations for sections
    gsap.utils.toArray(".wow").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          // markers: true // Uncomment for debugging
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // 2. Service cards animation
    gsap.utils.toArray(".service-item").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.2)",
      });
    });

    // 3. Feature boxes animation
    gsap.utils.toArray(".top-feature .col-lg-4").forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: index === 0 ? -50 : index === 1 ? 0 : 50,
        y: index === 1 ? -30 : 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
      });
    });

    // 4. Counter animation with ScrollTrigger
    gsap.utils.toArray('[data-toggle="counter-up"]').forEach((counter) => {
      const target = parseInt(
        counter.getAttribute("data-toggle") || counter.textContent,
      );

      gsap.from(counter, {
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        onUpdate: function () {
          counter.textContent = Math.ceil(counter.textContent);
        },
      });
    });

    // 5. Project cards stagger animation
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: "power2.out",
      });
    });

    // 6. Heading animations
    gsap.utils.toArray("h1, h2, h3").forEach((heading) => {
      // Skip carousel headings
      if (heading.closest(".carousel-caption")) return;

      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });
    });

    // 7. Image parallax effect
    gsap.utils.toArray("img").forEach((img) => {
      // Skip carousel and small images
      if (img.closest(".carousel") || img.width < 200) return;

      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -30,
        ease: "none",
      });
    });

    // 8. Button hover animations (enhanced)
    gsap.utils.toArray(".button, .btn").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // 9. Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {
          className: "navbar-scrolled",
          targets: navbar,
        },
      });
    }

    // 10. Footer reveal animation
    const footer = document.querySelector(".footer");
    if (footer) {
      gsap.from(footer, {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // 11. Smooth scroll to anchor links - Handled by Lenis
    // Lenis provides better smooth scrolling for anchor links
    // See js/lenis-smooth-scroll.js for implementation

    // 12. Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    });

    // 13. Refresh ScrollTrigger after images load
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
      console.log("✅ ScrollTrigger refreshed after page load");
    });

    console.log("✅ All scroll animations initialized");
  });

  // Export function to reinitialize (for Barba.js)
  window.reinitializeScrollAnimations = function () {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
      console.log("✅ ScrollTrigger refreshed");
    }
  };
})();
