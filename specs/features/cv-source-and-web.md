# CV canonique et parcours web

**Version :** 1.0 · **Date :** 2026-07-30 · **Statut :** En cours

## Intention

Créer une source de vérité structurée pour le parcours d’Arnaud, puis en dériver une page web et un PDF recruteur. La page vise les éditeurs de SaaS métier et de configurateurs sans nommer une cible. Elle doit qualifier le profil, relier les compétences aux preuves et permettre plusieurs angles de lecture sans devenir un second portfolio.

## Exigences

- `data/cv.json` est la source canonique.
- `scripts/build-cv.mjs` génère `cv.html` depuis cette source.
- `scripts/render-cv-pdf.mjs` génère `assets/arnaud-derhan-cv.pdf` depuis la page.
- Trois angles de lecture mettent en avant des capacités et preuves différentes sans modifier les faits.
- La page reste lisible sur mobile, au clavier, sans animation obligatoire et en impression.
- Les pages existantes exposent un lien discret vers « Parcours & CV ».

## Non-objectifs

- Ne pas écrire une lettre de motivation ou une page dédiée à une entreprise.
- Ne pas revendiquer un rôle formel, une maîtrise du code ou une expérience de squad non démontrés.
- Ne pas recopier l’intégralité des études de cas.

## Critères d’acceptation

- [ ] Un seul fichier contient les faits de CV maintenus.
- [ ] Le build échoue si un champ essentiel manque.
- [ ] Les filtres changent la hiérarchie, jamais la vérité.
- [ ] Le PDF tient sur deux pages A4 maximum et reste lisible par un ATS.
- [ ] Les liens, la navigation mobile et l’impression sont vérifiés.

