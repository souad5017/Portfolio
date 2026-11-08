# Cahier des charges — Portfolio Web Full Stack

Document de référence initial : « Cahier des charges — Portfolio Web Full Stack », version 1.0 (2026).
Ce fichier résume ce qui a été réalisé et les écarts par rapport à ce document.

## Objectif

Un portfolio professionnel avec une partie publique pour les visiteurs et un espace d'administration sécurisé, permettant de gérer le contenu sans modifier le code et de générer le CV au format PDF.

## Écarts par rapport au cahier initial

| Sujet | Cahier initial | Réalisé | Remarque |
|---|---|---|---|
| Interface | Vues EJS rendues par Express | React (Vite) + API REST JSON | Les maquettes Figma sont en React ; client et serveur sont séparés |
| Structure du projet | Application unique `src/` avec `views/` | `client/` (React) et `server/` (Express) | |
| Base de données | MySQL | MongoDB (Mongoose) | Choix de stack ; `schema.sql` remplacé par les modèles Mongoose |
| Relation projets / technologies | Table `project_technology` | Tableau de références dans `projects.technologies` | Même principe : pas de liste dans une chaîne de caractères |
| Compétences | Tables `skills` et `technologies` | Collections `skills` (niveau, ordre) et `technologies` (étiquettes des projets) | |
| Authentification | `express-session` | JWT dans un cookie `httpOnly` | Mots de passe hashés avec bcrypt, comme prévu |
| Génération du CV | Vue EJS + Puppeteer | Page HTML générée côté serveur + Puppeteer | L'administratrice peut aussi envoyer son propre PDF |
| Table `settings` | Prévue | Non réalisée | Remplacée par la page Paramètres (changement de mot de passe) |

Contraintes respectées : pas de PHP, Node.js et Express côté serveur, séparation visiteur / administration, routes d'administration protégées, mots de passe jamais stockés en clair, variables d'environnement, Git et GitHub, documentation.

## Fonctionnalités réalisées

**Visiteur** : accueil, à propos, compétences par catégorie, projets avec page de détail, expériences, formation, certifications, page CV avec téléchargement du PDF, formulaire de contact enregistré en base.

**Administration** : connexion, tableau de bord, gestion des projets (image, technologies, brouillon / publié), technologies, compétences, expériences, formations, certifications, messages (lu / non lu, suppression), profil (photo, informations, liens), gestion du CV (aperçu, PDF personnalisé), changement de mot de passe.

## Critères de validation

| Critère | État |
|---|---|
| Le visiteur peut consulter toutes les sections | Réalisé |
| Les projets sont récupérés depuis la base de données | Réalisé |
| L'administratrice peut se connecter | Réalisé |
| Les routes admin sont protégées | Réalisé (vérifié par des tests automatisés) |
| Les CRUD fonctionnent correctement | Réalisé |
| Les messages de contact sont enregistrés | Réalisé |
| Le CV est généré correctement en PDF | Réalisé |
| Le site est responsive | À valider sur mobile et tablette |
| Les erreurs sont correctement gérées | Réalisé (middleware d'erreurs, messages dans l'interface) |
| Le projet est documenté | Réalisé (README, `docs/`) |
| Le code est organisé et versionné avec Git | Réalisé (branches `feature/...`) |

## Livrables

Application web complète, base MongoDB avec données de démonstration (`npm run seed`), interfaces visiteur et administration, authentification, CRUD, génération du CV, documentation technique, README, maquettes Figma, dépôt GitHub.

## À venir

Déploiement, et une fonctionnalité d'intelligence artificielle sur le portfolio.