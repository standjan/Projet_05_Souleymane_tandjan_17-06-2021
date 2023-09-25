createPanier()
indicateurNbArticlePanier()


// Création de Panier
function createPanier() {

    if (localStorage.getItem('panierKey') == null) { 
        
        let panierArray = [];  // variable tableau vide //
        let panierArrayStr = JSON.stringify(panierArray); // variable pour traiter la chaine de caractere du tableau et ses elements//
        localStorage.setItem("panierKey", panierArrayStr);  // lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà  //
        
    }
}

// Converssion du prix
function convertPrice(price) {
    return (price / 100);
}

// Indicateur du nombre d'articles dans le panier
function indicateurNbArticlePanier() {

    let getPanier = localStorage.getItem("panierKey"); // dans le local storage on renvoi la valeur de la clé associé//

    let arrayGetPanier = JSON.parse(getPanier);   // variable du tableau panier, pour traiter et retourner la valeur du tableau //
    const nbArticleInPanier = arrayGetPanier.length;  // le nombre d'article dans le panier //
    
    if (nbArticleInPanier > 0) {

        const headerReload = document.querySelector("header");  // on recharge le header //
        headerReload.innerHTML =
        `
        <div class="into-header">
            <div><a href="index.html">Orin'ours</a></div>
        
            <nav>
                <a href="panier.html" id="panier">
                    <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                    <i class="fas fa-shopping-basket"></i>
                    <p>Panier</p>
                </a>
                
            </nav>
        </div>
        `;

        let affichageNbArticlesPanier = document.querySelector(".nb-articles"); 
        affichageNbArticlesPanier.classList.remove("cache"); // oon retire la liste des articles //
    }
}