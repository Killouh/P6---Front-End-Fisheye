const main = document.querySelector("main");
const modal = document.getElementById("contact_modal");
const header = document.querySelector("header");
const body = document.querySelector("body");
let focusedElementBeforeModal;

// eslint-disable-next-line no-unused-vars
function displayModal() {
  focusedElementBeforeModal = document.activeElement;
  modal.style = "display:block; padding: 30px auto;";

  modal.ariaHidden = false;
  header.ariaHidden = true;
  main.ariaHidden = true;
    
  let focusableElements = modal.querySelectorAll("input:not([disabled]), textarea:not([disabled]), button, [aria-label='fermeture de la modale']");
  focusableElements = Array.prototype.slice.call(focusableElements);
  let firstElement = focusableElements[0];
  let lastElement = focusableElements[focusableElements.length - 1];
  firstElement.focus();
  modal.addEventListener("keydown",trapTabKey);
  function trapTabKey(e) {
    if (e.key === "Tab"){
      if(document.activeElement === lastElement){
        e.preventDefault();
        firstElement.focus();
      } 
			
    }
  }
  document.getElementById("prenom").focus();
}

// Fermer la modal
function closeModal() {
  modal.style.display = "none";
  modal.ariaHidden = true;
  header.ariaHidden = false;
  main.ariaHidden = false;
  body.style.overflow = "visible";
  focusedElementBeforeModal.focus();
}