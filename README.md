# Boilerplate Quasar Clean

## Installation
Installeur bientôt disponible...

## 🧠 Architecture de l'application

Ce projet suit les principes de la **Clean Architecture**, adaptée à une application Vue.js avec une séparation claire entre la logique métier, l'interface utilisateur et les dépendances externes. L'objectif est de garantir une architecture **modulaire, testable, évolutive** et **facilement maintenable**.

---

## 🏗️ Structure générale

/
├── src
│ ├── boot/
│ ├── components/
│ ├── domain/
│ ├── infrastructure/
│ ├── interface/
│ ├── layouts/
│ ├── router/
│ ├── services/
│ ├── stores/
│ ├── types/
│ ├── use-cases/
├── di.ts

---

## 📁 Détail des dossiers

### `/boot`

Scripts de démarrage de l'application (initialisation des permissions, notifications, etc.).

### `/components`

Composants Vue.js réutilisables, **purement visuels** et découplés de la logique métier.

### `/domain`

Contient le **cœur métier de l’application** :

- `entities/` : Modèles métiers (entités métier, objets valeur, etc.).
- `repositories/` : Interfaces des repositories qui définissent **les contrats métier**.

> 👉 Cette couche ne dépend d’aucun outil technique (Vue, Firebase…).

### `/infrastructure`

Contient **les implémentations concrètes** des dépendances extérieures :

- `repositories/` : Implémentations concrètes des interfaces du domaine (ex. Firebase, LocalStorage, RevenueCat).
- `notifications/` : Scripts liés aux notifications locales.

> 👉 Cette couche dépend des bibliothèques, mais pas du domaine.

### `/interface`

Contient la **couche de présentation** :

- `pages/` : Pages Vue.js (composants routés).
- `stores/` : **Stores métier** organisés par domaine (ex. `authStore`) basés sur Pinia.

> 👉 Cette couche dépend des frameworks (Vue, Pinia), et communique avec les `use-cases`.

### `/layouts`

Layouts globaux utilisés pour structurer les pages (`DefaultLayout`, `OnboardingLayout`, etc.).

### `/router`

Configuration du routeur Vue Router (routes, guards, etc.).

### `/services`

Fonctions utilitaires ou services transverses non liés au métier (ex. formatage, gestion des dates, helpers UI...).

### `/stores`

Contient la configuration globale du store (Pinia) et des **stores non métier** (ex. `uiStore`, `appStore`).

### `/tests`

- `e2e/` : Tests d'end-to-end : simuler le comportement complet d’un utilisateur (cible : flux utilisateurs réels). Exemple : L’utilisateur s’inscrit → choisit des mots → voit le mot du jour → le valide (outil à choisir parmi : Cypress, Playwright, Vitest + jsdom pour des tests d’interface plus légers)
- `integration/` : Tests d'intégration : vérifier que les accès Firebase, notifications, localStorage fonctionnent comme prévu (cible : les instances de repositories dans /infrastructure)
- `unit/` : Tests d'unitaires : teste la logique métier sans dépendance technique (cible : use-cases et entities)

### `/types`

Définitions des types TypeScript partagés dans toute l'application (types utilitaires, enums, etc.).

### `/use-cases`

Contient **les cas d’usage métier**

> 👉 Les use-cases sont **indépendants de l’UI** et orchestrent les appels aux repositories pour exécuter une logique métier.

### `di.ts`

Configuration de **l’injection de dépendances** pour relier les `use-cases` aux implémentations concrètes des `repositories`.

---

## 🔁 Flux d'exécution typique (Clean Architecture)

Composant Vue
↓
Store (interface layer)
↓
Use-case (application/business logic)
↓
Repository (abstraction)
↓
Infrastructure (implémentation concrète - ex : Firebase)

---

## ✅ Objectifs atteints par cette architecture

- **Séparation claire des responsabilités** (métier, UI, infrastructure).
- **Indépendance de la logique métier vis-à-vis des frameworks** (Vue, Firebase…).
- **Testabilité élevée** des `use-cases` et des `entities`.
- **Extensibilité** : facile à faire évoluer sans effet de bord.
- **Scalabilité** : prête à accueillir de nouveaux domaines .

---

## 💡 Bonnes pratiques

- Les **use-cases ne doivent jamais connaître Vue, Pinia, ou Firebase**.
- Les **repositories concrets** doivent être injectés dans les use-cases via `di.ts`.
- Les **stores UI** ne contiennent aucune logique métier : ils appellent des `use-cases` et gèrent l’état visuel.
