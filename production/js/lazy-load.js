// Lazy Loading for Images
document.addEventListener("DOMContentLoaded", function () {
  // Get all images except those in carousel (first slide should load immediately)
  const images = document.querySelectorAll("img:not(.no-lazy)");

  // Add loading="lazy" to all images
  images.forEach((img) => {
    // Skip if already has loading attribute
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });

  // For carousel images, only lazy load non-active slides
  const carouselItems = document.querySelectorAll(
    ".carousel-item:not(.active) img",
  );
  carouselItems.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
});
