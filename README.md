# Karl Jaspers — site en construction (LOCAL)

Site statique bilingue FR/EN dédié à Karl Jaspers : sa vie, ses concepts,
sa philosophie de l'existence, expliqués de façon fidèle et accessible.

**Statut : chantier local. Pas encore de dépôt GitHub, pas de Firebase, pas de domaine.**
Destination prévue : compte GitHub `ConscienceEtPresence` (monde spirituel).
Le nom définitif du site n'est pas encore choisi (« Karl Jaspers » = titre provisoire).

## Structure

- `index.html` — accueil FR : constellation interactive de la pensée de Jaspers
- `en/index.html` — accueil EN (miroir)
- `concepts/` — une page par concept (gabarit en 5 temps)
- `assets/css/jaspers.css` — charte : famille visuelle ConscienceEtPresence
  (parchemin, encre nuit, or) + ciel nocturne pour la constellation
- `assets/js/constellation.js` — moteur de la constellation (SVG généré,
  données par page dans la variable globale `CONSTELLATION_DATA`)

## Gabarit d'une page concept (5 temps)

1. En une phrase — l'essentiel sans jargon
2. L'expérience — partir d'un vécu concret
3. La pensée — l'approfondissement fidèle
4. En résonance — ce que ça change dans une vie
5. Dans ses mots — citations courtes et sourcées + concepts voisins

## Règles

- Citations : courtes et sourcées uniquement. Jamais de reproduction longue
  des traductions sous droits (Hersch, trad. FR/EN). Tout le reste : rédaction originale.
- Bilingue : structure miroir `en/`, contenus rédigés nativement dans chaque langue.
- Sources de travail : ~/Documents/karl jaspers (17 ouvrages PDF/EPUB).
