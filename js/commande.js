messageCommande()
restoreAccueil()

function messageCommande() {

    localStorage.removeItem("panierKey");

    let orderIdOfOrder = localStorage.getItem("orderKey");
    let priceOfOrder = localStorage.getItem("totalKey");

    let mainCommande = document.querySelector("main");
    
    let messageOrderId = document.createElement("div");
    messageOrderId.classList.add("message");
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

    mainCommande.appendChild(messageOrderId);

}

function restoreAccueil() {

    let buttonBack = document.querySelector("button");
    buttonBack.addEventListener("click", function() {

        localStorage.removeItem("totalKey");
        localStorage.removeItem("orderKey");

        location.replace("./index.html");

    })
}