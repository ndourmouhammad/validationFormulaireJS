const form = document.getElementById("myForm");
const success = document.getElementById("submitSuccess");

form.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    validateField(event.target);
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;
  clearErrors();
  clearSuccessMessage();

  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const motdepasse = document.getElementById("motdepasse").value.trim();

  if (!isValidName(prenom)) {
    showError(
      "prenomError",
      "Prénom invalide. Le prénom doit contenir entre 3 et 15 lettres."
    );
    isValid = false;
  }

  if (!isValidName(nom)) {
    showError(
      "nomError",
      "Nom invalide. Le nom doit contenir entre 3 et 15 lettres."
    );
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showError(
      "emailError",
      "Adresse email invalide. Veuillez entrer une adresse email valide."
    );
    isValid = false;
  }

  if (!isValidPassword(motdepasse)) {
    showError(
      "motdepasseError",
      "Mot de passe invalide. Le mot de passe doit contenir au moins 8 caractères."
    );
    isValid = false;
  }

  if (isValid) {
    form.style.display = "none";
    success.innerHTML =
      "Inscription réussie ! Votre inscription a été validée avec succès. Merci pour votre participation !";
  }
});

function validateField(input) {
  const fieldName = input.name;
  const value = input.value.trim();

  switch (fieldName) {
    case "prenom":
    case "nom":
      if (!isValidName(value)) {
        showError(
          `${fieldName}Error`,
          "Le champ doit contenir entre 3 et 15 lettres."
        );
      } else {
        clearError(`${fieldName}Error`);
      }
      break;
    case "email":
      if (!isValidEmail(value)) {
        showError("emailError", "Veuillez entrer une adresse email valide.");
      } else {
        clearError("emailError");
      }
      break;
    case "motdepasse":
      if (!isValidPassword(value)) {
        showError(
          "motdepasseError",
          "Le mot de passe doit contenir au moins 8 caractères."
        );
      } else {
        clearError("motdepasseError");
      }
      break;
  }
}

function isValidName(name) {
  const regex = /^[a-zA-Z]{3,15}$/;
  return regex.test(name);
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^.{8,}$/;
  return regex.test(password);
}

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearError(elementId) {
  document.getElementById(elementId).textContent = "";
}

function clearErrors() {
  clearError("prenomError");
  clearError("nomError");
  clearError("emailError");
  clearError("motdepasseError");
}

function clearSuccessMessage() {
  success.textContent = "";
}
