/**
 * Secure Contact Form Handler with Client-Side Validation
 * Works with FormSubmit.co - No PHP required
 */

(function () {
  "use strict";

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".spinner-border");

    // Check if form was successfully submitted (from URL parameter)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      showMessage(
        "Thank you! Your message has been sent successfully. We will contact you soon.",
        "success",
      );
      // Remove success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this);
        }
      });
    });

    // Validate individual field
    function validateField(field) {
      // Skip hidden fields
      if (
        field.name === "_honey" ||
        field.name === "website" ||
        field.type === "hidden"
      ) {
        return true;
      }

      const value = field.value.trim();
      let isValid = true;
      let errorMessage = "";

      // Check required
      if (field.hasAttribute("required") && !value) {
        isValid = false;
        errorMessage = "This field is required";
      }

      // Check minlength
      if (isValid && field.hasAttribute("minlength")) {
        const minLength = parseInt(field.getAttribute("minlength"));
        if (value.length < minLength) {
          isValid = false;
          errorMessage = `Minimum ${minLength} characters required`;
        }
      }

      // Check maxlength
      if (isValid && field.hasAttribute("maxlength")) {
        const maxLength = parseInt(field.getAttribute("maxlength"));
        if (value.length > maxLength) {
          isValid = false;
          errorMessage = `Maximum ${maxLength} characters allowed`;
        }
      }

      // Check pattern
      if (isValid && field.hasAttribute("pattern")) {
        const pattern = new RegExp(field.getAttribute("pattern"));
        if (!pattern.test(value)) {
          isValid = false;

          // Custom error messages based on field type
          switch (field.type) {
            case "email":
              errorMessage = "Please enter a valid email address";
              break;
            case "tel":
              errorMessage = "Please enter a valid 10-digit phone number";
              break;
            default:
              errorMessage = "Invalid format";
          }
        }
      }

      // Email specific validation
      if (isValid && field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
      }

      // Phone specific validation
      if (isValid && field.id === "phone") {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMessage = "Phone number must be exactly 10 digits";
        }
      }

      // Update field state
      if (isValid) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      } else {
        field.classList.remove("is-valid");
        field.classList.add("is-invalid");

        // Update error message
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback && errorMessage) {
          feedback.textContent = errorMessage;
        }
      }

      return isValid;
    }

    // Validate entire form
    function validateForm() {
      let isValid = true;
      inputs.forEach((input) => {
        // Skip honeypot and hidden fields
        if (
          input.name === "_honey" ||
          input.name === "website" ||
          input.type === "hidden"
        ) {
          return;
        }

        if (!validateField(input)) {
          isValid = false;
        }
      });
      return isValid;
    }

    // Show message
    function showMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = `alert alert-${type}`;
      formMessage.classList.remove("d-none");

      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Auto-hide success message after 8 seconds
      if (type === "success") {
        setTimeout(() => {
          formMessage.classList.add("d-none");
        }, 8000);
      }
    }

    // Handle form submission
    form.addEventListener("submit", function (e) {
      // Hide previous messages
      formMessage.classList.add("d-none");

      // Validate form
      if (!validateForm()) {
        e.preventDefault();
        showMessage(
          "Please fix the errors in the form before submitting.",
          "danger",
        );
        return false;
      }

      // Show loading state
      submitBtn.disabled = true;
      btnText.classList.add("d-none");
      spinner.classList.remove("d-none");

      // Track form submission (Google Analytics)
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submission", {
          event_category: "Contact Form",
          event_label: "Attempt",
        });
      }

      // Track Facebook Pixel
      if (typeof fbq !== "undefined") {
        fbq("track", "Contact");
      }

      // Form will submit normally to FormSubmit.co
      return true;
    });

    // Prevent multiple rapid submissions
    let lastSubmitTime = 0;
    form.addEventListener("submit", function (e) {
      const now = Date.now();
      if (now - lastSubmitTime < 3000) {
        // 3 second cooldown
        e.preventDefault();
        showMessage("Please wait a moment before submitting again.", "warning");

        // Re-enable button
        submitBtn.disabled = false;
        btnText.classList.remove("d-none");
        spinner.classList.add("d-none");
        return false;
      }
      lastSubmitTime = now;
    });
  });
})();
