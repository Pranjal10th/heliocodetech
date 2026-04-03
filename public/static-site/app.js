/**
 * Heliocode static page — plain JavaScript
 * Enquiry form posts to the same Next.js API as the React app.
 */
(function () {
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
      var body = {
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        message: String(fd.get("message") || ""),
      };

      if (msgEl) {
        msgEl.textContent = "";
        msgEl.className = "modal-msg";
      }

      fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) throw new Error(data.error || "Request failed");
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
            msgEl.textContent = "Something went wrong. Try WhatsApp or email.";
            msgEl.className = "modal-msg err";
          }
        });
    });
  }
})();
