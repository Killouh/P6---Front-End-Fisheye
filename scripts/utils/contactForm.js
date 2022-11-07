// Modal 
// launch modal form
const modalBtn = document.querySelectorAll(".contact_button")
const modalBg = document.querySelector("#contact_modal")
const closeCross = document.querySelector(".btn-close");
const body = document.querySelector("body");
const errorMessages = document.querySelectorAll(".error-msg");
const backDrop = document.getElementById("backdrop")

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalBg.style.display = "block";
  body.style.overflow = "hidden";

  errorMessages.forEach(errorMessage => {
    if (errorMessage.style.display = "block") {
      errorMessage.style.display = "none"
    }
  })
  

}

// close button 
closeCross.addEventListener("click", function() {
	if(thankYou.style.display = "block") {
	  formElement.reset();
	  closeModal();
	  thankYou.style.display = "none";
	  submitBtn.value = "C'est parti!";
	  formData.forEach(form => {
		  form.style.display = "block"
		});
	  
	}
	else {
	  closeModal();
	}
  })

  // other Close Cases (Backdrop and Escape keybord btn)
backDrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
	 closeModal();
  }
});

// close modal function 
function closeModal() {
modalBg.style.display = "none";
body.style.overflow = "auto";
}