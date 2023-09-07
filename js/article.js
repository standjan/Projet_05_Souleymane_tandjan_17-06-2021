mainArticle()

function mainArticle() {

    const urlWindow = window.location.search;  //--obtenir la page actuelle, et renvoie la partie Querystring y compris le point ?--//
    let idArticle = urlWindow.slice(1);        //-- crée un tableau virtuelle des articles avec la methode Slice--//
    let urlArticle = `http://localhost:3000/api/teddies/` + idArticle; // l' recupere l'information d'un ours//

    const mainArticle = document.querySelector("#mainArticle");  // Declarée une constance de MainArticle pour selecetionnée ces elements //

    fetch(urlArticle)   // la promèsse pour recuperer l'URL des articles //
    .then(response => response.json() // .repondre en JSON //

    .then(function(response) {

        const articleOurs = response;  // constance des articles //
        const colors = response.colors; //         leurs couleurs//

        const priceEuro = convertPrice(articleOurs.price); // les prix en euro//
       // trois objetifs a venir 
        createCartes();  //creer la carte des articles//
        addColors();     // selectionner les couleurs  //
        ajoutAuPanier(); // enfin les ajouter au panier //

        // Création des cartes
        function createCartes() {
            let articleCarte = document.createElement("div");   // on declare le variable des articles, pour créer la DIV element des articles dans le DOM
            articleCarte.classList.add("article");              // on additionne la classe de la carte article // 
    
            articleCarte.innerHTML = 
            `
            <img id="article-img" src=${articleOurs.imageUrl} alt="ours en peluche">
    
            <section id="bloc-article-text">
                <h2 class="nameArticle">${articleOurs.name}</h2>
                <div class="descriptionArticle"> ${articleOurs.description} </div>
                <div class="prixArticle">${priceEuro} €</div>
    
                <form>
                    <label for="color">Choisir la couleur :</label>
                    <select name="color" id="color">
                    
                    </select>
    
                    <button id=${articleOurs._id}>Ajouter au panier</button>
                </form>
    
                <a href="index.html" class="retour flex items-center  ">
                Retour
                </a>
            </section>
            `;
    
            mainArticle.appendChild(articleCarte); // on crée un noeud article dans le MainArticle//
        }

    
        // Ajout des couleurs dans les cartes
        function addColors() {   

            const colorsIndex = document.querySelector('#color');  // on selectionne les couleurs //
            
            for (let nbColors = 0; nbColors < colors.length; nbColors++) {  // la boucle pour choisir le nombre de couleurs//
                colorsIndex.innerHTML += 
                `<option class="optionColor" value="${colors[nbColors]}">${colors[nbColors]}</option>` //
            };
        }

        // Ajout l'article de la page au panier
        function ajoutAuPanier() {

            const buttonSendPanier = document.querySelector("button");// on selectionne le bouton //

            buttonSendPanier.addEventListener("click", function(event) {  // ecouter les evenements d'ajout par la fonction addEventList--//
    
                event.preventDefault();

                const nameArticleChoisi = document.querySelector("h2");  // le nombre d'article //
                const urlArticleChoisi = window.location.search;         //--obtenir la page actuelle, et renvoie la partie Querystring y compris le point ?--//
                const couleurChoisi = document.querySelector("#color");  // selectionner la couleur //
                const prixArticleChoisi = document.querySelector(".prixArticle"); //   
                
                const articleChoisi = { // la constance pour choisir les articles//
                    name: nameArticleChoisi.textContent,
                    id: urlArticleChoisi.slice(1),   // un tableau contenant des articles 
                    color: couleurChoisi.options[couleurChoisi.selectedIndex].text, // selectionner la couleur voulu avant l'ajout au panier//
                    price: prixArticleChoisi.textContent
                };

                const stringArticleChoisi = JSON.stringify(articleChoisi) // on conveti la valeur en chaine JSON, elle specifie aussi les valeurs et les proprietes a inclure sur un tableau//

                let getPanier = localStorage.getItem("panierKey");   // dans le local storage nous renvoie la valeur de la clé associé//

                let numGetPanier = JSON.parse(getPanier); // il verifie la quantité de l'article dans le panier, traite par Json parse avant de renvoyer//

                numGetPanier.push(stringArticleChoisi);   // on fait le push panier//

                let strNumGetPanier = JSON.stringify(numGetPanier); // on converti la valeur du panier ou remplace la valeur //

                localStorage.setItem("panierKey", strNumGetPanier); // lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà  //

                indicateurNbArticlePanier() // comme son nom l'indique//
            }) 
        }
    }));
}