# Base de données (MongoDB)

Base : `portfolio`. Toutes les collections ont `createdAt` et `updatedAt`.

| Collection | Champs principaux |
|---|---|
| `users` | `email` (unique), `password` (hash bcrypt, non renvoyé par défaut) |
| `profiles` | `firstName`, `lastName`, `role`, `intro`, `about`, `summary`, `goals`, `location`, `email`, `phone`, `github`, `linkedin`, `website`, `photo`, `cvUrl` |
| `technologies` | `name`, `category` (Frontend, Backend, Database, Tools) |
| `skills` | `name`, `category`, `level` (Beginner à Expert), `order` |
| `projects` | `title`, `type`, `description`, `details`, `features[]`, `image`, `technologies[]` (références), `github`, `demo`, `startDate`, `endDate`, `published` |
| `experiences` | `position`, `company`, `location`, `startDate`, `endDate`, `description`, `missions[]` |
| `educations` | `school`, `degree`, `startDate`, `endDate`, `description` |
| `certificates` | `name`, `issuer`, `date`, `description`, `url` |
| `messages` | `name`, `email`, `subject`, `message`, `isRead` |

## Relations

Un projet référence plusieurs technologies par leurs identifiants :

```
projects.technologies[]  →  technologies._id
```

Cela remplace la table `project_technology` d'une base relationnelle.

## Fichiers

Les images et PDF envoyés sont stockés dans `server/uploads/` (ignoré par Git). La base ne garde que leur adresse.