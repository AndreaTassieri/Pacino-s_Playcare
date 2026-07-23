/**
 * Pacino's Playcare — Contact Page JavaScript
 * Handles: form validation, submission (mailto), FAQ accordion
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     FAQ Accordion
  ---------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-item__question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        var q = i.querySelector('.faq-item__question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------
     Contact Form Validation & Submission
  ---------------------------------------------------------- */
  var form       = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');

  if (!form) return;

  function showError(field, message) {
    field.classList.add('error');
    var errEl = field.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearError(field) {
    field.classList.remove('error');
    var errEl = field.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  // Live validation: clear error on input
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (field) {
    field.addEventListener('input', function () { clearError(field); });
    field.addEventListener('change', function () { clearError(field); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;

    // Required fields
    var requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      clearError(field);
      if (!field.value.trim()) {
        showError(field, 'This field is required.');
        valid = false;
      }
    });

    // Email format
    var emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address.');
        valid = false;
      }
    }

    // Date range: end must be >= start
    var startDate = form.querySelector('#stay-start');
    var endDate   = form.querySelector('#stay-end');
    if (startDate && endDate && startDate.value && endDate.value) {
      if (new Date(endDate.value) < new Date(startDate.value)) {
        showError(endDate, 'End date must be on or after the start date.');
        valid = false;
      }
    }

    // Privacy consent
    var consent = form.querySelector('#consent');
    if (consent && !consent.checked) {
      var consentGroup = consent.closest('.form-group') || consent.parentElement;
      var errEl = consentGroup.querySelector('.form-error-msg');
      if (errEl) {
        errEl.textContent = 'You must agree to our privacy policy to continue.';
        errEl.classList.add('visible');
      }
      valid = false;
    }

    if (!valid) {
      // Scroll to first error
      var firstError = form.querySelector('.error, .form-error-msg.visible');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Build mailto link
    var name      = form.querySelector('#owner-name').value.trim();
    var email     = form.querySelector('#owner-email').value.trim();
    var phone     = form.querySelector('#owner-phone') ? form.querySelector('#owner-phone').value.trim() : '';
    var dogInfo   = form.querySelector('#dog-info').value.trim();
    var stayStart = startDate ? startDate.value : '';
    var stayEnd   = endDate ? endDate.value : '';
    var stayType  = (form.querySelector('input[name="stay-type"]:checked') || {}).value || '';
    var requests  = form.querySelector('#special-requests').value.trim();

    var subject = encodeURIComponent('Booking Enquiry – ' + name);
    var body = encodeURIComponent(
      'Hi AJ,\n\n' +
      'I would like to enquire about a stay for my dog.\n\n' +
      '--- Owner Details ---\n' +
      'Name:    ' + name + '\n' +
      'Email:   ' + email + '\n' +
      (phone ? 'Phone:   ' + phone + '\n' : '') +
      '\n--- Dog Details ---\n' +
      dogInfo + '\n' +
      '\n--- Stay Details ---\n' +
      'From:     ' + stayStart + '\n' +
      'To:       ' + stayEnd + '\n' +
      'Type:     ' + (stayType || 'Not specified') + '\n' +
      '\n--- Special Requests ---\n' +
      (requests || 'None') + '\n\n' +
      'Please send me a tailored quote.\n\n' +
      'Many thanks,\n' + name
    );

    var mailtoLink = 'mailto:hello@pacinosplaycare.co.uk?subject=' + subject + '&body=' + body;
    window.location.href = mailtoLink;

    // Show success message after slight delay (allow mailto to fire)
    setTimeout(function () {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  });

  /* ----------------------------------------------------------
     Date inputs: set min date to today
  ---------------------------------------------------------- */
  var today = new Date().toISOString().split('T')[0];
  var startDateEl = document.getElementById('stay-start');
  var endDateEl   = document.getElementById('stay-end');

  if (startDateEl) {
    startDateEl.setAttribute('min', today);
    startDateEl.addEventListener('change', function () {
      if (endDateEl && endDateEl.value && endDateEl.value < startDateEl.value) {
        endDateEl.value = startDateEl.value;
      }
      if (endDateEl) endDateEl.setAttribute('min', startDateEl.value || today);
    });
  }

  if (endDateEl) {
    endDateEl.setAttribute('min', today);
  }
})();
