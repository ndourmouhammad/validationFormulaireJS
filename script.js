const form = document.getElementById("myForm");
const success = document.getElementById("submitSuccess");
const submitBtn = document.getElementById("submitBtn");
const fields = ["prenom", "nom", "email", "motdepasse"];
let currentFieldIndex = 0;

form.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    validateField(event.target);
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  clearErrors();
  clearSuccessMessage();

  let isValid = true;

  fields.forEach((field) => {
    const value = document.getElementById(field).value.trim();
    if (!validateAndShowNext(field, value)) {
      isValid = false;
    }
  });

  if (isValid) {
    form.style.display = "none";
    success.innerHTML =
      "Inscription réussie ! Votre inscription a été validée avec succès. Merci pour votre participation !";
  }
});

function validateField(input) {
  const fieldName = input.name;
  const value = input.value.trim();

  if (validateAndShowNext(fieldName, value)) {
    enableSubmitButtonIfValid();
  } else {
    disableSubmitButton();
  }
}

function validateAndShowNext(fieldName, value) {
  let isValid = false;

  switch (fieldName) {
    case "prenom":
    case "nom":
      isValid = isValidName(value);
      if (!isValid) {
        showError(
          `${fieldName}Error`,
          "Le champ doit contenir entre 3 et 15 lettres."
        );
      } else {
        clearError(`${fieldName}Error`);
        showNextField(fieldName);
      }
      break;
    case "email":
      isValid = isValidEmail(value);
      if (!isValid) {
        showError("emailError", "Veuillez entrer une adresse email valide.");
      } else {
        clearError("emailError");
        showNextField(fieldName);
      }
      break;
    case "motdepasse":
      isValid = isValidPassword(value);
      if (!isValid) {
        showError(
          "motdepasseError",
          "Le mot de passe doit contenir au moins 8 caractères."
        );
      } else {
        clearError("motdepasseError");
      }
      break;
  }

  return isValid;
}

function showNextField(currentField) {
  const currentIndex = fields.indexOf(currentField);
  if (currentIndex >= 0 && currentIndex < fields.length - 1) {
    document
      .getElementById(`${fields[currentIndex + 1]}Div`)
      .classList.remove("hidden");
  }
}

function enableSubmitButtonIfValid() {
  let allValid = true;
  fields.forEach((field) => {
    const value = document.getElementById(field).value.trim();
    if (!validateAndShowNext(field, value)) {
      allValid = false;
    }
  });

  if (allValid) {
    submitBtn.disabled = false;
  }
}

function disableSubmitButton() {
  submitBtn.disabled = true;
}

function isValidName(name) {
  const regex = /^[a-zA-Z\s]{3,15}$/;
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
  fields.forEach((field) => {
    clearError(`${field}Error`);
  });
}

function clearSuccessMessage() {
  success.textContent = "";
}
