# Test technique

## Installation

Pour fonctionner le projet nécéssite node 16.
Cependant pour fonctionner, le back associé à besoin de node 12.

Je conseil donc d'installer nvm pour gérer les versions de node.
Il faut donc dans un premier temps lancer le back avec node 12, changer de version de node et lancer le front.

## Scripts disponibles

### `npm start`

Lance l'application sur l'url : localhost:3000

### `npm run test`

Lance les test unitaires en wtch mode. Il suffit de rajouter une regex juste après pour limiter les tests lancés.

### `npm run eslint`

Commande qui permet de vérifier que les fichiers du projet n'ont pas de warning / erreurs eslint.

### `npm run test:coverage`

Lance les tests unitaires en calculant la couverture de code (consultable dans le dossier coverage)

### `npm run build`

Lance le build de l'applciation

# Fonctionnement de L'application

## Timeline

La time line affiche toujours 12 créneaux horaires (un créneau horaire étant le temps d'une heure n à l'heure n + 1).

De plus ce sont au minumum 6 créneaux horaires avant ou après l'heure courante qui sont affichés quand cela est possible (moins ou plus en fonction de si nous sommes en début ou fin de journée). Ainsi en regardant la timeline à 12h36, nous verront les réservations de 06h00 à 18h00.

Ce choix est fait étant donné que la réservation est faite à un instant T dans la journée, ainsi on peut voir les réservations juste avant ou juste après la notre.

Une timeline sur un plus long temps aurait rendu la lecture des informations plus compliquée.

Une autre possibilité aurait été de choisir d'afficher, soit le matin, soit l'après midi ou les deux. Ou encore de fixer les dates de début et de fin de la timeline.

## Refresh des données

### Manuellement

Pour facilité les test des différents cas limite, un bouton a été ajouté en haut à gauche de l'écran pour recharger facilement les données via le ws fourni. L'interface se met automatiquement à jour.

### Automatiquement

A chaque requête POST ou DELETE, un refresh des données est fait via un appel GET, de plus toutes les 5 minutes un appel est fait pour refresh l'écran.

## Connection

Une interface de connection est fournie, mais mis à part le format de l'email et le fait que les champs soient fournis, on ne vérifie pas l'existance de l'utilisateur.

Le token et la date d'expiration sont stockés dans le local storage, ainsi si l'on recharge la page, nous n'avons pas besoin de nous reconnecter.

A chaque échec d'un ws, nous vérifions si cela est dû à la validité du token (via les intercepteurs axios). Si le token n'est plus valide, un appel axios est fait pour avoir un nouveau token valide (qui sera mis à jour dans le local storage) et le ws en echec est automatiquement rejoué avec le nouveau token.

Ainsi il n'est nécessaire de se reconnecter que si la page est rechargée après l'expiration du dernier token.

Un bout de code est cependant commenté dans l'un des intercepteurs pour rediriger l'utilisateur vers la page de connexion (ce code pourrait être utilisé si l'on ne veut pas autoriser de refresh token, ou si il y en a trop eu, etc ...)