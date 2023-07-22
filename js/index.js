mainIndex()


function mainIndex(){

    const mainIndex = document.querySelector("#mainIndex");
    const msgAccueil = document.querySelector(".msg-accueil");


    let urlApi = `http://localhost:3000/api/teddies/`;

    fetch(urlApi)

    .then(function(response) {
         function serveur() {
            if (response.serveur) {
                const serveur = response.serveur;
            
                document.getElementById.innerHTML = 
                `<header>
                <div class="into-header">
                    <div><a href="index.html">Orin'ours</a></div>
                    
                    <nav>
                        <a href="panier.html" id="panier">
                            <div class="nb-articles cache"> </div>
                            <i class="fas fa-shopping-basket"></i>
                            <p>Panier</p>
                        </a>
                    </nav>
                </div>
            </header>`;
        }
                
}

        return response.json();

    })
    .then(function(response) {

        const objets = response;
        const nombreDePeluches = objets.length;

        creationCartePourProduits()
        bientotNouveauProduits()


        function bientotNouveauProduits() {
           
            if (nombreDePeluches%2) {

                let bientotNewPeluche = document.createElement("bientot");
                bientotNewPeluche.classList.add("bientot");
                bientotNewPeluche.innerHTML = 
                `<div class="text_bientot"> Bientôt <br>
                de nouvelles<br> 
                peluches <br>disponibles</div>`;

                mainIndex.appendChild(bientotNewPeluche);
            }
        }
        
        function creationCartePourProduits() {
            // Répartition des objets en forme de carte
            for (let objet in objets) {
            
                msgAccueil.classList.add("cache");

                const priceEuro = convertPrice(objets[objet].price);
                const urlForEachArticle = "article.html" + "?" + objets[objet]._id;
            
                let objetCarte = document.createElement("div");
                objetCarte.classList.add("card");
                objetCarte.innerHTML = 
                `<div class="bloc-img">
                <img src=${objets[objet].imageUrl}>
                </div>
                <h3>${objets[objet].name}</h3>
                <div class="prix">${priceEuro} €</div>
                <a href=${urlForEachArticle} id=${objets[objet]._id} class="lien"> Choisir </a>`;
        
                mainIndex.appendChild(objetCarte);
            }
        }
    })
    .catch((error) => {
        // Message d'erreur si problème de serveur
        function problemeServeur() {

            msgAccueil.classList.add("cache");
            mainIndex.innerHTML = 
            `<div class="cardError">
                <p> Désolé, nous n'avons pas pu charger les articles.</p> 
                <p> Vérifier que le serveur soit bien fonctionnel.</p>
            </div>`;
            
        }

        problemeServeur()
        
    });
}

