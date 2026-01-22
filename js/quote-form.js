/**
 * Simple Quote Form Handler (Home Page)
 * No validation - let browser and FormSubmit handle it
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const quoteForm = document.getElementById("quoteForm");
    if (!quoteForm) {
      console.log("Quote form not found");
      return;
    }

    console.log("Quote form handler loaded");

    const submitBtn = document.getElementById("quoteSubmitBtn");
    const formMessage = document.getElementById("quoteFormMessage");

    // Check if form was successfully submitted (from URL parameter)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      if (formMessage) {
        formMessage.textContent =
          "Thank you! Your quote request has been sent successfully. We will contact you soon.";
        formMessage.className = "alert alert-success";
        formMessage.classList.remove("d-none");
        // Remove success parameter from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        // Scroll to form
        quoteForm.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Simple form submission handler
    quoteForm.addEventListener("submit", function (e) {
      console.log("Quote form submitting...");

      // Show loading state
      if (submitBtn) {
        const btnText = submitBtn.querySelector(".btn-text");
        const spinner = submitBtn.querySelector(".spinner-border");
        if (btnText && spinner) {
          submitBtn.disabled = true;
          btnText.classList.add("d-none");
          spinner.classList.remove("d-none");
        }
      }

      // Track form submission (Google Analytics)
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submission", {
          event_category: "Quote Form",
          event_label: "Attempt",
        });
      }

      // Track Facebook Pixel
      if (typeof fbq !== "undefined") {
        fbq("track", "Lead");
      }

      // Let form submit normally - don't prevent default
      return true;
    });
  });
})();
