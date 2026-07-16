/* ============================================================
   Constellation de la pensée de Jaspers
   Lit la variable globale CONSTELLATION_DATA définie par la page
   (labels FR ou EN) et construit le SVG : strates, anneau de
   l'Englobant, arêtes, étoiles-concepts, carte de lecture.
   ============================================================ */

(function () {
  const data = window.CONSTELLATION_DATA;
  const mount = document.getElementById('constellation');
  const card = document.getElementById('constellation-card');
  if (!data || !mount) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 1000, H = 660;

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  const svg = el('svg', {
    viewBox: '0 0 ' + W + ' ' + H,
    role: 'img',
    'aria-label': data.ariaLabel
  }, mount);

  /* Anneau de l'Englobant */
  el('ellipse', { class: 'c-ring', cx: 500, cy: 330, rx: 468, ry: 300 }, svg);
  const ringPath = el('path', {
    id: 'ring-label-path',
    d: 'M 90 330 A 410 262 0 0 1 910 330',
    fill: 'none'
  }, svg);
  const ringText = el('text', { class: 'c-ring-label' }, svg);
  const ringTP = el('textPath', {
    href: '#ring-label-path',
    startOffset: '50%',
    'text-anchor': 'middle'
  }, ringText);
  ringTP.textContent = data.ring;

  /* Strates (monde / existence / transcendance) */
  data.strata.forEach(function (s) {
    const attrs = { class: 'c-stratum', x: s.x, y: s.y, 'text-anchor': 'middle' };
    if (s.vertical) attrs.transform = 'rotate(-90 ' + s.x + ' ' + s.y + ')';
    const t = el('text', attrs, svg);
    t.textContent = s.label;
  });

  /* Arêtes */
  const nodeById = {};
  data.nodes.forEach(function (n) { nodeById[n.id] = n; });
  const edgeEls = [];
  data.edges.forEach(function (e) {
    const a = nodeById[e[0]], b = nodeById[e[1]];
    if (!a || !b) return;
    const line = el('line', {
      class: 'c-edge', x1: a.x, y1: a.y, x2: b.x, y2: b.y
    }, svg);
    edgeEls.push({ el: line, a: e[0], b: e[1] });
  });

  /* Étoiles */
  let activeNode = null;

  function setCard(n) {
    if (!card) return;
    if (!n) {
      card.innerHTML =
        '<div class="c-card-title">' + data.card.title + '</div>' +
        '<div class="c-card-text">' + data.card.text + '</div>';
      return;
    }
    card.innerHTML =
      '<div class="c-card-title">' + n.label + '</div>' +
      '<div class="c-card-text">' + n.tagline + '</div>' +
      '<div class="c-card-go">' + (n.href ? data.card.go : data.card.soon) + '</div>';
  }

  function lightEdges(id) {
    edgeEls.forEach(function (e) {
      e.el.classList.toggle('is-lit', id !== null && (e.a === id || e.b === id));
    });
  }

  data.nodes.forEach(function (n, i) {
    const g = el('g', {
      class: 'c-node' + (n.href ? '' : ' is-soon'),
      tabindex: 0,
      role: n.href ? 'link' : 'note',
      'aria-label': n.label + '. ' + n.tagline
    }, svg);

    el('circle', { class: 'halo', cx: n.x, cy: n.y, r: (n.r || 6) + 14 }, g);
    const core = el('circle', { class: 'core', cx: n.x, cy: n.y, r: n.r || 6 }, g);
    core.style.animationDelay = (i * 0.63) % 4.2 + 's';

    const anchor = n.anchor || 'middle';
    const dx = anchor === 'start' ? (n.r || 6) + 12 : anchor === 'end' ? -((n.r || 6) + 12) : 0;
    const dy = n.labelBelow ? (n.r || 6) + 26 : anchor === 'middle' ? -((n.r || 6) + 14) : 6;
    const label = el('text', {
      x: n.x + dx, y: n.y + dy, 'text-anchor': anchor
    }, g);
    label.textContent = n.label;

    function focus() {
      if (activeNode) activeNode.classList.remove('is-active');
      activeNode = g;
      g.classList.add('is-active');
      lightEdges(n.id);
      setCard(n);
    }

    function blur() {
      g.classList.remove('is-active');
      if (activeNode === g) activeNode = null;
      lightEdges(null);
      setCard(null);
    }

    g.addEventListener('mouseenter', focus);
    g.addEventListener('mouseleave', blur);
    g.addEventListener('focus', focus);
    g.addEventListener('blur', blur);
    g.addEventListener('click', function () {
      if (n.href) { window.location.href = n.href; } else { focus(); }
    });
    g.addEventListener('keydown', function (ev) {
      if ((ev.key === 'Enter' || ev.key === ' ') && n.href) {
        ev.preventDefault();
        window.location.href = n.href;
      }
    });
  });

  setCard(null);

  /* Sur petit écran, le SVG déborde horizontalement : on le centre au départ. */
  const wrap = mount.closest('.constellation-wrap');
  if (wrap && wrap.scrollWidth > wrap.clientWidth) {
    wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth) / 2;
  }
})();
