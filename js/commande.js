messageCommande()
restoreAccueil()

function messageCommande() {

    localStorage.removeItem("panierKey"); // retire la clé dans le localstaorage après avoir passé la commande//

    let orderIdOfOrder = localStorage.getItem("orderKey");
    let priceOfOrder = localStorage.getItem("totalKey");

    let mainCommande = document.querySelector("main"); //  selectionner le main //
    
    let messageOrderId = document.createElement("div");  // consiste a créer dans le DOM l'element DIV
    messageOrderId.classList.add("message");  // ajoute le message de remerciement//
    messageOrderId.innerHTML =
    `
    <h1>Merci</h1>
    <h2>d'avoir commandé sur <span class="title">Orin'ours</span></h2>
    <h3>Votre numéro de commande est le suivant :</h3>
    <div class="order_id dyna"> ${orderIdOfOrder} </div>
    <h4>Pour un montant total de :</h4>
    <div class="total dyna"> ${priceOfOrder}</div>
    <h5>A bientôt sur notre site</h5>
    <i class="fas fa-chevron-down"></i>
    
    <button>Revenir à l'accueil</button>`;

    mainCommande.appendChild(messageOrderId); // on crée le noeud de mainCommande//

}

function restoreAccueil() { // la fonction pour restaurer la page d'accueil //

    let buttonBack = document.querySelector("button");  // on selectionne le bouton pour, on ecoute les evenements//
    buttonBack.addEventListener("click", function() { 

        localStorage.removeItem("totalKey");
        localStorage.removeItem("orderKey");

        location.replace("./index.html");  // on remplace la page de commande par la index//

    })
}