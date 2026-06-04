# Flickr Search API - Angular

Un moteur de recherche de photos exploitant l'API Flickr, développé avec Angular.

## Fonctionnalités

- **Recherche par mots-clés** via un input textuel.
- **Filtres de recherche** : 
    - Filtrage par taille de l'image (petite, moyenne, grande, etc.).
    - Filtrage par date d'upload (date minimum et date maximum).
    - Tri des résultats par divers paramètres (pertinence, date, intérêt, etc.).
    - Option de recherche NSFW (contenu pour adultes).
    - Ajout de tags supplémentaires pour affiner la recherche.
    - Filtre indiquant si la photo appartient à une galerie ou non.
- **Affichage des résultats** : 
    - Affichage des photos en liste (similaire à Google Images) ou en mode slider
(avec des flèches de navigation gauche/droite).
    - Chaque photo doit afficher une vignette et des informations de base (titre,
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
- Bootstrap (Optionnel)
- API Flickr

## À propos

Projet réalisé pour l'électif JSAngular d'EPITA.