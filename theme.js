// Query string the app can pass:
//   lang=en|tr  theme=dark|light  app=1 (inside the app's web view: no header or language switch)
// Opened in a browser with no parameters, the page follows the device's language and light/dark setting.
(function () {
  var q = new URLSearchParams(location.search);
  var root = document.documentElement;

  var theme = q.get('theme');
  if (theme === 'dark' || theme === 'light') root.dataset.theme = theme;

  var lang = (q.get('lang') || navigator.language || 'en').slice(0, 2).toLowerCase();
  if (lang !== 'tr') lang = 'en';
  root.lang = lang;
  if (q.get('app') === '1') root.dataset.app = '1';

  function keep() {
    var p = new URLSearchParams(location.search);
    p.set('lang', root.lang);
    document.querySelectorAll('a[data-keep]').forEach(function (a) {
      a.href = a.getAttribute('href').split('?')[0] + '?' + p.toString();
    });
    return p;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Links between the pages carry the same look and language.
    keep();
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        root.lang = b.dataset.setLang;
        history.replaceState(null, '', '?' + keep().toString());
      });
    });
  });
})();
