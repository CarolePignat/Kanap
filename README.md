# Kanap

### Projet 5 | Parcours "Développeur web" OpenClassrooms - Construisez un site e-commerce en JavaScript

## Mission

Implémenter de façon dynamique une plateforme e-commerce pour la société Kanap qui souhaite vendre ses produits en ligne

![Accueil Kanap](Accueil.png)

## Back-end

#### Prérequis

* `Node.js`
* `npm`

#### Installation

* Depuis le dossier "back" du projet, exécuter `npm install`
* Exécuter `node server` pour lancer le serveur
* Le serveur doit tourner sur `localhost` avec le port par défaut `3000`
* Le terminal affiche `listening on port 3000` et, si le port est occupé `listening on port 3001` s'affiche

Ouvrir le fichier `index.html` dans le navigateur

## Spécifications fonctionnelles

#### Architecture générale

L'application web est composée de 4 pages :

* Page d'Accueil

    * Ensemble des produits retournés par l'API
    * Pour chaque produit : affichage de son image, son nom et le début de sa description
    * Au clic sur un produit, l'utilisateur est redirigé sur la page "Produit"

* Page "Produit"

    * Affichage de façon dynamique les détails du produit sélectionné par l'utilisateur
    * Menu déroulant : choix de la couleur et saisie de la quantité
    * Ajout du produit dans le panier

* Page "Panier"

    * Résumé des produits dans le panier
    * Affichage du prix total 
    * Modification de la quantité d'un produit sélectionné et mise à jour du prix total
    * Suppression d'un produit et mise à jour du prix total
    * Formulaire permettant de passer une commande

* Page "Confirmation"

    * Message de confirmation de commande et remerciement à l'utilisateur
    * Affichage du numéro de commande

#### Types de données

Tous les produits possèdent les attributs suivants :

* colors : `array of string`
* id : `string`
* name : `string`
* price : `number`
* imageUrl : `string`
* description : `string`
* altTxt : `string`

#### Paramètres de l'API

URL de l'API : (http://localhost:3000/api/products)

3 paramètres :

* Requête **GET** : "/", retourne un tableau de tous les éléments
* Requête **GET** : "/{product-ID}", renvoie l'élément correspondant à {product-ID} qui est l'identifiant (id) du produit
* Requête **POST** : "/order", requête JSON contenant *objet de contact* et un *tableau de produits* dans le corps de la requête, retourne l'*objet contact*, le *tableau produits* et *orderId* (string)

#### Validation des données 

* Pour le routes **POST** :
    * L'*objet contact* envoyé au serveur doit contenir les champs "firstName", "lastName", "address", "city" et "email"
    * Le *tableau produits" envoyé au back-end doit être un array de strings *product-ID*
* Les types de ces champs doivent être validés avant l'envoi au serveur

#### Technologies utilisées

* HTML
* CSS
* JavaScript

### Spécificités techniques

* Les parties statiques des 4 pages sont fournies
* Sur chaque page, un exemple de la partie dynamique est donné
* La structure HTML et CSS est déjà en place
* Intégration dynamique des éléments grâce à JS et à l'API
* Utilisation du code JavaScript pur. L'utilisation de tout framework ou librairie JavaScript est interdite
* Analyse et validation des inputs des utilisateurs avant l'envoi à l'API
* Indentation du code source
* Utilisation de commentaires
* Découpage du code source en fonctions réutilisables
* Concernant l'API : utilisation de promesses pour éviter les callbacks