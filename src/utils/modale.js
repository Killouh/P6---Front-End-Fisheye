/**
 * Ouverture de la modale de formulaire depuis le HTML
 */
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  document.querySelector(".contact_modal-close").focus();
}

/**
 * fermeture de la modale de formulaire
 */
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
}
