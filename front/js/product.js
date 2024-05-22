// RECUPERATION DE L'URL COMPLETE 

let queryString = window.location.href;
console.log(queryString);

// RECUPERATION DE L'ID DU PRODUIT A AFFICHER

let params = new URL(window.location).searchParams;
let productId = params.get('id');
console.log(productId);


// RECUPERATION DES DONNEES DU PRODUIT AVEC "FETCH"

fetch(`http://localhost:3000/api/products/${productId}`)

    .then((res) => {
        return res.json();
    })

    .then((article) => {

        // Appel de la fonction
        showDatasArticle(article);
    })

    .catch((err) => {
        alert("Les données du produit ne s'affichent pas !" + err);
    });


// INSERTION DES DONNEES DE L'API DANS LE DOM

function showDatasArticle(article) {

    // Affichage de l'image
    let productImage = document.createElement('img');
    productImage.src = article.imageUrl;
    productImage.alt = article.altTxt;
    document.querySelector('.item__img').appendChild(productImage);

    // Affichage du Nom et du Prix 
    let productName = document.querySelector('#title');
    productName.textContent = article.name;

    let productPrice = document.querySelector('#price');
    productPrice.textContent = article.price;

    // Affichage de la Description
    let productDescription = document.querySelector('#description');
    productDescription.textContent = article.description;

    // Menu déroulant Couleurs
    let productColors = document.querySelector('#colors');

    article.colors.forEach((color) => {
        
        // Insertion des attributs des couleurs du produit
        let option = document.createElement('option');
        option.value = color; 
        option.textContent = color;
        productColors.appendChild(option);
    });

    console.log(article);

    addToCart(article);
};


// AJOUT DU PRODUIT AU PANIER

function addToCart(article) {

    // Bouton "Ajouter au panier"
    let addToCartBtn = document.querySelector('#addToCart');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();


        // Sélection des inputs "colors" et "quantity"
        let selectColors = document.querySelector('#colors').value;
        let selectQuantity = document.querySelector('#quantity').value;

        // Si l'utilisateur n'a pas sélectionné de couleur 
        if (selectColors === "") {
            alert("Veuillez choisir une couleur !");
            return;
        
        // Si l'utilisateur n'a pas sélectionné de quantité 
        } else if (selectQuantity < 1 || selectQuantity > 100) {
            alert("Veuillez sélectionner une quantité entre 1 et 100 !");
            return;
        };

        // Récupération des paramètres du produit à ajouter au panier
        let productDatas = {

            productId: productId,
            productImageSrc: article.imageUrl,
            productImageAlt: article.altTxt,
            productName: article.name,
            productPrice: article.price,
            productDescription: article.description,
            colors: selectColors,
            quantity: Number(selectQuantity)
        };

        console.log(productDatas);


        // INITIALISATION DU "LOCALSTORAGE" 

        let saveItemsInLocalStorage = JSON.parse(localStorage.getItem('product'));


        // Si valeur inexistante dans le "localStorage"
        if (saveItemsInLocalStorage === null) {

            // Création d'un tableau dans le "localStorage"
            saveItemsInLocalStorage = [];

            // Ajout du produit dans le "localStorage" 
            saveItemsInLocalStorage.push(productDatas);

            // Sauvegarde du produit dans le "localStorage"
            localStorage.setItem('product', JSON.stringify(saveItemsInLocalStorage));
            alert("Article ajouté au panier !");

        // Si valeur existante dans le "localStorage"
        } else if (saveItemsInLocalStorage !== null) {

            // Recherche du produit via son "id" et sa "couleur"
            let productFound = saveItemsInLocalStorage.find(p => p.productId === productId && p.colors === selectColors);
            
            // Si produit trouvé
            if (productFound) {

                // Ajout de la nouvelle quantité
                let addNewQuantity = parseInt(productDatas.quantity) + parseInt(productFound.quantity);
                productFound.quantity = addNewQuantity;

                // Sauvegarde de la nouvelle quantité dans le "localStorage"
                localStorage.setItem('product', JSON.stringify(saveItemsInLocalStorage));
                alert("Article ajouté au panier !");

            // Si le produit n'est pas dans le panier
            } else {

                // Ajout du nouveau produit
                saveItemsInLocalStorage.push(productDatas);

                // Sauvegarde du nouveau produit dans le "localStorage"
                localStorage.setItem('product', JSON.stringify(saveItemsInLocalStorage));
                alert("Article ajouté au panier !");
            }
        };

        // Redirection vers la page "Panier"
        window.location.href = "./cart.html";
    });
};