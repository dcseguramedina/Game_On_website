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
