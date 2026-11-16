# OD NOWA — przykładowa strona usługi

Przykładowy landing page usługi prania kanap z dojazdem w Łodzi. Marka OD NOWA jest fikcyjna,
a formularz działa w trybie demonstracyjnym.

**Demo:** https://romanhavryliuk.github.io/od-nowa/

## Technologie

- HTML, CSS (mobile-first), JavaScript bez bibliotek
- Vite 5 + `vite-plugin-html-inject` (sekcje w osobnych plikach HTML)
- Obrazy w formacie WebP, ikony w sprite SVG

## Uruchomienie

Wymagany Node.js 18 lub nowszy.

1. Zainstaluj zależności: `npm install`.
2. Uruchom serwer deweloperski: `npm run dev` i otwórz adres z terminala (kończy się na
   `/od-nowa/`). Zmiany pojawiają się w przeglądarce od razu.
3. Zbuduj wersję produkcyjną: `npm run build`. Gotowa strona trafi do folderu `dist`. Lokalny
   podgląd builda: `npm run preview`.

## Wdrożenie

Strona jest publikowana na GitHub Pages.

- Po każdym pushu do gałęzi `main` GitHub Actions (`.github/workflows/deploy.yml`) buduje stronę
  i umieszcza ją w gałęzi `gh-pages`.
- Jednorazowo w ustawieniach repozytorium: Settings → Pages → Branch: `gh-pages`, folder
  `/ (root)`.
- Ścieżka `/od-nowa/` jest ustawiona w `vite.config.js` (`base`). Po zmianie nazwy repozytorium
  zaktualizuj ją tam oraz w adresach Open Graph w `src/index.html`.

## Struktura projektu

- `src/index.html` — szkielet strony: sekcja head (SEO, Open Graph, favicon) i dołączanie sekcji
  przez `<load src="..."/>`.
- `src/partials/` — znaczniki sekcji: `header`, `mobile-menu`, `hero`, `services`, `process`,
  `quote`, `faq`, `footer`. Główny nagłówek znajdziesz w `hero.html` („Twoja kanapa.”).
- `src/css/` — style. `styles.css` tylko importuje pozostałe pliki. Kolory są zdefiniowane w
  `:root` w pliku `base.css`. Każda sekcja ma własny plik. Punkty przełamania: 375, 768 i 1440 px
  (mobile-first), kontener elastyczny do 1440 px.
- `src/main.js` — dołącza skrypty z `src/js/`: `mobile-menu.js` (menu mobilne poniżej 768 px) i
  `demo-form.js` (komunikat formularza demonstracyjnego).
- `src/public/` — pliki kopiowane bez zmian: `favicon.svg` i `og-image.jpg` (podgląd linku
  1200×630).
- `src/img/sprite.svg` — ikony.
- `src/img/webp/hero.webp` — zdjęcie pierwszego ekranu (1536×1024), jedno dla wszystkich
  szerokości: na pełnym ekranie telefon skaluje je według wysokości, więc mniejsze wersje byłyby
  rozmyte. Dla pełnej ostrości na dużych monitorach lepiej użyć zdjęcia o szerokości od 2560 px.
  Po wymianie zdjęcia zaktualizuj opis `alt` w `hero.html`.

## Formularz

Wpisz przykładowe imię i numer, np. +48 123 456 789, i kliknij „Sprawdź formularz”. Przeglądarka
sprawdzi wymagane pola, a pod przyciskiem pojawi się komunikat o trybie demonstracyjnym. Dane nie
są nigdzie wysyłane. Do obsługi prawdziwych zapytań (np. przez Telegram) potrzebny jest backend —
token bota musi być przechowywany na serwerze, nie w kodzie strony.
