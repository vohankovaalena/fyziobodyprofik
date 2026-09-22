/* Společné nastavení pro všechny stránky ve složce src/.
   Adresy mají tvar /nazev-stranky/ a shodují se s adresami původního webu,
   aby zůstaly funkční odkazy z Googlu i odjinud. Stránka může adresu změnit
   vlastním `permalink` ve front matter. Odkazy uvnitř webu se píšou od kořene
   (/assets/…, /cenik-fyzioterapie/) a filtr `cesta` z nich při sestavení
   udělá relativní adresu — viz eleventy.config.mjs. */
export default {
  layout: "base.njk",
  permalink: (data) =>
    data.page.fileSlug === "index" ? "/" : `/${data.page.fileSlug}/`
};
