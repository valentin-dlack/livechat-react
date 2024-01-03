# Projet Chat en temps réel avec ReactJS et Firebase

Ce projet est un chat en temps réel développé avec ReactJS en utilisant TypeScript et Firebase. Il ne nécessite pas l'utilisation de websockets pour la communication en temps réel.

## Table des matières

- [Projet Chat en temps réel avec ReactJS et Firebase](#projet-chat-en-temps-réel-avec-reactjs-et-firebase)
  - [Table des matières](#table-des-matières)
  - [RENDU DE PROJET](#rendu-de-projet)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Fonctionnalités](#fonctionnalités)
  - [Auteur](#auteur)
  - [Licence](#licence)

## RENDU DE PROJET

**IMPORTANT :**

Pour la sécurité de mon projet, je n'ai pas mis la clé API de mon projet Firebase dans le fichier de configuration. Je vous ai donc envoyé la clé API **dans le mail de rendu**.

Il faudra créer un fichier `.env` à la racine du projet et y mettre la clé API de votre projet Firebase comme ceci :

```
VITE_FIREBASE_API_KEY="CLE_API_FIREBASE"
```

## Installation

Pour démarrer le projet, suivez les étapes ci-dessous :

1. Clonez le dépôt GitHub sur votre machine locale.
2. Accédez au répertoire du projet.
3. Exécutez la commande `npm install` pour installer les dépendances.
4. Exécutez la commande `npm run dev` pour démarrer l'application.

## Utilisation

Pour tester l'application, suivez les étapes suivantes :

1. Créez deux à trois profils d'utilisateurs.
2. Connectez-vous à l'application à partir de différentes fenêtres de navigateur, de préférence en mode navigation privée.
3. Ajoutez les utilisateurs entre eux en utilisant la barre de recherche. Veuillez noter que la recherche est sensible à la casse et le nom doit être exact (la recherche partielle n'est pas prise en charge).
4. Commencez à envoyer des messages à partir d'un compte et répondez à partir d'un autre compte.
5. Vous pouvez également envoyer des fichiers via l'application.

N'hésitez pas à explorer les fonctionnalités supplémentaires de l'application et à fournir vos commentaires.

**Note :** Assurez-vous d'avoir configuré correctement les paramètres de connexion à Firebase dans le fichier de configuration approprié avant de démarrer l'application.

## Fonctionnalités

- [x] Authentification avec Firebase
- [x] Ajout de nouvelles conversations
- [x] Envoi de messages texte
- [ ] Envoi de messages audio
- [x] Envoi de fichiers/images
- [x] Recherche d'utilisateurs
- [ ] Recherche de messages
- [ ] Suppression de messages
- [ ] Suppression de conversations

## Auteur

- [Valentin D.](https://github.com/valentin-dlack)

## Licence

Ce projet est sous licence GPL-3.0. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.