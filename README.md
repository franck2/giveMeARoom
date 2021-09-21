# Test technique

## Installation

Pour fonctionner le projet nécéssite node 16.
Cependant pour foncitonner, le back associé à besoin de node 12.

Je conseil donc d'installer nvm pour gérer les versions de node.
Il faut donc dans un premier temps lancer le back avec node 12, changer de version de node et lancer le front.

## Scripts disponibles

### `npm start`

Lance l'application sur l'url : localhost:3000

### `npm run test`

Lance les test unitaires en wtch mode. Il suffit de rajouter une regex juste après pour limiter les tests lancés.

### `npm run eslint`

Commande qui permet de vérifier que les fichiers du projet n'ont pas de warning / erreurs eslint.

#### `npm run test:coverage`

Lance les tests unitaires en calculant la couverture de code (consultable dans le dossier coverage)

### `npm run build`

Lance le build de l'applciation

