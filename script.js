function afficherResultat(score, total) {
  document.querySelector(".zoneScore span").innerText = `${score} / ${total}`;
}

function afficherProposition(texte) {
  document.querySelector(".zoneProposition").innerText = texte;
}

function afficherMessageErreur(message) {
  document.getElementById("erreur-message").innerText = message;
}

function ouvrirEmail(nom, email, score) {
  const sujet = "Partage du score Speed Typing ⚡️";
  const message = `Salut, je suis ${nom} et je viens de réaliser le score ${score} sur Speed Typing !`;

  window.location.href =
    `mailto:${email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(message)}`;
}

function lancerJeu() {
  let score = 0;
  let index = 0;
  let propositions = listeMots;

  const boutonValider = document.getElementById("btnValiderMot");
  const input = document.getElementById("inputEcriture");
  const form = document.querySelector(".popup form");
  const radios = document.querySelectorAll(".optionSource input");

  afficherProposition(propositions[index]);
  afficherResultat(score, index);

  boutonValider.addEventListener("click", () => {
    const reponseUtilisateur = input.value.trim().toLowerCase();
    const bonneReponse = propositions[index].trim().toLowerCase();

    if (reponseUtilisateur === bonneReponse) {
      score++;
    }

    index++;
    input.value = "";

    afficherResultat(score, index);

    if (index >= propositions.length) {
      afficherProposition("⌨️ Repose tes doigts champion, tu progresses vite 🚀");
      boutonValider.disabled = true;
      return;
    }

    afficherProposition(propositions[index]);
  });

  radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      propositions = event.target.value === "1" ? listeMots : listePhrases;

      score = 0;
      index = 0;
      boutonValider.disabled = false;

      afficherProposition(propositions[index]);
      afficherResultat(score, index);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nom.length < 3) {
      afficherMessageErreur("Votre nom est trop court.");
      return;
    }

    if (!email.includes("@")) {
      afficherMessageErreur("L'email n'est pas valide.");
      return;
    }

    afficherMessageErreur("");

    ouvrirEmail(nom, email, `${score} / ${index}`);
  });
}