## Gestionnaire de Restaurants

Gestionnaire de Restaurants est une application qui permet de gérer des restaurants:

    - d'afficher Tous les restaurants dans un format tableau/liste(avec les informations necessaires)
    - une recherche par nom ou adresse
    - un filtrage par type de cuisine

## Choix techniques
    ## Frontend
        Vue.js 3 avec Composition API
        Composants :
            App.vue : composant principal
            SearchBar.vue : recherche instantanée
            FilterSelect.vue : filtre cuisine
            RestaurantList.vue : affichage de la liste
            RestaurantForm.vue : ajout de restaurants
            RestaurantItem: affiche un seul restaurant(avec ses infos).
        Service:
        restaurantService

        App.vue: orchestre toute l’application.

    ## Backend
        Node.js + Express

        routes → définition des endpoints
        controllers → gestion requête/réponse
        services → logique métier + SQL
        db → connexion base
        utils → validations

        REST API pour :
        GET /restaurants : récupérer tous les restaurants
        POST /restaurants : créer un restaurant
        Get('/search'): sercher les restaurants par nom ou addresse
        Get('/filter') : chercher par cuisine

## Base de données
    - PostgreSQL (Stockage des informations des restaurants)

    -Installer PostgreSQ
        sudo apt update
        sudo apt install postgresql postgresql-contrib

    -vérifier la version
        psql --version

    -Démarrer PostgreSQL
        sudo systemctl status postgresql

    -activer automatiquement PostgreSQL au démarrage
        sudo systemctl enable postgresql

    - se mettre dans PostgreSQL
        sudo -u postgres psql

    -créer la base de données
        CREATE DATABASE restaurants_db;

    -voir la liste des bases
        \l
    -se connecter a la base créer
        \c restaurants_db
        
    -créer la table restaurants
        CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude DECIMAL(10,8) NOT NULL,
        longitude DECIMAL(11,8) NOT NULL,
        cuisine_type VARCHAR(50) NOT NULL,
        phone_number VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT valid_latitude CHECK (latitude >= -90 AND latitude <= 90),
        CONSTRAINT valid_longitude CHECK (longitude >= -180 AND longitude <= 180)
        );

    -Ajouter les données dans la table
        INSERT INTO restaurants (name, address, latitude, longitude, cuisine_type, phone_number)
        VALUES (
        'Le Comptoir du Relais',
        '9 Carrefour de l''Odéon, 75006 Paris, France',
        48.8529,
        2.3387,
        'Française',
        '+33 1 44 27 07 97'
        );

    -afficher les données
        SELECT * FROM restaurants;

    -verifier la structure de la table
        \d restaurants

    -Sortir de PostgreSQL
        \q

## Architecture
App.vue
 ├─ SearchBar.vue (recherche par nom/adresse)
 ├─ FilterSelect.vue (filtre par type de cuisine)
 ├─ RestaurantList.vue (affichage des restaurants)
 └─ RestaurantForm.vue (ajout d’un restaurant)

 ## Flux des données
 Utilisateur
   │
   ▼
App.vue (state : searchQuery, cuisineFilter)
   │
   ▼
Services REST (getAllRestaurants, createRestaurant, searchRestaurants)
   │
   ▼
Backend (Node.js + Express)
   │
   ▼
Base de données PostgreSQL
   │
   ▼
Résultat renvoyé à App.vue
   │
   ▼
Suggestions et affichage dans RestaurantList


## Fonctionnalités implémentées
    - Liste des restaurants : affichage dynamique
    - Ajout de restaurant via formulaire réactif
    - Recherche et filtrage :
        Par nom ou adresse
        Par type de cuisine
    -Validation côté client :
        Coordonnées GPS correctes
        Nom et adresse minimum requis
    Suggestions dynamiques : affichées pendant la saisie

## Points à améliorer
    - Validation plus poussée côté serveur (nom unique, coordonnées valides)
    - Affichage sur carte interactive
    - Edition et suppression de restaurants
    - Calcul de distance entre utilisateur et restaurants
    - Suggestions cliquables pour remplir automatiquement le champ recherche

## Problèmes rencontrés et solutions

    - Modal automatique problématique	(Remplacé par suggestions dynamiques)
    - v-model dans FilterSelect ne fonctionnait pas	(Ajout de watch sur localCuisineFilter pour propager les changements)
    - Problème avec suggestions vide (Création d’un ref suggestions séparé de restaurants)

## Tests réalisés
    Latitude / Longitude :
        Cas limites : -90, 90, -180, 180
        Cas invalides : chaînes, nombres hors limites
    Recherche :
        Par nom complet et partiel
        Par adresse complète et partielle
        Par type de cuisine
    Filtrage combiné :
        Recherche + filtre cuisine
    Suggestions dynamiques mises à jour correctement

## Installation complète

1. Installer Node.js
Télécharger Node.js LTS depuis nodejs.org

Vérifier l’installation :
    node -v
    npm -v

2. Installer PostgreSQL
Télécharger PostgreSQL depuis postgresql.org

Créer une base de données :
    CREATE DATABASE restaurants_db;
    CREATE USER restaurant_user WITH PASSWORD 'motdepasse';
    GRANT ALL PRIVILEGES ON DATABASE restaurants_db TO restaurant_user;

3. Installer Vue.js CLI
npm install -g @vue/cli
vue --version

4. Cloner et installer le projet
    git clone <url-du-projet>
    cd vue-project
    npm install        
    cd frontend
    npm install        

5. Configurer l’accès à PostgreSQL
    Dans le backend (.env ou config.js) :
    DB_HOST=localhost
    DB_PORT=5432 
    DB_NAME=restaurants_db
    DB_USER=restaurant_user
    DB_PASSWORD=motdepasse

6. Lancer le backend
    cd backend
    npm run dev

7. Lancer le frontend
    cd frontend
    npm run dev