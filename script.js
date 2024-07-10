const form = document.querySelector("form");

// Quand on submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();

  let isValid = true;

  // Réinitialiser les messages d'erreur
  document.getElementById("prenomError").textContent = "";
  document.getElementById("nomError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("motdepasseError").textContent = "";

  // Récupérer les valeurs des champs
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const motdepasse = document.getElementById("motdepasse").value;

  // Définir les expressions régulières
  const regexnoms = /^[a-zA-Z]{3,15}$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword = /^.{8,}$/;

  // Valider le prénom
  if (!regexnoms.test(prenom)) {
    document.getElementById("prenomError").textContent =
      "Prénom invalide. Le prénom doit contenir entre 3 et 15 lettres.";
    isValid = false;
  }

  // Valider le nom
  if (!regexnoms.test(nom)) {
    document.getElementById("nomError").textContent =
      "Nom invalide. Le nom doit contenir entre 3 et 15 lettres.";
    isValid = false;
  }

  // Valider l'email
  if (!regexEmail.test(email)) {
    document.getElementById("emailError").textContent =
      "Adresse email invalide. Veuillez entrer une adresse email valide.";
    isValid = false;
  }

  // Valider le mot de passe
  if (!regexPassword.test(motdepasse)) {
    document.getElementById("motdepasseError").textContent =
      "Mot de passe invalide. Le mot de passe doit contenir au moins 8 caractères.";
    isValid = false;
  }

  // Si toutes les validations sont réussies, soumettre le formulaire
  if (isValid) {
    alert("Tous les champs sont valides. Formulaire soumis !");
    // Vous pouvez envoyer le formulaire ou effectuer d'autres actions ici
    // document.getElementById("form").submit(); // Décommenter cette ligne pour soumettre le formulaire
}
});
