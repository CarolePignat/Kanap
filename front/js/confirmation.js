// RECUPERATION DE L'ID DE LA COMMANDE DANS L'URL

let queryString = new URL(window.location.href);
let orderIdNumber = queryString.searchParams.get('orderId');


/***************  AFFICHAGE DU NO DE COMMANDE ***************/

function displayOrderId() {

    let orderId = document.querySelector('#orderId');
    orderId.textContent = orderIdNumber;
};

displayOrderId();