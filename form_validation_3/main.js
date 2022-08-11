const form = document.querySelector("form");
const email = document.querySelector("#mail");
const errorMessage = document.querySelector("span");

email.oninput = () => {
  if (!email.checkValidity()) {
    showErrorMessage();
  } else {
    errorMessage.textContent = "";
  }
}

form.onsubmit = (e) => {
  if (!email.checkValidity()) {
    e.preventDefault();
    showErrorMessage();
  } else {
    errorMessage.textContent = "";
  }
}

function showErrorMessage() {
  if (email.validity.valueMissing) {
    errorMessage.textContent = "Enter email to send the form.";
  } else if (email.validity.typeMismatch) {
    errorMessage.textContent = "Enter email with correct syntax.";
  } else if (email.validity.tooShort) {
    errorMessage.textContent = `Enter email with at least 10 signs. Need ${10 - email.value.length} more signs.`;
  }
};