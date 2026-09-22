# Fyzio Body Prof.I.K — web

Statický web: Eleventy 3 + Nunjucks, jeden `style.css`, jeden `main.js`,
nasazení na GitHub Pages.

```bash
npm install
npm start       # vývojový server na http://localhost:8080
npm run build   # výstup do _site/
```

## Kde co upravit

| Co | Soubor |
| --- | --- |
| Odkazy do Reservia, kontakty, sociální sítě, klíč Web3Forms | `src/_data/site.js` |
| Menu / rozcestník v patičce | `src/_data/nav.json`, `src/_data/rozcestnik.json` |
| Rozvrh lekcí (a barvy podle lektorů) | `src/_data/rozvrh.json` |
| Ceník | `src/_data/cenik.json` |
| Tým, recenze | `src/_data/tym.json`, `recenze.json` |
| Aktuality (stránka Aktuality; položky s polem `kratce` se ukážou i na úvodní stránce) | `src/_data/aktuality.json` |
| Rozbalovací karty služeb na úvodní stránce | `src/_data/sluzby.json` |
| Blog: pořadí, perexy a fotky | `src/_data/blog.json` |
| Blog: plné texty článků | `src/_includes/clanky/<slug>.njk` |
| Texty služeb | `src/fyzio-sluzby.njk`, `src/body-sluzby.njk` |
| Titulek a popisek stránky pro Google | `title` a `description` ve front matter stránky (u článků `titulek` a `popis` v `blog.json`) |
| Vyřadit stránku z indexu | `noindex: true` ve front matter (teď jen `podminky.njk`) |
| Meta tagy, kanonické URL, JSON-LD | `src/_includes/seo.njk` |
| Adresa stránky | `permalink` ve front matter (u článků pole `adresa` v `blog.json`). Adresy se shodují s adresami původního webu, aby nepřišel o platnost žádný odkaz z Googlu |
| Přesměrování duplicitních adres (`/cenik/`, `/blog/`) | `src/_data/presmerovani.json` |
| `sitemap.xml`, `robots.txt`, `llms.txt` (pro AI) | `src/sitemap.njk`, `src/robots.njk`, `src/llms.njk` — generují se z dat automaticky |

## Odkazy uvnitř webu

V šablonách se píšou od kořene a projdou filtrem `cesta`:
`href="{{ "/cenik-fyzioterapie/" | cesta }}"`. Filtr (v `eleventy.config.mjs`)
z nich při sestavení udělá adresu relativní k dané stránce, takže web funguje
ve vlastní doméně, v podsložce na `github.io` i po otevření z disku. Nový odkaz
nebo obrázek proto vždy provlékni filtrem `cesta`.

Absolutní adresy (`https://fyziobodyprofik.cz/…`) zůstávají jen tam, kde je
vyžadují vyhledávače: kanonická adresa, Open Graph, JSON-LD v `seo.njk`,
dále `sitemap.xml`, `robots.txt` a `llms.txt`. Doména se nastavuje jedním
polem `url` v `src/_data/site.js`.

Složka `img/` obsahuje screenshoty původního webu (podklad). Fotky v
`src/assets/img/` jsou z nich vyřezané — až budou k dispozici originály, stačí
nahradit soubory se stejným jménem (`.jpg` + `.webp`) a přegenerovat
`src/_data/img.json` s rozměry.
