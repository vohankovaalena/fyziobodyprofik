/* =========================================================================
   Fyzio Body Prof.I.K — chování webu
   Prvky se hledají přes data-* atributy, ne přes třídy. Třídy patří designu.
   ========================================================================= */

/* -------------------------------------------------------------------------
   NASTAVENÍ
   ------------------------------------------------------------------------- */
const SITE = {
  /* Formulář se odesílá přes Web3Forms. Přístupový klíč se vyplňuje
     v src/_data/site.js (web3formsKey). Bez klíče formulář otevře
     předvyplněný e-mail. */
  formEndpoint: "https://api.web3forms.com/submit",
  /* E-mail pro záložní odeslání formuláře. */
  email: "bodyprofik@gmail.com"
};

/* ------------------------------------------------------------ Mobilní menu */
(function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#hlavni-menu");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.dataset.open = String(open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  const mq = window.matchMedia("(min-width: 62rem)");
  mq.addEventListener("change", () => setOpen(false));
})();

/* ------------------------------------------------- Podmenu „Služby“ */
(function initSubnav() {
  const items = document.querySelectorAll("[data-subnav]");
  if (!items.length) return;

  const close = (item) => {
    item.dataset.open = "false";
    item.querySelector("[data-subnav-toggle]").setAttribute("aria-expanded", "false");
  };

  items.forEach((item) => {
    const button = item.querySelector("[data-subnav-toggle]");
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      item.dataset.open = String(open);
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && item.dataset.open === "true") {
        close(item);
        button.focus();
        e.stopPropagation();
      }
    });
  });

  document.addEventListener("click", (e) => {
    items.forEach((item) => { if (!item.contains(e.target)) close(item); });
  });
})();

/* ------------------------------------------------------------ Aktuální rok */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* ------------------------------------------------------ Slider aktualit */
/* Bez JavaScriptu se zobrazí všechny aktuality pod sebou. Aktuality se samy
   střídají po 5 s; při najetí myší nebo fokusu uvnitř slideru se střídání zastaví. */
(function initSliders() {
  const INTERVAL = 5000;
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const slides = [...slider.querySelectorAll("[data-slide]")];
    if (slides.length < 2) return;

    let index = 0;
    let timer = null;
    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => { if (n === index) s.dataset.active = ""; else delete s.dataset.active; });
    };
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { stop(); timer = setInterval(() => show(index + 1), INTERVAL); };

    slider.dataset.sliderReady = "";
    slider.querySelectorAll("[data-slider-prev], [data-slider-next]").forEach((b) => { b.hidden = false; });
    slider.querySelector("[data-slider-prev]").addEventListener("click", () => show(index - 1));
    slider.querySelector("[data-slider-next]").addEventListener("click", () => show(index + 1));
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", (e) => { if (!slider.contains(e.relatedTarget)) start(); });
    show(0);
    start();
  });
})();

/* ------------------------------------------------ Mapa až po souhlasu */
/* Google Maps se načtou až po kliknutí na „Souhlasím“. Souhlas si prohlížeč
   pamatuje, takže se další mapy na webu načtou rovnou. */
(function initMaps() {
  const maps = document.querySelectorAll("[data-map]");
  if (!maps.length) return;

  const KEY = "fbp-map-consent";
  const load = (box) => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(box.dataset.mapQuery)}&output=embed`;
    iframe.title = "Mapa – kde nás najdete";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    box.replaceChildren(iframe);
  };
  const loadAll = () => maps.forEach(load);

  let agreed = false;
  try { agreed = localStorage.getItem(KEY) === "1"; } catch (e) { /* úložiště nedostupné */ }
  if (agreed) { loadAll(); return; }

  maps.forEach((box) => {
    const button = box.querySelector("[data-map-consent]");
    if (!button) return;
    button.addEventListener("click", () => {
      try { localStorage.setItem(KEY, "1"); } catch (e) { /* úložiště nedostupné */ }
      loadAll();
    });
  });
})();

/* ------------------------------------------------------------- Formuláře */
document.querySelectorAll("form[data-form]").forEach((form) => {
  const status = form.querySelector(".form__status");

  const setError = (field, message) => {
    field.dataset.invalid = "true";
    const slot = field.querySelector(".field__error");
    if (slot) slot.textContent = message;
    const input = field.querySelector("input, textarea, select");
    if (input) input.setAttribute("aria-invalid", "true");
  };

  const clearError = (field) => {
    delete field.dataset.invalid;
    const slot = field.querySelector(".field__error");
    if (slot) slot.textContent = "";
    const input = field.querySelector("input, textarea, select");
    if (input) input.removeAttribute("aria-invalid");
  };

  const validate = () => {
    let firstBad = null;
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, textarea, select");
      if (!input) return;
      clearError(field);
      if (input.required && !input.value.trim()) {
        setError(field, "Tuhle položku prosím vyplňte.");
        firstBad = firstBad || input;
      } else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) {
        setError(field, "Zkontrolujte prosím tvar e-mailu.");
        firstBad = firstBad || input;
      }
    });
    const consent = form.querySelector(".consent input[required]");
    if (consent && !consent.checked) {
      firstBad = firstBad || consent;
      if (status) {
        status.dataset.state = "error";
        status.textContent = "Bez souhlasu se zpracováním údajů vám bohužel nemůžeme odpovědět.";
      }
    }
    return firstBad;
  };

  const mailtoFallback = () => {
    const data = new FormData(form);
    const lines = [];
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, textarea, select");
      const label = field.querySelector("label");
      if (input && label && input.value.trim()) {
        lines.push(`${label.textContent.replace("*", "").trim()}: ${input.value.trim()}`);
      }
    });
    const subject = data.get("subject") || "Zpráva z webu";
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    if (status) {
      status.dataset.state = "ok";
      status.textContent = "Otevřeli jsme vám předvyplněný e-mail. Stačí ho odeslat a ozveme se vám.";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) { status.dataset.state = ""; status.textContent = ""; }

    const bad = validate();
    if (bad) { bad.focus(); return; }

    const key = form.querySelector("[name='access_key']");
    if (!SITE.formEndpoint || !key || !key.value) { mailtoFallback(); return; }

    const button = form.querySelector("button[type='submit']");
    const original = button ? button.textContent : "";
    if (button) { button.disabled = true; button.textContent = "Odesílám…"; }

    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (status) {
        status.dataset.state = "ok";
        status.textContent = "Děkujeme za zprávu! Ozveme se vám co nejdříve.";
      }
    } catch (err) {
      if (status) {
        status.dataset.state = "error";
        status.textContent = `Odeslání se nepovedlo. Napište nám prosím přímo na ${SITE.email}.`;
      }
    } finally {
      if (button) { button.disabled = false; button.textContent = original; }
    }
  });

  form.querySelectorAll(".field input, .field textarea, .field select").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field && field.dataset.invalid) clearError(field);
    });
  });
});
