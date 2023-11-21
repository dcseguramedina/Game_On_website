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
