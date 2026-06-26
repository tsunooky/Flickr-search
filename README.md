# Flickr Search API - Angular

Un moteur de recherche de photos exploitant l'API Flickr, développé avec Angular.

## Installation et Lancement

Pour exécuter le projet localement depuis la racine du projet :

```bash
cd app && npm install && ng serve
```

Puis ouvrez votre navigateur sur [http://localhost:4200/](http://localhost:4200/).

## Clé API Flickr

Si la clé API Flickr actuelle a expiré, vous pouvez la mettre à jour directement dans le code :

- Ouvrez le fichier flickr.service.ts : Flickr-search/app/src/app/services/flickr.service.ts
- À la ligne **21**, mettez à jour la valeur de `API_KEY` :
  ```typescript
  private readonly API_KEY = 'votre_nouvelle_cle_api';
  ```

## Fonctionnalités

- **Recherche par mots-clés** via un input textuel.
- **Filtres de recherche** :
  - Filtrage par taille de l'image (petite, moyenne, grande, etc.).
  - Filtrage par date d'upload (date minimum et date maximum).
  - Tri des résultats par divers paramètres (pertinence, date, intérêt, etc.).
  - Option de recherche NSFW (contenu pour adultes).
  - Ajout de tags supplémentaires pour affiner la recherche.
  - Filtre indiquant si la photo appartient à une galerie ou non.
- **Affichage des résultats** : - Affichage des photos en liste (similaire à Google Images) ou en mode slider
  (avec des flèches de navigation gauche/droite). - Chaque photo doit afficher une vignette et des informations de base (titre,
  auteur, date de publication).
- **Vue détaillée** : Au clic sur une image, ouverture d'une modale contenant :
  - Lorsqu'on clique sur une photo, afficher une fenêtre avec :
    - Le nom de l'auteur.
    - Les autres photos de l'auteur.
    - Les commentaires associés à la photo.
    - La position géographique de la prise de vue (si disponible).
    - Tout autre élément pertinent récupérable via l'API Flickr.

## Stack Technique

- Angular
- HTML / CSS
- Bootstrap
- API Flickr

## À propos

Projet réalisé pour l'électif JSAngular d'EPITA.
