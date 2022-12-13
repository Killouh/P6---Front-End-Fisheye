import { TypeMediaFactory } from "./TypeMediaFactory.js";
import { getIndexCurrentMedia } from "../utils/filtres.js";

class LightboxFactory {
  /**
   * @param {number} id - l'identifiant du media ouvert
   * @param {objet} media - toutes les propriétés du media courant
   * @param {array} datas - tous les medias d'un photographe selon le tri
   * @retrun HTMLElement
   */
  constructor(id, media, datas) {
    this.currentId = Number(id);
    this.currentMedia = media;
    this.datas = datas;

    this.boxContentMedia = document.createElement("div");
    this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());

    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("keyup", this.onKeyUp);


  }

  /**
   * @param {object} media le nouveau media courant
   * @returns object
   */
  setCurrentMedia(media) {
    this.currentMedia = media;
  }
  getCurrentMedia() {
    return this.currentMedia;
  }
  /**
   * @param {number} id
   */
  setCurrentId(id) {
    this.currentId = id;
  }
  /**
   * @returns le nouvel id
   */
  getCurrentId() {
    return Number(this.currentId);
  }

  /**
   * gestion des evenements au clavier
   * @param {KeyboardEvent} evt
   */
  onKeyUp(evt) {
    if (evt.key === "Escape") {
      this.closeLb(evt);
    } else if (evt.key === "ArrowRight") {
      this.nextMedia(evt);
    } else if (evt.key === "ArrowLeft") {
      this.prevMedia(evt);
    }
  }

  /**
   * Fermeture de la modale (Lightbox)
   * @param {MouseEvent} evt
   */
  closeLb(evt) {
    evt.preventDefault();

    const modal = document.getElementById("lightbox");
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";

    document
      .querySelectorAll("article .card_media-container")
      .forEach((elt) => {
        elt.setAttribute("tabindex", "0");
      });

    // Je supprime le contenu de la LB
    document
      .querySelector("div.lightbox_bloc")
      .removeChild(document.querySelector(".lightbox-container"));

    const section = document.querySelector("section.media_content");
    section.setAttribute("tabindex", "0");
    section.setAttribute("aria-hidden", "false");

    document.querySelectorAll(".likes_container").forEach((elt) => {
      elt.setAttribute("tabindex", "0");
    });

    const footer = document.querySelector("footer");
    footer.setAttribute("tabindex", "0");

    window.scrollTo(0, 0);

    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("click", this.closeLb);
  }

  // passage au média suivant
  nextMedia(evt) {
    evt.preventDefault();
    // faire un setter
    this.setCurrentId(
      document
        .querySelector(".ligthbox__container-box > div")
        .getAttribute("data-id")
    );

    const currentMediaId = getIndexCurrentMedia(
      this.getCurrentId(),
      this.datas
    );

    if (this.datas.length - 1 === currentMediaId) {
      this.setCurrentMedia(this.datas[0]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    } else {
      this.setCurrentMedia(this.datas[currentMediaId + 1]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    }
    document.removeEventListener("keyup", this.navToRight);
  }

  /**
   * passage au média précédent
   * @param {MouseEvent} evt
   * @returns object
   */
  prevMedia(evt) {
    evt.preventDefault();
    this.setCurrentId(
      document
        .querySelector(".ligthbox__container-box > div")
        .getAttribute("data-id")
    );

    const currentMediaId = getIndexCurrentMedia(
      this.getCurrentId(),
      this.datas
    );

    if (currentMediaId === 0) {
      const i = this.datas.length - 1;
      this.setCurrentMedia(this.datas[i]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    } else {
      this.setCurrentMedia(this.datas[currentMediaId - 1]);
      this.typeMedia = new TypeMediaFactory(this.getCurrentMedia());
      this.onLoad();
    }
    document.removeEventListener("keyup", this.navToLeft);
  }

  /**
   * Affiche le nouveau contenu de la modale Lightbox (précédent / suivant)
   */
  onLoad() {
    const containerBox = document.querySelector(".ligthbox__container-box");
    const title = this.typeMedia.getAttribute("data-title");
    const lbTitle = document.querySelector(".lightbox__title");
    lbTitle.textContent = title;

    containerBox.innerHTML = "";

    containerBox.appendChild(this.typeMedia);
    this.boxContentMedia.appendChild(containerBox);
    this.boxContentMedia.appendChild(lbTitle);

    const main = document.querySelector("main");
    const modal = document.getElementById("lightbox");
    const header = document.querySelector("header");

    let focusedElementBeforeModal;

    // eslint-disable-next-line no-unused-vars
    focusedElementBeforeModal = document.activeElement;

    modal.ariaHidden = false;
    header.ariaHidden = true;
    main.ariaHidden = true;

    let focusableElements = modal.querySelectorAll("button");
    console.log(focusableElements)
    focusableElements = Array.prototype.slice.call(focusableElements);
    let firstElement = focusableElements[0];
    console.log(firstElement)
    let lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();
    modal.addEventListener("keydown", trapTabKey);
    function trapTabKey(e) {
      if (e.key === "Tab") {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }

      }
    }
    document.getElementById("right").focus();


  }



  /**
   * @returns HTMLElement
   */
  getLightboxDOM() {
    const div = document.createElement("div");
    const btnClose = document.createElement("button");
    const spanCloseIcon = document.createElement("span");

    const btnLeft = document.createElement("button");
    const spanLeftIcon = document.createElement("span");

    const btnRight = document.createElement("button");
    const spanRightIcon = document.createElement("span");

    const contentMedia = document.createElement("div");
    const title = document.createElement("p");

    div.classList.add("lightbox-container");

    this.boxContentMedia.classList.add("lightbox-media");
    this.boxContentMedia.id = this.getCurrentId();

    btnLeft.classList.add("lightbox-btn", "left");
    btnLeft.setAttribute("id","left")
    btnLeft.setAttribute("tabindex", "0");
    btnLeft.setAttribute("aria-label", "média précédent");
    btnLeft.addEventListener("click", this.prevMedia.bind(this));

    btnRight.classList.add("lightbox-btn", "right");
    btnRight.setAttribute("id","right")
    btnRight.setAttribute("tabindex", "0");
    btnRight.setAttribute("aria-label", "média suivant");
    btnRight.addEventListener("click", this.nextMedia.bind(this));

    spanCloseIcon.classList.add("fa", "fa-times");
    spanLeftIcon.classList.add("fa", "fa-angle-left");
    spanRightIcon.classList.add("fa", "fa-angle-right");

    btnClose.classList.add("lightbox-btn", "close");
    btnClose.setAttribute("id","close")
    btnClose.setAttribute("tabindex", "0");
    btnClose.setAttribute("aria-label", "Bouton de fermeture");

    title.classList.add("lightbox__title");
    title.textContent = this.currentMedia.title;

    contentMedia.classList.add("ligthbox__container-box");
    contentMedia.appendChild(this.typeMedia);




    // DOM
    this.boxContentMedia.appendChild(contentMedia);
    this.boxContentMedia.appendChild(title);

    btnClose.appendChild(spanCloseIcon);
    btnLeft.appendChild(spanLeftIcon);
    btnRight.appendChild(spanRightIcon);

    div.appendChild(btnClose);
    div.appendChild(btnLeft);
    div.appendChild(btnRight);
    div.appendChild(this.boxContentMedia);
    // écouteur sur la fermeture
    div
      .querySelector(".lightbox-btn.close")
      .addEventListener("click", this.closeLb.bind(this));



    return div;
  }


}
export { LightboxFactory };
