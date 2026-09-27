/* =========================================================
   DigiFlex Systems — contact.js
   Client-side validation for the enquiry form.

   NOTE FOR FUTURE BACKEND INTEGRATION:
   This form currently performs validation only and simulates
   a submission. To connect a real backend or email service
   (e.g. Formspree, EmailJS, a custom API endpoint), replace
   the contents of the `submitEnquiry()` function below with
   an actual fetch()/XHR request. The rest of the validation
   logic can remain unchanged.
   ========================================================= */

(function () {
  "use strict";

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var formMessage = document.getElementById("form-message");

  var fields = {
    fullName: {
      el: document.getElementById("fullName"),
      validate: function (v) {
        return v.trim().length >= 2 ? "" : "Please enter your full name.";
      }
    },
    company: {
      el: document.getElementById("company"),
      validate: function () {
        return "";
      } // optional field
    },
    phone: {
      el: document.getElementById("phone"),
      validate: function (v) {
        var digits = v.replace(/[^0-9]/g, "");
        if (v.trim() === "") return "Please enter a phone number.";
        if (digits.length < 7) return "Please enter a valid phone number.";
        return "";
      }
    },
    email: {
      el: document.getElementById("email"),
      validate: function (v) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (v.trim() === "") return "Please enter your email address.";
        if (!pattern.test(v.trim())) return "Please enter a valid email address.";
        return "";
      }
    },
    service: {
      el: document.getElementById("service"),
      validate: function (v) {
        return v ? "" : "Please select a service.";
      }
    },
    message: {
      el: document.getElementById("message"),
      validate: function (v) {
        return v.trim().length >= 10 ? "" : "Please tell us a little more about your requirements.";
      }
    }
  };

  function showFieldError(key, errorText) {
    var field = fields[key];
    var wrapper = field.el.closest(".field");
    var errorEl = wrapper.querySelector(".field-error");

    if (errorText) {
      wrapper.classList.add("has-error");
      if (errorEl) errorEl.textContent = errorText;
      field.el.setAttribute("aria-invalid", "true");
    } else {
      wrapper.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
      field.el.removeAttribute("aria-invalid");
    }
  }

  function validateField(key) {
    var field = fields[key];
    var error = field.validate(field.el.value);
    showFieldError(key, error);
    return error === "";
  }

  function validateAll() {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) valid = false;
    });
    return valid;
  }

  // Live validation on blur
  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener("blur", function () {
      validateField(key);
    });
  });

  function setFormMessage(type, text) {
    formMessage.textContent = text;
    formMessage.classList.remove("is-success", "is-error");
    formMessage.classList.add(type === "success" ? "is-success" : "is-error");
  }

  function clearFormMessage() {
    formMessage.textContent = "";
    formMessage.classList.remove("is-success", "is-error");
  }

  // Placeholder submission handler — swap for a real API call later.
  function submitEnquiry(data) {
    return new Promise(function (resolve) {
      window.setTimeout(function () {
        resolve({ ok: true });
      }, 700);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormMessage();

    if (!validateAll()) {
      setFormMessage("error", "Please correct the highlighted fields before sending your enquiry.");
      var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    var data = {
      fullName: fields.fullName.el.value.trim(),
      company: fields.company.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      email: fields.email.el.value.trim(),
      service: fields.service.el.value,
      message: fields.message.el.value.trim()
    };

    submitEnquiry(data).then(function (result) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;

      if (result.ok) {
        setFormMessage(
          "success",
          "Thank you, " + data.fullName.split(" ")[0] + ". Your enquiry has been received and our technical team will get back to you shortly."
        );
        form.reset();
        Object.keys(fields).forEach(function (key) {
          showFieldError(key, "");
        });
        formMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setFormMessage("error", "Something went wrong while sending your enquiry. Please try again or contact us directly.");
      }
    });
  });
})();
