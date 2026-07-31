(function () {
  var data = window.CV_DATA;
  if (!data) return;
  var $ = function (selector) { return document.querySelector(selector); };

  $('[data-name]').textContent = data.identity.name;
  $('[data-pdf-title]').textContent = data.pdf.title;
  $('[data-pdf-profile]').textContent = data.pdf.profile;
  $('[data-pdf-tools]').textContent = data.pdf.tools;
  $('[data-pdf-portfolio-label]').textContent = data.pdf.portfolioLabel;

  [
    [data.identity.location],
    [data.identity.phone, 'tel:' + data.identity.phone.replace(/[^\d+]/g, '')],
    [data.identity.email, 'mailto:' + data.identity.email]
  ].forEach(function (entry) {
    var node = entry[1] ? document.createElement('a') : document.createElement('span');
    node.textContent = entry[0];
    if (entry[1]) node.href = entry[1];
    $('[data-contacts]').appendChild(node);
  });

  var portfolio = $('[data-portfolio-link]');
  portfolio.textContent = data.identity.portfolio.replace(/^https?:\/\//, '').replace(/\/$/, '');
  portfolio.href = data.identity.portfolio;

  data.experience.forEach(function (experience) {
    var article = document.createElement('article');
    article.className = 'experience-item';

    var heading = document.createElement('div');
    heading.className = 'experience-heading';
    var title = document.createElement('div');
    var organization = document.createElement('span');
    organization.textContent = experience.organization;
    var role = document.createElement('h3');
    role.textContent = experience.role;
    title.append(organization, role);
    var period = document.createElement('time');
    period.textContent = experience.period;
    heading.append(title, period);
    article.appendChild(heading);

    if (experience.paperHighlights.length) {
      var list = document.createElement('ul');
      experience.paperHighlights.forEach(function (highlight) {
        var item = document.createElement('li');
        item.textContent = highlight;
        list.appendChild(item);
      });
      article.appendChild(list);
    } else {
      var summary = document.createElement('p');
      summary.textContent = experience.summary;
      article.appendChild(summary);
    }

    $('[data-experience]').appendChild(article);
  });

  [
    [data.pdf.domains, '[data-pdf-domains]'],
    [data.pdf.skills, '[data-pdf-skills]']
  ].forEach(function (entry) {
    entry[0].forEach(function (label) {
      var item = document.createElement('li');
      item.textContent = label;
      $(entry[1]).appendChild(item);
    });
  });

  data.education.forEach(function (education) {
    var item = document.createElement('div');
    item.className = 'sidebar-item';
    var degree = document.createElement('strong');
    degree.textContent = education.degree;
    var school = document.createElement('span');
    school.textContent = education.school + ' · ' + education.year;
    item.append(degree, school);
    $('[data-education]').appendChild(item);
  });

  data.languages.forEach(function (language) {
    var item = document.createElement('div');
    item.className = 'sidebar-item';
    var name = document.createElement('strong');
    name.textContent = language.name;
    var level = document.createElement('span');
    level.textContent = language.level;
    item.append(name, level);
    $('[data-languages]').appendChild(item);
  });

  (data.pdf.certifications || []).forEach(function (certification) {
    var item = document.createElement('div');
    item.className = 'sidebar-item certification-item';
    var name = document.createElement('strong');
    name.textContent = certification.name;
    var level = document.createElement('span');
    level.textContent = certification.level;
    item.append(name, level);
    if (certification.score) {
      var scale = document.createElement('div');
      scale.className = 'paper-score-scale';
      scale.setAttribute('aria-label', 'Score ' + certification.score + ' sur ' + certification.scaleMax);
      scale.innerHTML = '<i style="--score:' + ((certification.score / certification.scaleMax) * 100) + '%"></i><b>A1</b><b>A2</b><b>B1</b><b>B2</b><b>C1</b><b>C2</b>';
      item.appendChild(scale);
    }
    $('[data-certifications]').appendChild(item);
  });
})();
