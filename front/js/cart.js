// RECUPERATION DU PANIER DANS LE "LOCALSTORAGE"

let saveItemsInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(saveItemsInLocalStorage);


// RECUPERATION DES DONNEES DU "LOCALSTORAGE"

fetch("http://localhost:3000/api/products")

    .then((res) => {
        return res.json();
    })

    .then((item) => {
        displayItemDatas(item);
    })

    .catch((err) => {
        alert("Les données ne s'affichent pas !" + err);
    });


// INSERTION DES DONNEES DES PRODUITS DANS LE DOM

function displayItemDatas() {

    //Si le panier est vide
    
    if (saveItemsInLocalStorage === null) {

        alert("Votre panier est vide !");  


    // Si articles dans le "localStorage"

    } else if (saveItemsInLocalStorage !== null) {

        // Pour chaque article, affichage de ses détails
        saveItemsInLocalStorage.forEach((item) => {

            // Récupération de l'Id et de la Couleur des produits
            let article = document.createElement('article');
            article.dataset.id = item.productId;
            article.dataset.color = item.colors;
            document.querySelector('#cart__items').appendChild(article);

            // Affichage de l'Image des produits
            let divImage = document.createElement('div');
            divImage.classList.add('cart__item__img');
            article.appendChild(divImage);

            let image = document.createElement('img');
            image.src = item.productImageSrc;
            image.alt = item.productImageAlt;
            divImage.appendChild(image);

            // Affichage de la Description des produits : Nom, Couleur, Prix
            let content = document.createElement('div');
            content.classList.add('cart__item__content');
            article.appendChild(content);

            let description = document.createElement('div');
            description.classList.add('cart__item__content__description');
            content.appendChild(description);

            let name = document.createElement('h2');
            name.textContent = item.productName;
            description.appendChild(name);

            let color = document.createElement('p');
            color.textContent = item.colors;
            description.appendChild(color);

            let price = document.createElement('p');
            price.textContent = item.productPrice + " €";
            description.appendChild(price);

            // Affichage des "settings" : 'Quantity'
            let settings = document.createElement('div');
            settings.classList.add('cart__item__content__settings');
            content.appendChild(settings);

            let divQuantity = document.createElement('div');
            divQuantity.classList.add('cart__item__content__settings__quantity');
            settings.appendChild(divQuantity);

            let pQuantity = document.createElement('p');
            pQuantity.textContent = "Qté : ";
            divQuantity.appendChild(pQuantity);

            let input = document.createElement('input');
            input.classList.add('itemQuantity');
            input.type = 'number';
            input.name = 'itemQuantity';
            input.min = '1';
            input.max = '100';
            input.value = item.quantity;
            divQuantity.appendChild(input);


            // Changement de quantité sur l'Input
            input.addEventListener('change', () => updateQuantity);


            // Affichge des "settings" : 'Delete'
            let divDelete = document.createElement('div');
            divDelete.classList.add('cart__item__content__settings__delete');
            settings.appendChild(divDelete);

            let deleteItem = document.createElement('p');
            deleteItem.classList.add('deleteItem');
            deleteItem.textContent = "Supprimer";
            divDelete.appendChild(deleteItem);


            // Bouton "supprimer"
            divDelete.addEventListener('click', (e) => {
                e.preventDefault();
                removeItem(item);
            });
        });

        // Appel des fonctions 
        totalQuantity();
        totalPrice();
    };
};


// MODIFICATION DE LA QUANTITE DES ARTICLES

function updateQuantity() {

    //let itemQuantity = document.querySelectorAll('.itemQuantity');


};


// SUPPRESSION D'UN ARTICLE

function removeItem(item) {

    let deleteItemId = saveItemsInLocalStorage.productId;
    let deleteItemColor = saveItemsInLocalStorage.colors;

    let removeItem = saveItemsInLocalStorage.filter(el => el.productId !== deleteItemId && el.colors !== deleteItemColor);

    // Sauvegarde du nouveau panier dans le "localStorage"
    localStorage.setItem('product', JSON.stringify(removeItem));

    alert("L'article a été supprimé !");
    
    // Rechargement de la page
    window.location.reload();
};


// AFFICHAGE DE LA QUANTITE TOTALE DU PANIER

function totalQuantity() {

    let total = 0;
    let totalQuantity = document.querySelector('#totalQuantity'); 
    
    saveItemsInLocalStorage.forEach(item => {
        let totalItemsQuantity = item.quantity;
        total += totalItemsQuantity;
        
        totalQuantity.textContent = total;
    });
};


// AFFICHAGE DU PRIX TOTAL DU PANIER

function totalPrice() {

    let total = 0;
    let totalPrice = document.querySelector('#totalPrice');

    saveItemsInLocalStorage.forEach(item => {
        let totalItemsPrice = item.quantity * item.productPrice;
        total += totalItemsPrice;

        totalPrice.textContent = total;
    });
};



/******************** FORMULAIRE ********************/

let orderForm = document.querySelector('.cart__item__form');


// COMPLETER LES DONNEES DU FORMULAIRES


    /******* PRENOM ********/

    let firstName = document.querySelector('#firstName');
    firstName.addEventListener('change', () => {
        validFirstName(this);
    });

    function validFirstName () {

        let firstNameRegExp = new RegExp(/^[a-zA-Zà-ü ._-]{3,25}$/);
        let errMsg = document.querySelector('#firstNameErrorMsg');

        if (!firstNameRegExp.test(firstName.value)) {
            errMsg.textContent = "Le prénom n'est pas valide !";
        } else {
            errMsg.textContent = "Le prénom est valide !";
        }
    };


    /******* NOM ********/

    let lastName = document.querySelector('#lastName');
    lastName.addEventListener('change', () => {
        validLastName(this);
    });

    function validLastName() {

        let lastNameRegExp = new RegExp(/^[a-zA-Zà-ü ._-]{3,25}$/);
        let errMsg = document.querySelector('#lastNameErrorMsg');

        if (!lastNameRegExp.test(lastName.value)) {
            errMsg.textContent = "Le nom n'est pas valide !";
        } else {
            errMsg.textContent = "Le nom est valide !";
        }
    };


    /******* ADRESSE ********/

    let address = document.querySelector('#address');
    address.addEventListener('change', () => {
        validAddress(this);
    });

    function validAddress() {

        let addressRegExp = new RegExp(/^[a-zA-Zà-ü0-9 ._-]{3,25}$/);
        let errMsg = document.querySelector('#addressErrorMsg');

        if (!addressRegExp.test(address.value)) {
            errMsg.textContent = "L'adresse n'est pas valide !";
        } else {
            errMsg.textContent = "L'adresse est valide !";
        }
    };


    /******* VILLE ********/

    let city = document.querySelector('#city');
    city.addEventListener('change', () => {
        validCity(this);
    });

    function validCity() {

        let cityRegExp = new RegExp(/^[a-zA-Zà-ü0-9 ._-]{3,25}$/);
        let errMsg = document.querySelector('#cityErrorMsg');

        if (!cityRegExp.test(city.value)) {
            errMsg.textContent = "La ville n'est pas valide !";
        } else {
            errMsg.textContent = "La ville est valide !";
        }
    };


    /******* EMAIL ********/

    let email = document.querySelector('#email');
    email.addEventListener('change', () => {
        validEmail(this);
    });

    function validEmail() {

        let emailRegExp = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,25}$/);
        let errMsg = document.querySelector('#emailErrorMsg');

        if (!emailRegExp.test(email.value)) {
            errMsg.textContent = "L'email n'est pas valide !";
        } else {
            errMsg.textContent = "L'email est valide !";
        }
    };


// VALIDER LA COMMANDE

function submitForm() {

    // Bouton "Commander"
    let orderBtn = document.querySelector('#order');
        orderBtn.addEventListener('submit', (e) => {
            e.preventDefault();

            
            // Création d'un tableau de produits

            let productID = [];

            for (let i = 0; i < saveItemsInLocalStorage; i++) {
                productID.push(saveItemsInLocalStorage[i].productId);
            };


            // Récupération des informations personnelles

            let contactObject = {

                contact: {
                    firstName: orderForm.firstName.value,
                    lastName: orderForm.lastName.value,
                    address: orderForm.address.value,
                    city: orderForm.city.value,
                    email: orderForm.email.value
                },

                products: productID,
            };

            // Options de requête "POST" de "fetch"
            let requestOptions = {

                method: 'POST',
                body: JSON.stringify(contactObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // Vérification des informations personnelles
            if (contactObject.products.length === 0) {
                alert("Votre panier est vide !");
            } else if (validFirstName(orderForm.firstName) && 
                    validLastName(orderForm.lastName) && 
                    validAddress(orderForm.address) && 
                    validCity(orderForm.city) && 
                    validEmail(orderForm.email)
            ) {
                fetch("http://localhost:3000/api/products/order", requestOptions)

                .then((res) => {
                    res.json();
                })

                .then((data) => {
                    window.location.href = `./confirmation.html?orderId=${data.orderId}`;
                    localStorage.clear();

                    console.log('orderId');
                })

                .catch((err) => {
                    alert("Erreur d'envoi du formulaire !" + err);
                });
            }  
        });
};

submitForm();