# Prédict Car

### Une application de prédiction des prix des voitures d'occasion utilisant l'IA.

## Introduction

Ce projet est une application de prédiction des prix des voitures d'occasion, conçue dans le cadre de notre formation en développement IA. L'application combine des technologies de machine learning et une interface utilisateur intuitive pour prédire le prix des voitures d'occasion et classifier l'offre comme « Bonne affaire » ou « Mauvaise affaire ». L'application a été construite avec React et FastAPI, et elle utilise des modèles de Random Forest et de régression logistique pour offrir une expérience utilisateur simple mais efficace, tout en fournissant des informations utiles aux utilisateurs pour leurs décisions d'achat.

La version actuelle intègre un modèle amélioré de Random Forest, sélectionné après des comparatifs rigoureux avec d'autres modèles comme CatBoost, XGBoost, et la version initiale de Random Forest. Cette amélioration reflète notre engagement à fournir des prédictions précises et adaptées aux besoins des utilisateurs.

## Fonctionnalités Principales
1. **Interface Utilisateur Moderne :** Une interface utilisateur construite avec React et stylisée avec Material-UI pour une meilleure expérience utilisateur.
2. **Recherche et Prédiction de Prix :** L'utilisateur peut rechercher le prix d'une voiture d'occasion en fournissant des informations telles que le kilométrage, l'année, la marque, le carburant, la transmission, le modèle et l'état du véhicule. Le modèle amélioré de Random Forest est utilisé pour prédire le prix, offrant des estimations encore plus précises.
3. **Classification des Offres :** En plus de la prédiction de prix, le modèle de régression logistique permet de classifier l'offre comme « Bonne affaire » ou « Mauvaise affaire », donnant à l'utilisateur un indicateur supplémentaire pour évaluer la qualité de l'offre.
4. **Visualisation des Données Interactives :** Utilisation de Plotly pour visualiser les données de manière interactive, permettant aux utilisateurs de mieux explorer et comprendre les tendances des prix.
5. **Progression de Prédiction :** Ajout d'une barre de progression visible pendant le calcul de la prédiction pour améliorer l'expérience utilisateur.
6. **Authentification et Gestion des Utilisateurs :** Système d'inscription, de connexion et de déconnexion des utilisateurs avec un stockage sécurisé des tokens JWT.
7. **Animation lors de la Déconnexion :** Ajout d'une animation amusante avec un timer lors de la déconnexion avant la redirection vers la page de connexion.

## Technologies Utilisées

- **Backend :** FastAPI pour une gestion rapide et robuste des routes backend.
- **Frontend :** React, Material-UI pour une interface utilisateur moderne, et Plotly pour des visualisations interactives.
- **Base de Données :** SQLite avec SQLAlchemy pour une gestion efficace des utilisateurs et des véhicules.
- **Machine Learning :**
  - Random Forest amélioré pour la régression des prix.
  - Régression Logistique pour la classification des offres.
- **Autres :** Vite.js pour le développement frontend rapide et optimisé.

## Installation

### Prérequis

- **Python 3.8+** doit être installé sur votre système.
- **Pipenv** ou **pip** pour la gestion des dépendances.
- **Base de données SQLite** pour gérer les données utilisateurs et véhicules.
- **Node.js et npm** doivent être installés pour exécuter le frontend.

### Étapes d'Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/voitures-occasion.git
   cd voitures-occasion
   ```

2. **Installer les dépendances :**

   ```bash
   pip install -r requirements.txt
   ```
  Pour le frontend :

   ```bash
   npm install
   ```

3. **Initialiser la base de données :**

   ```bash
   python create_db.py
   ```

4. **Entraîner les modèles (si nécessaire) :**
   Si les modèles ne sont pas fournis, utilisez le script d'entraînement pour générer les fichiers `.pkl` :

   ```bash
   python models/random_forest_improved.py
   ```

5. **Lancer l'API FastAPI :**

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

6. **Lancer l'interface React :**

   ```bash
   npm run dev
   ```

## Utilisation

L'application est accessible via le frontend React, qui tourne par défaut sur `http://localhost:5173`. Utilisez le frontend pour accéder aux fonctionnalités de prédiction des prix des voitures, à la classification des offres, ainsi qu'à l'authentification et à la gestion des utilisateurs.

### Prédiction des Voitures d'Occasion

- Renseignez les caractéristiques du véhicule pour obtenir une estimation précise du prix et savoir si l'offre est une bonne ou une mauvaise affaire.

| Modèle                  | RMSE    | R²   | Pourquoi écarté ?                         |
|--------------------------|---------|-------|--------------------------------|
| Random Forest            | 2440.84 | 0.88  | Moins performant que la version améliorée. |
| Random Forest Amélioré   | 2258.58 | 0.89  | Modèle sélectionné. Meilleur équilibre. |
| CatBoost                 | 2674.20 | 0.87  | Trop complexe pour ce cas d'usage. |
| XGBoost                  | 2384.68 | 0.88  | Plus lent sans gain significatif. |

Le Random Forest amélioré a démontré une précision accrue tout en restant rapide et simple à intégrer.

## Schéma de la Base de Données

- **Vehicule** : contient les informations sur les véhicules disponibles dans la base (marque, modèle, année, état, etc.), permettant une analyse approfondie pour chaque recherche de prédiction.
- **Utilisateur** : contient les informations sur les utilisateurs inscrits (nom d'utilisateur, email, mot de passe haché) pour gérer l'authentification.

## Architecture du Projet

- **API/** : contient les fichiers backend (FastAPI, modèles, schémas, CRUD) pour gérer les interactions côté serveur.
- **data/** : contient les fichiers de données utilisés pour l'entraînement du modèle, assurant la reproductibilité des prédictions.
- **models/** : contient les fichiers d'entraînement des modèles et les modèles sauvegardés en `.pkl`.
- **notebooks/** : contient les notebooks Jupyter pour l'exploration des données et les essais de modélisation.
- **scripts/** : contient des scripts auxiliaires, comme ceux pour insérer des données dans la base de données ou scraper des informations en ligne.
- **sql/** : contient les scripts SQL pour créer les tables de la base de données.
- **tests/** : contient les tests unitaires pour vérifier la bonne exécution de l'application.
- **voiture-prediction/** : contient l'interface utilisateur développée avec React.
- **database/** : fichiers relatifs à la base de données, y compris la configuration de SQLAlchemy.
- **create_db.py** : script pour initialiser la base de données.

## Documentation de l'API

### Endpoints Disponibles

L'API FastAPI fournit des endpoints pour la prédiction des prix, la gestion des véhicules et la gestion des utilisateurs. La documentation Swagger est accessible à l'adresse `http://localhost:8000/docs` lorsque le serveur est en cours d'exécution.

- `/predict_combined` : Fournit une prédiction de prix et une classification.
- `/register` : Permet de créer un compte utilisateur.
- `/login` : Authentification utilisateur.

## Améliorations Futures

- **Améliorations UX/UI :** Ajout de fonctionnalités plus avancées dans l'interface React, comme des graphiques interactifs et des filtres de recherche.
- **Modèles de Machine Learning :** Exploration d'autres modèles plus avancés pour améliorer la précision des prédictions.
- **Authentification :** Ajouter une authentification plus robuste pour sécuriser l'application.
- **Système de Notification :** Ajouter des notifications push lorsque les prédictions sont prêtes.
- **Optimisation des Performances :** Améliorer la vitesse de chargement et de traitement des données pour une meilleure expérience utilisateur.

## Crédits

- **Équipe de Développement :** Projet réalisé dans le cadre d'une formation en développement IA. Merci à toute l'équipe pour la collaboration, l'engagement et la persévérance tout au long du projet !

  - [Sébastien Rapuzzi](https://rands.netlify.app/).
  - [Yamine Aissani](https://www.linkedin.com/in/yamine-aissani-876514254/).
  - [Mathieu Soussignan](https://www.mathieu-soussignan.com).

- **Images et Logos :** Les images utilisées pour le design de l'application sont libres de droits, contribuant à une interface visuelle attrayante sans compromettre la conformité légale.

---

Si vous avez des questions ou souhaitez contribuer, n'hésitez pas à nous contacter. 🚗✨