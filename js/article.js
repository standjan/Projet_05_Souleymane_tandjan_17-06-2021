mainArticle()

function mainArticle() {

    const urlWindow = window.location.search;
    let idArticle = urlWindow.slice(1);
    let urlArticle = `http://localhost:3000/api/teddies/` + idArticle;

    const mainArticle = document.querySelector("#mainArticle");

    fetch(urlArticle)
    .then(response => response.json()

    .then(function(response) {

        const articleOurs = response;
        const colors = response.colors;

        const priceEuro = convertPrice(articleOurs.price);

        createCartes();
        addColors();
        ajoutAuPanier();

        // Création des cartes
        function createCartes() {
            let articleCarte = document.createElement("div");
            articleCarte.classList.add("article");
    
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
    
            mainArticle.appendChild(articleCarte);
        }

    
        // Ajout des couleurs dans les cartes
        function addColors() {

            const colorsIndex = document.querySelector('#color');
            
            for (let nbColors = 0; nbColors < colors.length; nbColors++) {
                colorsIndex.innerHTML += 
                `<option class="optionColor" value="${colors[nbColors]}">${colors[nbColors]}</option>`
            };
        }

        // Ajout l'article de la page au panier
        function ajoutAuPanier() {

            const buttonSendPanier = document.querySelector("button");

            buttonSendPanier.addEventListener("click", function(event) {
    
                event.preventDefault();

                const nameArticleChoisi = document.querySelector("h2");
                const urlArticleChoisi = window.location.search;
                const couleurChoisi = document.querySelector("#color");
                const prixArticleChoisi = document.querySelector(".prixArticle");
                
                const articleChoisi = {
                    name: nameArticleChoisi.textContent,
                    id: urlArticleChoisi.slice(1),
                    color: couleurChoisi.options[couleurChoisi.selectedIndex].text,
                    price: prixArticleChoisi.textContent
                };

                const stringArticleChoisi = JSON.stringify(articleChoisi)

                let getPanier = localStorage.getItem("panierKey");

                let numGetPanier = JSON.parse(getPanier);

                numGetPanier.push(stringArticleChoisi);

                let strNumGetPanier = JSON.stringify(numGetPanier);

                localStorage.setItem("panierKey", strNumGetPanier);

                indicateurNbArticlePanier()
            }) 
        }
    }));
}