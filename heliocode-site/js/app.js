/**
 * Heliocode static site — vanilla JavaScript
 * Enquiries: FormSubmit (works on Firebase / any static host).
 * First time: confirm email at formsubmit.co when you receive the verification mail.
 */
(function () {
  var FORM_EMAIL = "helicodetech@gmail.com"; // change if needed
  var modal = document.getElementById("enquiry-modal");
  var form = document.getElementById("enquiry-form");
  var msgEl = document.getElementById("enquiry-msg");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (msgEl) {
      msgEl.textContent = "";
      msgEl.className = "modal-msg";
    }
  }

  document.querySelectorAll("[data-open-enquiry]").forEach(function (el) {
    el.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-enquiry]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var payload = {
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        message: String(fd.get("message") || ""),
        _subject: "Heliocode website enquiry",
        _template: "table",
      };

      if (msgEl) {
        msgEl.textContent = "Sending…";
        msgEl.className = "modal-msg";
      }

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(FORM_EMAIL), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) throw new Error(data.message || "Failed");
            return data;
          });
        })
        .then(function () {
          if (msgEl) {
            msgEl.textContent = "Thanks — we will get back to you shortly.";
            msgEl.className = "modal-msg ok";
          }
          form.reset();
        })
        .catch(function () {
          if (msgEl) {
            msgEl.textContent =
              "Could not send. Email us at " + FORM_EMAIL + " or use WhatsApp.";
            msgEl.className = "modal-msg err";
          }
        });
    });
  }
})();
