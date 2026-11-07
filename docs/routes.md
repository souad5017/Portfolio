# Routes de l'API

Préfixe : `/api`. Les routes « admin » exigent le cookie de connexion.

## Public

| Méthode | Route | Description |
|---|---|---|
| GET | `/health` | État du serveur |
| GET | `/projects`, `/projects/:id` | Projets publiés (`?published=true` pour filtrer) |
| GET | `/technologies`, `/skills`, `/experiences`, `/education`, `/certificates` | Listes, et `/:id` pour un élément |
| GET | `/profile` | Profil public |
| POST | `/messages` | Envoyer un message de contact (10 par heure et par IP) |
| GET | `/cv` | CV en PDF (`?inline=1` pour l'afficher) |
| POST | `/auth/login` | Connexion (10 échecs par 15 minutes et par IP) |
| POST | `/auth/logout` | Déconnexion |

## Admin

| Méthode | Route | Description |
|---|---|---|
| GET | `/auth/me` | Utilisateur connecté |
| PUT | `/auth/password` | Changer le mot de passe |
| GET | `/dashboard` | Statistiques |
| PUT | `/profile` | Modifier le profil |
| GET, POST | `/projects`, `/technologies`, `/skills`, `/experiences`, `/education`, `/certificates` | Lister (brouillons inclus pour les projets) et créer |
| PUT, DELETE | `/<ressource>/:id` | Modifier et supprimer |
| GET | `/messages`, `/messages/:id` | Lire les messages |
| PUT, DELETE | `/messages/:id` | Marquer comme lu, supprimer |
| POST | `/upload` | Envoyer une image (PNG, JPG, WebP, 5 Mo) |
| POST | `/upload/cv` | Envoyer un CV en PDF (10 Mo) |

## Erreurs

Réponses JSON `{ "message": "..." }` : `400` données invalides, `401` non connecté, `404` introuvable, `429` trop de requêtes, `500` erreur serveur.