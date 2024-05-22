// RECUPERATION DE L'ENSEMBLE DES PRODUITS DE L'API AVEC "FETCH"

fetch("http://localhost:3000/api/products")

    .then((response) => {
        return response.json();
    })

    .then((product) => {

        // Appel de la fonction
        getCatalog(product);
        console.log(product);
    })

    .catch((error) => {
        alert("Une erreur est survenue !" + error);
    });


// AFFICHAGE DES DONNEES DE L'API DANS LE DOM

function getCatalog(product) {

    let catalog = document.querySelector('#items');

    for (let datas of product) {

        // Récupération de l'id des produits
        let a = document.createElement('a');
        a.href = `./product.html?id=${datas._id}`;
        catalog.appendChild(a);

        let article = document.createElement('article');
        a.appendChild(article);


        // Affichage de l'image des produits
        let image = document.createElement('img');
        image.src = datas.imageUrl;
        image.alt = datas.altTxt;
        article.appendChild(image);

        // Affichage du nom des produits
        let name = document.createElement('h3');
        name.classList.add('productName');
        name.textContent = datas.name;
        article.appendChild(name);

        // Affichage de la description des produits
        let description = document.createElement('p');
        description.classList.add('productDescription');
        description.textContent = datas.description;
        article.appendChild(description);
    };
};