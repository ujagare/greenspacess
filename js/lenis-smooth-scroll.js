/**
 * Lenis Smooth Scroll - Simple Implementation
 */

let lenis;

// Initialize Lenis BEFORE other scripts
(function initLenisEarly() {
  console.log("=== LENIS INITIALIZATION START ===");

  // Check if Lenis exists
  if (typeof Lenis === "undefined") {
    console.error("❌ LENIS NOT FOUND! Retrying...");
    setTimeout(initLenisEarly, 100);
    return;
  }

  console.log("✅ Lenis library found");

  // Create Lenis instance
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    console.log("✅ Lenis instance created");

    // Start animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    console.log("✅ Animation loop started");

    // Connect to ScrollTrigger when available
    function connectScrollTrigger() {
      if (typeof ScrollTrigger !== "undefined") {
        lenis.on("scroll", ScrollTrigger.update);
        console.log("✅ Connected to ScrollTrigger");
      } else {
        setTimeout(connectScrollTrigger, 100);
      }
    }
    connectScrollTrigger();

    // Make globally available
    window.lenis = lenis;

    console.log("=== LENIS READY! SCROLL NOW! ===");

    // Reinitialize main scripts after Lenis is ready
    setTimeout(() => {
      if (typeof window.initMainScripts === "function") {
        window.initMainScripts();
        console.log("✅ Main scripts reinitialized with Lenis");
      }
    }, 100);
  } catch (error) {
    console.error("❌ LENIS ERROR:", error);
  }
})();
