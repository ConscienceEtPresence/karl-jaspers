/* Retour à la page précédente.
   Le lien a toujours un href de repli (page amont logique), donc il fonctionne
   sans JavaScript. Si l'on vient d'une autre page du site, on revient
   réellement d'où l'on vient plutôt que vers ce repli. */
(function () {
  var liens = document.querySelectorAll('.retour-lien');
  if (!liens.length) return;

  var interne = false;
  try {
    interne = !!document.referrer &&
              new URL(document.referrer).origin === window.location.origin &&
              new URL(document.referrer).pathname !== window.location.pathname &&
              window.history.length > 1;
  } catch (e) { interne = false; }

  if (!interne) return;

  Array.prototype.forEach.call(liens, function (a) {
    a.addEventListener('click', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
      ev.preventDefault();
      window.history.back();
    });
  });
})();
