# Portfolio Web Full Stack

Portfolio professionnel avec une partie publique pour les visiteurs et un espace d'administration sécurisé pour gérer le contenu sans toucher au code.

## Fonctionnalités

**Partie visiteur**
- Accueil, à propos, compétences, projets (avec page de détail), expériences, formation, certifications
- Formulaire de contact : les messages sont enregistrés en base
- CV téléchargeable en PDF (généré automatiquement, ou fichier PDF envoyé par l'administratrice)

**Espace admin** (`/admin`)
- Connexion sécurisée (cookie `httpOnly`), changement de mot de passe
- Tableau de bord avec statistiques
- Gestion des projets (image, technologies, brouillon/publié), technologies, compétences, expériences, formations, certifications
- Boîte de réception des messages (lu/non lu, suppression, réponse par e-mail)
- Profil (photo, informations, liens) et gestion du CV avec aperçu

## Technologies

- **Frontend** : React 19, Vite, React Router, Axios
- **Backend** : Node.js, Express 5, Mongoose, JWT, bcrypt, Multer, Puppeteer, Helmet, express-rate-limit
- **Base de données** : MongoDB
- **Outils** : Git, GitHub, Docker, Figma, Jira, Postman

## Prérequis

- Node.js 20 ou plus récent
- Docker Desktop (pour MongoDB)

## Installation

```bash
git clone https://github.com/souad5017/Portfolio.git
cd Portfolio

# 1. Base de données
docker compose up -d

# 2. Serveur
cd server
cp .env.example .env     # puis remplir JWT_SECRET, ADMIN_EMAIL et ADMIN_PASSWORD
npm install
npm run seed             # données d'exemple + compte administrateur
npm run dev              # http://localhost:5000

# 3. Client (dans un autre terminal)
cd client
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

Pour générer un `JWT_SECRET` :

```bash
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

> **Attention** : `npm run seed` supprime toutes les données de la base avant de la remplir. À utiliser uniquement sur une base vide ou de développement.

## Scripts

| Dossier | Commande | Rôle |
|---|---|---|
| `server` | `npm run dev` | Serveur avec rechargement automatique |
| `server` | `npm start` | Serveur en production |
| `server` | `npm run seed` | Réinitialise la base avec les données d'exemple |
| `client` | `npm run dev` | Serveur de développement Vite |
| `client` | `npm run build` | Build de production |
| `client` | `npm run lint` | Vérification ESLint |

## Structure

```
portfolio/
├── client/        # React (Vite) : pages visiteur et admin
├── server/        # API Express, modèles Mongoose, génération du PDF
├── docs/          # Documentation (routes de l'API, base de données)
└── docker-compose.yml
```

## Documentation

- [Routes de l'API](docs/routes.md)
- [Base de données](docs/database.md)

## Sécurité

- Mots de passe hashés avec bcrypt, session par JWT dans un cookie `httpOnly`
- Routes d'écriture protégées, lecture des messages réservée à l'administratrice
- Limitation du nombre de tentatives de connexion, de messages et de téléchargements du CV
- En-têtes de sécurité (Helmet), validation des messages, envoi de fichiers limité aux images et PDF, noms de fichiers générés par le serveur
- Aucun secret dans le dépôt : les fichiers `.env` sont ignorés par Git

## Organisation Git

Une branche `feature/...` par fonctionnalité, fusionnée dans `main` après vérification.