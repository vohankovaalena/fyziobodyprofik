/* Údaje, které se opakují po celém webu (hlavička, patička, kontakt, JSON-LD).
   Změna tady = změna všude. */
export default {
  name: "Fyzio Body Prof.I.K",
  /* Další podoby názvu, pod kterými studio lidé hledají (JSON-LD, llms.txt). */
  alternateNames: ["Fyzio Body Profik", "FyzioBody PROFIK", "Fyzio Body Profik Příbram"],
  /* Adresa webu bez lomítka na konci. Z ní se skládají kanonické URL,
     og:image, sitemap.xml, robots.txt a llms.txt. */
  url: "https://fyziobodyprofik.cz",
  description: "Studio fyzioterapie a zdravého pohybu v Příbrami: individuální a dětská fyzioterapie, urogynekologická fyzioterapie, Dornova metoda, tejpování, masáže, maderoterapie, bodywraps a skupinová cvičení (SM systém, pilates, jóga, barre).",
  priceRange: "400–2300 Kč",

  /* Rezervační systém Reservio. Obě tlačítka („Rezervace cvičení“ a „Objednat
     terapii“) i všechny odkazy „Objednat se online“ na webu vedou sem.
     */
  reservio: {
    cviceni: "https://fyzio-body-profik-skupinove-lekce.reservio.com",
    terapie: "https://fyzio-body-profik.reservio.com/services",
    recenze: "https://fyzio-body-profik-skupinove-lekce.reservio.com/#reviews-section"
  },

  /* Kontaktní formulář se odesílá přes Web3Forms (web3forms.com, zdarma).
     Klíč se získá zadáním e-mailu na webu služby. Dokud je prázdný, formulář
     otevře předvyplněný e-mail. */
  web3formsKey: "",

  phone: "728 271 819",
  phoneHref: "+420728271819",
  email: "bodyprofik@gmail.com",
  ico: "21689024",
  address: {
    street: "Školní 144",
    city: "Příbram",
    zip: "261 01"
  },
  hours: ["PO–NE", "dle rozvrhu a objednání"],
  mapQuery: "Školní 144, 261 01 Příbram",

  social: {
    facebook: "https://www.facebook.com/Bodywrapspribram",
    instagram: "https://www.instagram.com/fyziobodyprofik/"
  }
};
