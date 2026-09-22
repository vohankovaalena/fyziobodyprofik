export default function (eleventyConfig) {
  /* Statické soubory projdou beze změny: assets/css, assets/js, assets/img,
     assets/sil a favicon. Cesty ve stylopisu i v HTML tak zůstávají platné. */
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  /* Při úpravě stylů nebo skriptu se prohlížeč obnoví i bez přestavby. */
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  /* Filtr `cesta`: z adresy psané od kořene ("/cenik-fyzioterapie/",
     "/assets/css/style.css") udělá adresu relativní k právě sestavované
     stránce. Web pak funguje ve vlastní doméně i v podsložce (náhled na
     GitHub Pages) a stejně tak po otevření souboru z disku.

     Použití v šabloně: href="{{ "/aktuality/" | cesta }}"
     Na /             → "aktuality/"
     Na /kontakt.../  → "../aktuality/"

     Hodnoty, které od kořene nezačínají (https://…, mailto:, tel:, #kotva),
     filtr vrací beze změny — projdou jím tedy bezpečně i odkazy z dat. */
  eleventyConfig.addFilter("cesta", function (adresa) {
    if (typeof adresa !== "string" || !adresa.startsWith("/")) return adresa;

    /* Adresa stránky končí lomítkem (/cenik/), u souboru (/robots.txt)
       se poslední část odřízne. Počet zbylých částí = počet úrovní nahoru. */
    const odkud = (this.page && this.page.url) || "/";
    const slozka = odkud.endsWith("/") ? odkud : odkud.replace(/[^/]*$/, "");
    const nahoru = "../".repeat(slozka.split("/").filter(Boolean).length);

    return (nahoru + adresa.slice(1)) || "./";
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
