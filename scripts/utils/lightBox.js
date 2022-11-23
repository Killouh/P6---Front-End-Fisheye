// Afficher la lightbox 
export function displayCarrousel() {

  const lightBox = document.getElementById("carrousel");
  const main = document.querySelector("main");
  const carrousel = document.getElementById("center");
  const carrouselContent = document.getElementsByClassName("carrousel-content")
  const media = document.querySelectorAll("figure a");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  let focusedElementBeforeLightBox;
  const closeLightBox = document.getElementById("closeLightBox");

  // Revoir Index
  
  media.forEach((ele, index) => {
    ele.ariaHasPopup = "carrousel";
    let id = 0;
    
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      openLightBox(index);
      carrousel.innerHTML = "";
      const mediaClone = ele.cloneNode(true);
      if (mediaClone.firstChild.nodeName === "VIDEO") {
        mediaClone.firstChild.setAttribute("controls", "");
      }
      const mediaCloneTitle = ele.nextSibling.cloneNode(true);
      carrousel.append(mediaClone);
      carrousel.append(mediaCloneTitle);


      // Afficher media précédent et suivant
      function changeDirection (direction) {
        index += (direction === 'next' ? 1 : -1);
        if (index < 0) {
          index = id.length - 1;
        }
        else if (index === id.length) {
          index = 0;
        }
        openLightBox(id[index]);
      }

      

      



      /**
				   * @param {KeyboardEvent} e afficher les medias suivants ou précedants avec les fléches du clavier
				   */
      lightBox.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          changeDirection('next');
          elementFocus();
          e.preventDefault();
        }
        if (e.key === "ArrowLeft") {
          changeDirection('prev');
          elementFocus();
          e.preventDefault();
        }
      });

      /**
				   * @param {KeyboardEvent} e aller au media précédent en cliquant sur entrée quand le focus est sur la fléche gauche
				   */
      prevBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          changeDirection('prev');
        }
      });

      /**
				   * @param {KeyboardEvent} e aller au media suivant en cliquant sur entrée quand le focus est sur la fléche droite
				   */
      nextBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          changeDirection('next');
        }
      });

      /**
				   * @param {KeyboardEvent} e fermer la modale en cliquant sur enter quand le focus est sur la croix
				   */
      closeLightBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          close();
        }

      });

      /**
				   * @param {KeyboardEvent} e ouvrir la lightbox avec la touche entrée
				   */
      ele.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          openLightBox();
        }
      });
      prevBtn.addEventListener("click", changeDirection('prev'));
      nextBtn.addEventListener("click", changeDirection('next'));
    });
  });

  // Ouvrir la light box la fonction
  function openLightBox() {
    focusedElementBeforeLightBox = document.activeElement;
    lightBox.style = "display:flex; justify-content:center; align-items:center;";
    lightBox.ariaHidden = false;
    main.ariaHidden = true;
    header.ariaHidden = true;
    footer.ariaHidden = true;
    carrouselContent.style = "display : flex;"
    elementFocus();
  }

  // Naviguer dans la lightbox avec le clavier 'touch tab'
  function elementFocus() {
    let focusableElements = lightBox.querySelectorAll("#center, #prev, #next, #closeLightBox");
    focusableElements = Array.prototype.slice.call(focusableElements);
    //console.log(focusableElements);
    let firstElement = focusableElements[0];
    let lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();
    lightBox.addEventListener("keydown", trapTabKey);
    function trapTabKey(e) {
      let isTabPressed = e.key === "Tab";
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

  }

  /*****
	   * Fermer la lightbox la fonction
	   */

  function close() {
    lightBox.style.display = "none";
    lightBox.ariaHidden = true;
    main.ariaHidden = false;
    header.ariaHidden = false;
    footer.ariaHidden = false;
    focusedElementBeforeLightBox.focus();
  }

  // Fermer la lightbox avec le click de la souris
  closeLightBox.addEventListener("click", close);

  /****
	   * @param {KeyboardEvent} e fermer la lightbox avec la touche echap du clavier
	  ***/
  lightBox.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
}