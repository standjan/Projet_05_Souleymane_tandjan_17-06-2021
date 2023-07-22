mainIndex()


function mainIndex(){

    const mainIndex = document.querySelector("#mainIndex");
    const msgAccueil = document.querySelector(".msg-accueil");
    const body404 = document.querySelector("body");

    let urlApi = `http://localhost:3000/api/teddies/`;

    fetch(urlApi)
    .then(function(response) {
                // exécution en cas d'erreur
                problemErrorServeur()

                function problemErrorServeur() {
                    if (response.status >= 400 && response.status < 600) {
                        const codeErreur = response.status;
            
                        body404.innerHTML = 
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
                        </header>
                
                        <main id="main404">
            
                            <div id="bloc404">
            
                                <div class="text404">
                                    <h1>OUPS !</h1>
                                    <h2>La page que vous cherchez semble introuvable.</h2>
                                    <p>Code erreur : <span>${codeErreur}</span></p>
                                    <a href="index.html">Réactualiser</a>
                        
                                </div>
                        
                                <div class="img404">
                                    <img src="./images/teddy4044.jpg" alt="ours triste">
                                </div>
            
                            </div>
            
                        </main>
                
                        <footer>
                
                            <div class="footer_div_centrale">
                                <section>
                                    <h3>A PROPOS</h3>
                                    <a href="">Conditions générales de ventes</a>
                                    <a href="">Conditions générales d'utilisation</a>
                                    <a href="">Données personnelles</a>
                                    <a href="">Mentions</a>
                                </section>
                                <section>
                                    <h3>SERVICES</h3>
                                    <a href="">SAV</a>
                                    <a href="">Besoin d'aide ?</a>
                                    <a href="">Contactez-nous</a>
                                </section>
                                <section>
                                    <h3>LE GROUPE ORINOCO</h3>
                                    <a href="">A propos d'Orinours</a>
                                    <a href="">Recrutement</a>
                                    <a href="">Groupe Orinoco</a>
                                </section>
                                <section>
                                    <h3>NOS AUTRES SITES</h3>
                                    <a href=""><i class="fas fa-tshirt"></i>Oritextil</a>
                                    <a href=""><i class="fas fa-book"></i>Oribook</a>
                                    <a href=""><i class="fas fa-camera"></i>Oricam</a>
                                    <a href=""><i class="fas fa-chair"></i>Orikea</a>
                                </section>
                                <section>
                                    <h3>PAIEMENTS</h3>
                                    <div id="footer_paiement">
                                        <i class="fab fa-cc-paypal"></i>
                                        <i class="fab fa-cc-visa"></i>
                                        <i class="fab fa-cc-mastercard"></i>
                                    </div>
                                </section>
                            </div>
                    
                            <div id="copyright" class="footer_div_centrale">
                                <p><i class="far fa-copyright"></i>2021 - Tous droits réservés - Orinoco & filiales </p>
                            </div>
                
                        </footer>`;
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

