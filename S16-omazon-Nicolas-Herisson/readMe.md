# Omazon

Création d'une copie d'amazon pour une initiation à React et TypeScript
Seul les parties barre de recherche, trie par catégorie, affichage des produits et affichage d'un produit sont développées.

ATTENTION: Afin de me concentrer sur React et TypeScript, je n'ai pas développé la partie backend!! 
            Il en est de même pour le scss global dans le style amazon.

# Technos

- React 
- TypeScript
- Vite
- Axios
- Biome


# Objectifs

- Créer un projet React avec TypeScript
- Utilisation des hooks React et des contextes
- Utilisation de React Router
- Utilisation du useEffect
- Apprentissage des props drillings
- Utilisation de Vite comme bundler
- Utilisation d'Axios pour les appels API
- Utilisation et setup de BIOME
- Création d'alias
- Tentative de custom fetch (fetch générique)

# Setup

## Installer toutes les dépendances

- à la racine du projet, exécuter la commande suivante :

```bash
pnpm dev:install
```

ou

```bash
npm run dev:install
```

## Create database

- Créer la base de données postgres

## Setup le .env

- copier le fichier .env.example dans le back et le renommer en .env
- remplacer les variables du fichier .env par celles correspondantes

## Remplir la base de données

- à la racine du projet, exécuter la commande suivante :

```bash
pnpm db:reset
```

ou

```bash
npm run db:reset
```

## Démarrer le backend

```bash
pnpm dev:back
```

ou

```bash
npm run dev:back
```

## Démarrer le frontend

```bash
pnpm dev:front
```

ou

```bash
npm run dev:front
```