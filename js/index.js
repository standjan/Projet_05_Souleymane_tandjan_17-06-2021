mainIndex()

function mainIndex(){

    const mainIndex = document.querySelector ("#mainIndex");       // on declare MainIndex pour retourner l'element MainIdex dans le DOM//
    const msgAccueil = document.querySelector(".msg-accueil");     // on declare MsgAccueil = pour retourner l'element Msg-accueil //


    let urlApi = `http://localhost:3000/api/teddies/`;

    fetch(urlApi)                    //  on fait le fetch pour recuperer informations des Ours//

       .then(function(response) {     

            if (response.serveur) {   // on utilise la condition SI au cas ou le serveur ne fonctionne pour retourner ce message //
                const serveur = response.serveur;
            
                mainIndex.innerHTML = 
                `<div class="cardError">
                <p> Désolé, nous n'avons pas pu charger les articles.</p> 
                <p> Vérifier que le serveur soit bien fonctionnel.</p>
            </div>`;
        };

        return response.json();   // il nous retourne en JSON //

    })
    .then(function(response) {   

        const objets = response;
        const nombreDePeluches = objets.length;

        creationCartePourProduits()   // creation de la carte produits //
        bientotNouveauProduits()     //  et le messsages de la derniere carte afin d'indique l'arriver des nouveaux produits//


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

};

