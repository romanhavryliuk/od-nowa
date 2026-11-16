import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

// Сайт живе на https://romanhavryliuk.github.io/od-nowa/, тому всі шляхи
// мають префікс з назвою репозиторію. Base тут, а не в скрипті build,
// щоб dev, build і preview працювали з однаковими шляхами
const REPOSITORY_BASE = '/od-nowa/';

export default defineConfig({
  root: 'src',
  base: REPOSITORY_BASE,
  build: {
    rollupOptions: {
      input: glob.sync('./src/*.html'),
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  // SortCss — це PostCSS-плагін, тому він стоїть тут, а не в plugins Vite:
  // там Vite його мовчки ігнорує
  css: {
    postcss: {
      plugins: [
        SortCss({
          sort: 'mobile-first',
        }),
      ],
    },
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
});
