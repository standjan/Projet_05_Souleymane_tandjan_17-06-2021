pagePanier()
nbArticlesDansPanier();

function pagePanier() {

    let getPanier = localStorage.getItem("panierKey");  // dans le local storage on renvoi la valeur de la clé associé//
    let numGetPanier = JSON.parse(getPanier);     // il verifie la quantité de l'article dans le panier, traite par Json parse avant de renvoyer//
    
    if (numGetPanier.length == 0) {
        const messagePanierVide = document.querySelector(".paniervide ") 
        messagePanierVide.classList.remove("cache");
    }
//------choisir
    for (let articleChoisi in numGetPanier) {  // La boucle itération fixe for, pour le variable  d'article choisi et la quantité d'article //
    
        let articlePanier = numGetPanier[articleChoisi];
        let convertInArray = JSON.parse(articlePanier);  // conertir le tableau, traiter avant de renvoyer //
        
        const tableauPanier = document.querySelector("#liste-panier"); // la liste du tableau panier //

        let carteFormatPanier = document.createElement("div"); // creer l'element DIV dans le panier//
        carteFormatPanier.classList.add("articles-panier-beta")
        carteFormatPanier.innerHTML = 
        `
        <div class="name"> ${convertInArray.name} </div>
        <div class="color"> ${convertInArray.color} </div>
        <div class="price"> ${convertInArray.price} </div>
        `;

        tableauPanier.appendChild(carteFormatPanier); // on ajouter le noeud de la carte panier

    }
//Ajout de button supprimer
    addButtonDelete();

    function addButtonDelete() {

        numOfArticles = numGetPanier.length;  // le panier est vide //
        let i = 0

        for (i; i < numOfArticles; i++) {  // la boucle itération for //
            let artPanier = document.querySelector(".articles-panier-beta"); // on selectionne l'article a supprimer dans la liste //
            artPanier.innerHTML += 
            `<div class="delete" id=${i} onclick="deleteArt(id)"><i class="fas fa-trash-alt"></i></div>`;
            artPanier.classList.add("articles-panier");
            artPanier.classList.remove("articles-panier-beta");
        }
    }
//---on calcul le total de prix
    const allPrices = document.querySelectorAll(".price");  // on selectionne l'ensemble des articles choisi//
    const arrayAllPrices = Array.from(allPrices)   // on declare le total du prix des articles dans un tableau //

    const nbPrices = arrayAllPrices.length
    let totalPanier = 0;
    
    for (let j = 0; j < nbPrices; j++) { // la boucle d'iteration //
        let strBasis = arrayAllPrices[j].textContent; // on a une variable permettant de manipuler le tableau //
        let newStrBasis = strBasis.substring(0, strBasis.length - 2); //Une nouvelle chaîne contenant la partie indiquée de la chaîne donnée.//
        let convertStrInNum = parseInt(newStrBasis); // analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.//

        totalPanier += convertStrInNum;
    }
    
    const affichageTotal = document.querySelector("#panierTotaux"); // on affiche le panier ttotaux en crénat l'element DIV dans le DOM//
    let blocTotal = document.createElement("div");
    blocTotal.innerHTML =
    `<span>TOTAL :</span><span class="totalPanierN">${totalPanier} €</span>`;

    affichageTotal.appendChild(blocTotal);
    
}
//--supprimé des articles dans le panier--//

function deleteArt(indexDel) {

    let getPanierForDel = JSON.parse(localStorage.getItem("panierKey"));  // Le variable panier delete, on traite  avant de renvoie la clée valeur//
    getPanierForDel.splice(indexDel, 1); // modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments//
    const newPanier = JSON.stringify(getPanierForDel); // Une nouvelle chaîne contenant la partie indiquée de la chaîne donnée. //
    localStorage.setItem("panierKey", newPanier); // la clée duo-valeur, elle met à jour la valeur si la clé existe déjà
    
    alert("Votre article à bien été supprimé");
    setTimeout(300); //on a ajouter un minuteur qui exécute une fonction ou un code donné après la fin du délai 300 //
    window.location.reload(); //  recharge la ressource depuis l'URL actuelle. // 
}
//--Afficher le nombre d'article du panier
function nbArticlesDansPanier() {

    let getPanier = localStorage.getItem("panierKey");
    let arrayGetPanier = JSON.parse(getPanier);
    const nbArticleInPanier = arrayGetPanier.length;

    if (nbArticleInPanier == 1) {

        let titrePanier = document.querySelector(".panier-art-titre");
        titrePanier.innerText = `Votre article`

    } else if (nbArticleInPanier > 1) {

        let titrePanier = document.querySelector(".panier-art-titre");
        titrePanier.innerText = `Vos ${nbArticleInPanier} articles`

    } else {

    }
}

//-------------------------------------------
// Formulaire panier Validation
//-------------------------------------------
let form = document.querySelector("#contact")

verifForm()
envoieFormulaire()


function envoieFormulaire() {

    let button = document.querySelector("button");

    button.addEventListener('click', function(e) {

        e.preventDefault();

        let getPanier = localStorage.getItem("panierKey");
        let numGetPanier = JSON.parse(getPanier);


        if (validLetter(form.firstName) && validLetter(form.lastName) && validAddress(form.address) && validLetter(form.city) && validEmail(form.email)) {
            
            if (numGetPanier == 0) {
                
                alert ("Vous ne pouvez pas commander un panier qui est vide, veuillez sélectionner un article au minimum");

            } else {

                // Récupération des srtings articles du panier
                let products = [];

                for (let articleInPanier in numGetPanier) {
    
                    let articlePanier = numGetPanier[articleInPanier];
                    let convertInArray = JSON.parse(articlePanier);
                    
                    let getIdArtPanier = convertInArray.id;
                    
                    products.push(getIdArtPanier);
                    
                }
                //---------------------------------------------


                // Récupération du formulaire
                let contact = {
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    address: form.address.value,
                    city: form.city.value,
                    email: form.email.value
                };
                //---------------------------------------------


                // Envoie des données avec FETCH
                fetch("http://localhost:3000/api/teddies/order", // on recupere l'information de la commande
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({contact, products})
                })
                .then(response => response.json())
                .then(function(response) {

                    let objetRetour = response;

                    console.log(objetRetour["orderId"]);
                    localStorage.setItem("orderKey", objetRetour["orderId"]);
                    
                    let totaldupanier = document.querySelector(".totalPanierN");
                    localStorage.setItem("totalKey", totaldupanier.textContent);


                    alert("Veuillez cliquer sur OK pour comfirmer votre commande.");
                    location.replace("commande.html");
                })
                .catch(function(error){

                    console.log(error)

                })

            }

        } else {

            if (numGetPanier == 0) {
                alert ("Votre panier est vide, veuillez sélectionner au moins un article et le formulaire n'est pas correctement rempli");
            } else {
                alert ("Le formulaire n'est pas correctement rempli");
            }
        } 
    });
}

// --- Vérification Formulaire avant envoie
function verifForm() {
//-----------verification de prenom
    form.firstName.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#firstN");

        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
    });
//------------nom
    form.lastName.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#lastN");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }

    });
//-----verification des lettres
    form.address.addEventListener('change', function() {
        validAddress(this);

        const msgError = document.querySelector("#addrS");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
        
    });
//--------------Verification de ville
    form.city.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#citY");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
        
    });
//-- Validation des emails
    form.email.addEventListener('change', function() {
        validEmail(this);

        const msgError = document.querySelector("#emaiL");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
    });
}

// REGEX pour formulaire
function validEmail(inputEmail) {
    
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let testEmail = emailRegex.test(inputEmail.value);

    if (testEmail) {
        inputEmail.classList.add("borderGreen");
        inputEmail.classList.remove("borderRed");
    } else {
        inputEmail.classList.add("borderRed");
        inputEmail.classList.remove("borderGreen");
    }

    if (inputEmail.value.length == 0) {
        inputEmail.classList.remove("borderGreen");
        inputEmail.classList.remove("borderRed");        
    }

    return testEmail;
}

function validLetter(inputLetter) {
    let letterRegex = new RegExp('[a-zA-Z ,.-]$', 'g');

    let testLetter = letterRegex.test(inputLetter.value);

    if (inputLetter.value.length < 2) {
        inputLetter.classList.add("borderRed");
        inputLetter.classList.remove("borderGreen");
        testLetter = false;
    } else if (testLetter) {
        inputLetter.classList.add("borderGreen");
        inputLetter.classList.remove("borderRed");
    } else {
        inputLetter.classList.add("borderRed");
        inputLetter.classList.remove("borderGreen");
    }


    if (inputLetter.value.length == 0) {
        inputLetter.classList.remove("borderGreen");
        inputLetter.classList.remove("borderRed");        
    }
    
    return testLetter;
}

function validAddress(inputAddress) {
    let addressRegex = new RegExp ('[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]$', 'g');

    let addressTest = addressRegex.test(inputAddress.value);

    if (inputAddress.value.length < 2) {
        inputAddress.classList.add("borderRed");
        inputAddress.classList.remove("borderGreen");
        addressTest = false;
    } else if (addressTest) {
        inputAddress.classList.add("borderGreen");
        inputAddress.classList.remove("borderRed");
    } else {
        inputAddress.classList.add("borderRed");
        inputAddress.classList.remove("borderGreen");
    }

    if (inputAddress.value.length == 0) {
        inputAddress.classList.remove("borderGreen");
        inputAddress.classList.remove("borderRed");
    }

    return addressTest;
}