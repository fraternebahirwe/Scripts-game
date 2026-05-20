// Fonction qui affiche le score du joueur à l'écran
// score = nombre de bonnes réponses
// nbMotsProposes = nombre total de mots déjà proposés
function afficherResultat(score, nbMotsProposes) {

    // On sélectionne le span situé dans .zoneScore
    let spanScore = document.querySelector(".zoneScore span");

    // On modifie le texte du span avec le score actuel
    spanScore.innerText = `${score} / ${nbMotsProposes}`;
}


// Fonction qui affiche le mot ou la phrase à taper
function afficherProposition(proposition) {

    // On récupère la zone où le mot doit apparaître
    let zoneProposition = document.querySelector(".zoneProposition");

    // On affiche la proposition dans cette zone
    zoneProposition.innerText = proposition;
}


// Fonction qui prépare automatiquement un email de partage du score
function afficherEmail(nom, email, score) {

    // Sujet de l'email
    let sujet = "Partage du score Speed Typing ⚡️";

    // Contenu du message de l'email
    let message = `Salut, je suis ${nom} et je viens de réaliser le score ${score} sur Speed Typing !`;

    // Création d'un lien mailto
    // encodeURIComponent permet de sécuriser les espaces et caractères spéciaux
    let mailto = `mailto:${email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(message)}`;

    // Ouvre automatiquement l'application mail de l'utilisateur
    window.location.href = mailto;
}


// Fonction qui vérifie si le nom est valide
function validerNom(nom) {

    // Si le nom contient moins de 3 caractères
    if (nom.length < 3) {

        // On déclenche une erreur personnalisée
        throw new Error("Votre nom est trop court.");
    }
}


// Fonction qui vérifie si l'email est valide
function validerEmail(email) {

    // includes("@") vérifie si le texte contient le caractère @
    // ! inverse la réponse
    // Donc ici : "si l'email ne contient PAS @"
    if (!email.includes("@")) {

        // On déclenche une erreur
        throw new Error("L'email n'est pas valide.");
    }
}


// Fonction qui affiche un message d'erreur sous le bouton Envoyer
function afficherMessageErreur(messageErreur) {

    // On récupère la zone destinée aux erreurs
    let zoneErreur = document.getElementById("erreur-message");

    // On affiche le message d'erreur dans cette zone
    zoneErreur.innerText = messageErreur;
}


// Fonction principale qui lance le jeu
function lancerJeu() {

    // Variable contenant le score du joueur
    let score = 0;

    // Variable contenant l'index du mot actuel
    let i = 0;

    // Liste des mots utilisée par défaut
    let listeProposition = listeMots;


    // Sélection du bouton Valider
    let btnValiderMot = document.getElementById("btnValiderMot");

    // Sélection du champ où l'utilisateur écrit
    let inputEcriture = document.getElementById("inputEcriture");

    // Sélection du formulaire de partage
    let form = document.querySelector(".popup form");


    // Affiche le premier mot
    afficherProposition(listeProposition[i]);

    // Affiche le score de départ
    afficherResultat(score, i);


    // Événement lancé lorsque le joueur clique sur le bouton Valider
    btnValiderMot.addEventListener("click", () => {

        // Vérifie si le texte écrit est identique au mot demandé
        // trim() enlève les espaces inutiles
        // toLowerCase() transforme tout en minuscules
        if (
            inputEcriture.value.trim().toLowerCase() ===
            listeProposition[i].trim().toLowerCase()
        ) {

            // Si la réponse est correcte, on ajoute 1 point
            score++;
        }

        // Passe au mot suivant
        i++;

        // Met à jour le score à l'écran
        afficherResultat(score, i);

        // Vide le champ de saisie
        inputEcriture.value = "";


        // Vérifie si la liste est terminée
        if (listeProposition[i] === undefined) {

            // Affiche un message de fin
            afficherProposition("⌨️ Repose tes doigts champion ,🚀 Tu progresses vite !⚡️");

            // Désactive le bouton Valider
            btnValiderMot.disabled = true;

        } else {

            // Sinon affiche le mot suivant
            afficherProposition(listeProposition[i]);
        }
    });


    // Sélection de tous les boutons radio
    let listeBtnRadio = document.querySelectorAll(".optionSource input");


    // Boucle sur chaque bouton radio
    for (let index = 0; index < listeBtnRadio.length; index++) {

        // Détection du changement d'option
        listeBtnRadio[index].addEventListener("change", (event) => {

            // Si l'utilisateur choisit "Mots"
            if (event.target.value === "1") {

                // On utilise la liste des mots
                listeProposition = listeMots;

            } else {

                // Sinon on utilise la liste des phrases
                listeProposition = listePhrases;
            }


            // Réaffiche la proposition actuelle
            afficherProposition(listeProposition[i]);

            // Met à jour le score affiché
            afficherResultat(score, i);
        });
    }


    // Événement déclenché lors de l'envoi du formulaire
    form.addEventListener("submit", (event) => {

        // Empêche le rechargement automatique de la page
        event.preventDefault();

        // try permet d'essayer un bloc de code
        // si une erreur apparaît, le catch la récupère
        try {

            // Récupère le nom écrit par l'utilisateur
            let nom = document.getElementById("nom").value.trim();

            // Récupère l'email écrit par l'utilisateur
            let email = document.getElementById("email").value.trim();


            // Vérifie si le nom est valide
            validerNom(nom);

            // Vérifie si l'email est valide
            validerEmail(email);


            // Efface les anciens messages d'erreur
            afficherMessageErreur("");


            // Prépare le score à envoyer
            let scoreEmail = `${score} / ${i}`;

            // Lance l'ouverture de l'email
            afficherEmail(nom, email, scoreEmail);

        } catch (erreur) {

            // Si une erreur apparaît, on affiche son message
            afficherMessageErreur(erreur.message);
        }
    });
}