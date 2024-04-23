Assurez-vous d'ajouter le dossier "Connexion" à l'emplacement approprié :
- Pour WampServer, ajoutez le dossier dans le répertoire "www".
- Pour XAMPP, ajoutez le dossier dans le répertoire "htdocs".

Dans le dossier "Connexion", vous trouverez les fichiers PHP nécessaires pour connecter l'interface utilisateur (front-end) à la base de données "usersdb" lors de l'utilisation de XAMPP ou WampServer.

Ensuite, exécutez le code SQL suivant pour créer la base de données et la table :

CREATE DATABASE IF NOT EXISTS usersdb;
USE usersdb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    pass VARCHAR(50),
    division VARCHAR(50),
    services VARCHAR(50),
    poste VARCHAR(50),
    date_de_creation TIMESTAMP DEFAULT NOW()
);
