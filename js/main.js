(function ($) {
  "use strict";

  // Main initialization function
  window.initMainScripts = function() {
    // Spinner
    var spinner = function () {
      setTimeout(function () {
        if ($("#spinner").length > 0) {
          $("#spinner").removeClass("show");
        }
      }, 1);
    };
    spinner();

    // Initiate the wowjs
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }

    // Sticky Navbar
    $(window).off('scroll.navbar').on('scroll.navbar', function () {
      if ($(this).scrollTop() > 300) {
        $(".sticky-top").addClass("shadow-sm").css("top", "0px");
      } else {
        $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
      }
    });

    // Back to top button
    $(window).off('scroll.backtotop').on('scroll.backtotop', function () {
      if ($(this).scrollTop() > 300) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });
    $(".back-to-top").off('click').on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    // Facts counter
    if ($.fn.counterUp) {
      $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000,
      });
    }

    // Portfolio isotope and filter
    if ($.fn.isotope && $(".portfolio-container").length) {
      var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });
      $("#portfolio-flters li").off('click').on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");
        portfolioIsotope.isotope({ filter: $(this).data("filter") });
      });
    }

    // Testimonials carousel
    if ($.fn.owlCarousel && $(".testimonial-carousel").length) {
      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>',
        ],
      });
    }

    // Stat card counter animation
    document.querySelectorAll(".count").forEach((el) => {
      let t = +el.dataset.target,
        c = 0;
      let i = setInterval(() => {
        c += Math.ceil(t / 100);
        el.innerText = c;
        if (c >= t) {
          el.innerText = t;
          clearInterval(i);
        }
      }, 20);
    });
  };

  // Run on page load
  initMainScripts();
})(jQuery);

// Hamburger Menu Toggle - Change to X when open
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  if (navbarToggler && navbarCollapse) {
    // Listen for Bootstrap collapse events
    navbarCollapse.addEventListener("show.bs.collapse", function () {
      // Change hamburger to X with white background and black cross
      navbarToggler.classList.add("active");
      navbarToggler.innerHTML =
        '<span style="font-size: 1.5rem; color: #000000; background: #ffffff; padding: 5px 10px; border-radius: 5px; display: inline-block;">✕</span>';
    });

    navbarCollapse.addEventListener("hide.bs.collapse", function () {
      // Change X back to hamburger
      navbarToggler.classList.remove("active");
      navbarToggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
    });
  }
});


