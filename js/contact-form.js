/**
 * Contact Form Handler - No Page Reload
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".spinner-border");

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

    function validateField(field) {
      if (field.name === "_honey" || field.type === "hidden") return true;

      const value = field.value.trim();
      let isValid = true;
      let errorMessage = "";

      if (field.hasAttribute("required") && !value) {
        isValid = false;
        errorMessage = "This field is required";
      }

      if (isValid && field.hasAttribute("minlength")) {
        const minLength = parseInt(field.getAttribute("minlength"));
        if (value.length < minLength) {
          isValid = false;
          errorMessage = `Minimum ${minLength} characters required`;
        }
      }

      if (isValid && field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
      }

      if (isValid && field.id === "phone") {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMessage = "Phone number must be exactly 10 digits";
        }
      }

      if (isValid) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      } else {
        field.classList.remove("is-valid");
        field.classList.add("is-invalid");
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback && errorMessage) {
          feedback.textContent = errorMessage;
        }
      }

      return isValid;
    }

    function validateForm() {
      let isValid = true;
      inputs.forEach((input) => {
        if (input.name === "_honey" || input.type === "hidden") return;
        if (!validateField(input)) isValid = false;
      });
      return isValid;
    }

    function showToast(title, message, type) {
      const toastContainer = document.getElementById("toastContainer");
      if (!toastContainer) return;

      const toastId = "toast-" + Date.now();
      const toastHTML = `
        <div id="${toastId}" class="toast custom-toast ${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div class="toast-header">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            <strong class="me-auto">${title}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">${message}</div>
        </div>
      `;

      toastContainer.insertAdjacentHTML("beforeend", toastHTML);
      const toastElement = document.getElementById(toastId);
      const toast = new bootstrap.Toast(toastElement);
      toast.show();

      setTimeout(() => {
        toast.hide();
        setTimeout(() => toastElement.remove(), 500);
      }, 8000);
    }

    function showMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = `alert alert-${type}`;
      formMessage.classList.remove("d-none");
    }

    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      formMessage.classList.add("d-none");

      if (!validateForm()) {
        showMessage("Please fix the errors in the form before submitting.", "danger");
        return false;
      }

      submitBtn.disabled = true;
      btnText.classList.add("d-none");
      spinner.classList.remove("d-none");

      // Create hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Set form target and action
      form.target = 'hidden_iframe';
      form.action = 'https://formsubmit.co/greennspacess@gmail.com';

      // Add hidden fields
      const captchaField = document.createElement('input');
      captchaField.type = 'hidden';
      captchaField.name = '_captcha';
      captchaField.value = 'false';
      form.appendChild(captchaField);

      // Submit form
      form.submit();

      // Show toast after 1 second
      setTimeout(() => {
        showToast(
          "Success!",
          "Thank you! Your message has been sent successfully. We will contact you soon.",
          "success"
        );

        // Reset form
        form.reset();
        form.target = '';
        inputs.forEach((input) => {
          input.classList.remove("is-valid", "is-invalid");
        });

        // Reset button
        submitBtn.disabled = false;
        btnText.classList.remove("d-none");
        spinner.classList.add("d-none");

        // Remove iframe
        setTimeout(() => iframe.remove(), 2000);
      }, 1000);

      return false;
    });
  });
})();
