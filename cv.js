(function () {
  var data = window.CV_DATA;
  if (!data) return;
  var $ = function (s) { return document.querySelector(s); };
  var all = function (s) { return document.querySelectorAll(s); };
  var set = function (s, v) { var n = $(s); if (n) n.textContent = v; };

  set('[data-headline]', data.headline);
  set('[data-subheadline]', data.subheadline);
  set('[data-summary]', data.summary);
  set('[data-name]', data.identity.name);
  set('[data-updated]', 'Mise à jour : ' + data.meta.lastUpdated);
  set('[data-footer-contact]', data.identity.location + ' · ' + data.identity.email);

  [[data.identity.location], [data.identity.email, 'mailto:' + data.identity.email]].forEach(function (entry) {
    var n = entry[1] ? document.createElement('a') : document.createElement('span');
    n.textContent = entry[0];
    if (entry[1]) n.href = entry[1];
    $('[data-contacts]').appendChild(n);
  });
  all('[data-email-link]').forEach(function (n) { n.href = 'mailto:' + data.identity.email; });

  data.lenses.forEach(function (lens, index) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = lens.label;
    b.dataset.lens = lens.id;
    b.setAttribute('aria-pressed', index ? 'false' : 'true');
    $('[data-lenses]').appendChild(b);
  });
  data.capabilities.forEach(function (cap, index) {
    var n = document.createElement('article');
    n.className = 'capability-card';
    n.dataset.capability = cap.id;
    n.innerHTML = '<span>' + String(index + 1).padStart(2, '0') + '</span><h3>' + cap.name + '</h3><p>' + cap.detail + '</p>';
    $('[data-capabilities]').appendChild(n);
  });
  data.proofs.forEach(function (proof) {
    var n = document.createElement('article');
    n.className = 'proof-card';
    n.dataset.proof = proof.id;
    n.innerHTML = '<div class="proof-scope">' + proof.scope + '</div><h3>' + proof.title + '</h3><p class="proof-result">' + proof.result + '</p><p>' + proof.contribution + '</p><div class="proof-bottom"><span>' + proof.status + '</span><a href="' + proof.href + '">Voir →</a></div>';
    $('[data-proofs]').appendChild(n);
  });
  data.experience.forEach(function (exp) {
    var n = document.createElement('article');
    n.className = 'timeline-item';
    n.innerHTML = '<div class="timeline-period">' + exp.period + '</div><div class="timeline-content"><span>' + exp.organization + '</span><h3>' + exp.role + '</h3><p>' + exp.summary + '</p>' + (exp.highlights.length ? '<ul>' + exp.highlights.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    $('[data-experience]').appendChild(n);
  });
  $('[data-education]').innerHTML = data.education.map(function (x) { return '<div class="foundation-item"><strong>' + x.degree + '</strong><span>' + x.school + ' · ' + x.year + '</span></div>'; }).join('');
  $('[data-languages]').innerHTML = data.languages.map(function (x) { return '<div class="foundation-item"><strong>' + x.name + '</strong><span>' + x.level + '</span></div>'; }).join('');

  function activate(id) {
    var lens = data.lenses.find(function (x) { return x.id === id; }) || data.lenses[0];
    set('#lens-intro', lens.intro);
    all('[data-lens]').forEach(function (n) { n.setAttribute('aria-pressed', n.dataset.lens === lens.id ? 'true' : 'false'); });
    all('[data-capability]').forEach(function (n) { n.classList.toggle('is-accented', lens.accentCapabilities.includes(n.dataset.capability)); });
    all('[data-proof]').forEach(function (n) { n.classList.toggle('is-accented', lens.accentProofs.includes(n.dataset.proof)); });
  }
  $('[data-lenses]').addEventListener('click', function (event) {
    var b = event.target.closest('[data-lens]');
    if (b) activate(b.dataset.lens);
  });
  activate(data.lenses[0].id);
})();
