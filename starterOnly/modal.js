function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements (modal)
const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");
const closeModalBtn = document.querySelectorAll(".close");

// Launch modal event
modalBtn.addEventListener("click", launchModal);

// Launch modal form
function launchModal() {
  modalBg.style.display = "block";
  modalContent.style.display = "block";
}

// Launch close event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal form
function closeModal() {
  modalBg.style.display = "none";
}

// Implement form inputs

// Create field class in order to simplify field's validation
class Field {
  // Define details
  constructor(docName, regex, docErrorMsg, errorMsg) {
    this.docName = docName;
    this.regex = regex;
    this.docErrorMsg = docErrorMsg;
    this.errorMsg = errorMsg;
  }
  // Define methods
  // Add an event to listen to the changes and check the inputs 
  addEvent() {
    this.docName.addEventListener("focusout", (event) => {
      event.preventDefault();
      this.checkField();
    })
  }
  // Check the field and display an error message if needed
  checkField() {
    let valid = this.regex.test(this.docName.value);
    if (valid === false) {
      this.docName.style.border = "2px outset red";
      this.docErrorMsg.textContent = this.errorMsg;
      return false
    } else {
      this.docName.style.border = "none";
      this.docErrorMsg.textContent = "";
      return true
    }
  }
}

// Create field object (firstName, lastName, email)
// Add eventListener (firstName, lastName, email)
let firstName = new Field(
  document.getElementById("firstName"),
  new RegExp(/^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
  document.getElementById("firstNameErrorMsg"),
  `Veuillez entrer 2 caractères valides ou plus pour le champ du prénom`
);
firstName.addEvent();

let lastName = new Field(
  document.getElementById("lastName"),
  new RegExp(/^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
  document.getElementById("lastNameErrorMsg"),
  `Veuillez entrer 2 caractères valides ou plus pour le champ du nom`
);
lastName.addEvent();

let email = new Field(
  document.getElementById("email"),
  new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+\.[\w-]{2,4}$/),
  document.getElementById("emailErrorMsg"),
  `Veuillez entrer une adresse mail valide`
);
email.addEvent();

// Create field object (birthdate)
const birthDateInput = document.getElementById("birthDate")

// Add eventListener to birthdate field
birthDateInput.addEventListener("focusout", () => validateBirthDate(birthDateInput.value));

// Validate birthdate field and display an error message if needed
function validateBirthDate(birthDate) {
  // Check if the field is not empty
  if (!birthDate){
    alert(`Veuillez entrer une date`)
    return false;
  }
  // Check if the input is in the correct format
  const birthDateFormat = new RegExp(/(18|19|20)\d{2}-(0[1-9]|1[0,1,2])-(0[1-9]|[12][0-9]|3[01])/)
  const validFormat = birthDateFormat.test(birthDate)
  
  if (!validFormat) {
    alert(`Veuillez entrer une date valide`)
    return false;
  }

  // Parse the date to compare with the current date
  const splitDate = birthDate.split("-");
  const year = parseInt(splitDate[0]);
  const month = parseInt(splitDate[1]) - 1;
  const day = parseInt(splitDate[2]);
  const dateInput = new Date(year, month, day);
  
  // Compare with the current date and check the minimun age for the inscription (15yo)
  const dateCurrent = new Date();
  const dateControl = new Date(dateCurrent.getFullYear() - 15, dateCurrent.getMonth(), dateCurrent.getDate());
  
  if (dateInput > dateControl) {
    alert(`Un âge minimum de 15 ans est requis pour s'inscrire`)
    return false;
  }
  
  return true;
}

// Create field object (quantity)
// Recover the DOM element for the quantity inputs
const quantityInput = document.getElementById("quantity");

// Add eventListener to quantity field
quantityInput.addEventListener("focusout", () => validateQuantityInput(parseInt(quantityInput.value,10)));

// Check the quantity input and display an alert if needed
function validateQuantityInput(quantity) {
  // if the selected quantity is between 1 and 99, validate
  if (quantity > 0 && quantity <= 99) {
    return true
  }
  // if the selected quantity exceeds 99, display an alert
  else if (quantity > 99) {
    alert(`La quantité maximale est de 99`);
    return false
  }
  // if the quantity has not been selected, display an alert
  else {
    alert(`Veuillez sélectionner une quantité afin de continuer`);
    return false
  }
}

// Create field object (city)
// Recover the DOM elements for the city inputs
let locationInput = document.querySelectorAll('input[name="location"]')

// Check the location input and display an alert if needed
function validateLocation() {  
  // Convert the "locationInput" node into an array
  const locationList = Array.from(locationInput)
  // Use some() method to test whether at least one element in the array is ckecked
  const location = locationList.some((input) => input.checked === true)
  // if the is no checked input, display an alert
  if (!location) {
    alert(`Vous devez choisir une ville`)
    return false
  }
  return true
}

// Create field object (conditions)
// Recover the DOM element for the conditions
let checkbox1Input = document.getElementById("checkbox1")

// Add eventListener to conditions field
checkbox1Input.addEventListener("change", validateCheckBox)

// Check the input and display an alert if needed
function validateCheckBox(){
  let checked1 = checkbox1Input.checked
  if (!checked1 ) {
    alert(`Vous devez vérifier que vous acceptez les termes et conditions`)
    return false
  }
  return true
}

// Implement submit btn  
// Recover the DOM element for the "submitBtn"
const submitBtn = document.getElementById("submitBtn");

// // Listen to the click and check the inputs
submitBtn.addEventListener("submit", (event) => {
  event.preventDefault();
    // if the form is invalid, display an alert
    if (firstName.regex.test(firstName.docName.value) !== true ||
      lastName.regex.test(lastName.docName.value) !== true ||
      email.regex.test(email.docName.value) !== true ||
      validateBirthDate(birthDateInput.value) !== true ||
      validateQuantityInput(parseInt(quantityInput.value,10)) !== true ||
      validateLocation() !== true ||
      validateCheckBox() !== true
    ) {
      alert(`Le formulaire est incorrect. Veuillez bien remplir tout les champs !`);
    } else {
      // reset the form and send confirmaion message
      document.forms[0].reset()
      launchConfirmation()
    }
})
