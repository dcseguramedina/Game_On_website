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
