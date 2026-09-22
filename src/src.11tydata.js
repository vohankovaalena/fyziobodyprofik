/* Společné nastavení pro všechny stránky ve složce src/.
   Adresy mají tvar /nazev-stranky/ jako na původním webu (WordPress), aby
   zůstaly zachované odkazy z Googlu i odjinud. Stránka může adresu změnit
   vlastním `permalink` ve front matter. Odkazy uvnitř webu proto vždy
   začínají lomítkem (/assets/…, /cenik-fyzioterapie/). */
export default {
  layout: "base.njk",
  permalink: (data) =>
    data.page.fileSlug === "index" ? "/" : `/${data.page.fileSlug}/`
};
