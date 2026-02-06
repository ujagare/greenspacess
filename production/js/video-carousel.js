// Video Carousel Handler
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("header-carousel");

  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: false,
      ride: false,
    });

    let slideTimer = null;

    // Function to handle slide change
    function handleSlideChange() {
      // Clear any existing timer
      if (slideTimer) {
        clearTimeout(slideTimer);
        slideTimer = null;
      }

      // Pause all videos and remove handlers
      const allVideos = carousel.querySelectorAll("video");
      allVideos.forEach((v) => {
        v.pause();
        v.currentTime = 0;
        v.onended = null;
      });

      // Get active slide
      const activeSlide = carousel.querySelector(".carousel-item.active");
      const video = activeSlide.querySelector("video");

      // Trigger text animation for active slide
      const textElement = activeSlide.querySelector(".carousel-text-animate");
      if (textElement) {
        // Remove animation class first
        textElement.classList.remove("animate-now");
        // Force reflow to restart animation
        void textElement.offsetWidth;
        // Add animation class back
        requestAnimationFrame(() => {
          textElement.classList.add("animate-now");
        });
      }

      if (video) {
        // Reset video to start and play
        video.currentTime = 0;
        video.play();

        // Move to next slide when video ends
        video.onended = function () {
          bsCarousel.next();
        };
      } else {
        // For image slides, auto advance after 5 seconds
        slideTimer = setTimeout(() => {
          bsCarousel.next();
        }, 5000);
      }
    }

    // Listen to slide change event
    carousel.addEventListener("slid.bs.carousel", handleSlideChange);

    // Start first slide
    handleSlideChange();
  }
});
