/**
 * Supabase Database Handler for Contact Forms
 */

// Initialize Supabase client
const SUPABASE_URL = 'https://elekqabmqgwdgljwpvov.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZWtxYWJtcWd3ZGdsandwdm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTIwNDIsImV4cCI6MjA4NTk2ODA0Mn0.TJMzoCF2hotQkUgLVkCes-49MmU5oBQLzb2zVPmz4ko';

let supabaseClient = null;

// Initialize Supabase
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized successfully');
  } else {
    console.error('❌ Supabase initialization failed - missing dependencies');
  }
} catch (error) {
  console.error('❌ Error initializing Supabase:', error);
}

/**
 * Save contact form data to Supabase
 * @param {Object} formData - Form data object
 * @returns {Promise<Object>} - Result object with success status
 */
async function saveToSupabase(formData) {
  if (!supabaseClient) {
    console.warn('⚠️ Supabase not configured. Skipping database save.');
    return { success: false, error: 'Supabase not configured' };
  }

  console.log('📤 Attempting to save data to Supabase:', formData);

  try {
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || null,
          message: formData.message || null,
          source_page: formData.source_page || 'home',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('❌ Supabase error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Data saved to Supabase successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error saving to Supabase:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Enhanced form submission with Supabase integration
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("homeContactForm");
    if (!form) return;

    const submitBtn = document.getElementById("homeSubmitBtn");
    const formMessage = document.getElementById("homeFormMessage");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const spinner = submitBtn ? submitBtn.querySelector(".spinner-border") : null;

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

      if (isValid && field.name === "phone") {
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
      if (!formMessage) return;
      formMessage.textContent = message;
      formMessage.className = `alert alert-${type}`;
      formMessage.classList.remove("d-none");
    }

    // Handle form submission with Supabase
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (formMessage) formMessage.classList.add("d-none");

      if (!validateForm()) {
        showMessage("Please fix the errors in the form before submitting.", "danger");
        return false;
      }

      if (submitBtn && btnText && spinner) {
        submitBtn.disabled = true;
        btnText.classList.add("d-none");
        spinner.classList.remove("d-none");
      }

      // Collect form data
      const formData = {
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        phone: form.querySelector('[name="phone"]').value,
        service: form.querySelector('[name="service"]')?.value || null,
        message: form.querySelector('[name="message"]')?.value || null,
        source_page: 'home'
      };

      // Save to Supabase
      const supabaseResult = await saveToSupabase(formData);
      if (supabaseResult.success) {
        console.log('✅ Form data saved to database');
      } else {
        console.error('⚠️ Failed to save to database:', supabaseResult.error);
      }

      // Create hidden iframe for email submission
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Set form target and action
      form.target = 'hidden_iframe';
      form.action = 'https://formsubmit.co/greennspacess@gmail.com';

      // Add hidden fields if not already present
      if (!form.querySelector('input[name="_captcha"]')) {
        const captchaField = document.createElement('input');
        captchaField.type = 'hidden';
        captchaField.name = '_captcha';
        captchaField.value = 'false';
        form.appendChild(captchaField);
      }

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
        if (submitBtn && btnText && spinner) {
          submitBtn.disabled = false;
          btnText.classList.remove("d-none");
          spinner.classList.add("d-none");
        }

        // Remove iframe
        setTimeout(() => iframe.remove(), 2000);
      }, 1000);

      return false;
    });
  });
})();
