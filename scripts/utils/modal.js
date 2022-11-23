const main = document.querySelector("main");
const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");
const close = document.getElementById("closeModal");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const body = document.querySelector("body");
let focusedElementBeforeModal;

// eslint-disable-next-line no-unused-vars
function displayModal() {
  focusedElementBeforeModal = document.activeElement;
  modal.style = "display:block; padding: 30px auto;";
  modal.ariaHidden = false;
  header.ariaHidden = true;
  main.ariaHidden = true;
  footer.ariaHidden = true;
    
  let focusableElements = modal.querySelectorAll("input:not([disabled]), textarea:not([disabled]), button, [aria-label='fermer']");
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
}

// Fermer la modal la fonction
function closeModal() {
  modal.style.display = "none";
  modal.ariaHidden = true;
  header.ariaHidden = false;
  main.ariaHidden = false;
  footer.ariaHidden = false;
  body.style.overflow = "visible";
  focusedElementBeforeModal.focus();
}

/**
 * @param {keyboardEvent} e Fermer la modal avec le bouton entrer quand le focus est sur la croix
 */
close.addEventListener("keydown", (e)=>{
  if (e.key === "Enter"){
    closeModal();
  }
});

/***
 * @param {KeyboardEvent} e fermer la modal via la touche escape
*/
modal.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    closeModal();
  }	
});

/**
 * afficher les messages d'erreurs
 */
const fields = document.querySelectorAll("input[required], textarea[required]");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  let valid = true;
  fields.forEach(field =>{
    removeMsg(field);
    if(field.checkValidity()){
      return true;
    }else{
      valid = 0 ;
      let message = field.title ? field.title : field.validationMessage;
      let showMessage = document.createElement("p");
      showMessage.textContent = message;
      showMessage.classList.add("error");
      showMessage.ariaInvalid="true" ;
      field.parentNode.appendChild(showMessage);    
      return false;
    }
  });
  if(valid){
    console.log(` %cNom: ${document.getElementById("first").value} \n Prénom : ${document.getElementById("last").value} \n Email: ${document.getElementById("email").value} \n\n Message: \n ${document.getElementById("message").value}`,"font-weight:bold");
    form.reset();
    closeModal();
  }

  /**
	 * @param {string} field supprime les messages d'erreurs générés avant 
	 */
  function removeMsg(field){
    let msg = document.querySelectorAll(".error");
    msg.forEach((message) =>{
      if(message.parentNode === field.parentNode){
        field.parentNode.removeChild(message);
      }
    });
  }
});