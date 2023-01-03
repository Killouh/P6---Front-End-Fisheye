import { Api } from "../api/api.js";
import { LightboxFactory } from "../factories/lightboxFactory.js";
import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { SortFactory } from "../factories/SortFactory.js";
import {
  getDataByPop,
  getDataByTitle,
  getDataByDate,
  getPhotographer,
  getDatasByPhotographId,
  getSelectedMedia,
} from "../utils/filtres.js";

class Photographer {
  constructor() {
    this.photographers = new Api("https://killouh.github.io/P6---Front-End-Fisheye/data/photographers.json");
    this.id = this.extractUrlParam();
    this.mediaContainer = document.createElement("div");
    this.section = document.createElement("section");
    this.photographersMedias = this.getDatas();
  }

  /**
   * @returns {ArrayOfObject}
   */
  getDatas() {
    return this.photographersMedias;
  }

  /**
   * setter
   * @param {ArrayOfObject} datas
   */
  setDatas(datas) {
    this.photographersMedias = datas;
  }

  /**
   * reccuperation de l'id via l'url courante.
   * @returns {number} l'id du photographe
   */
  extractUrlParam() {
    const url = window.location.href;
    const regex = /([^&=]+)=?([^&]*)/g;
    // retourne les parametres de l'url sous forme de tableaux
    const getId = regex.exec(url);
    return Number(getId[2]);
  }

  /**
   * rendu du photographe
   * @param {array} userPhotograph les données d'un photographe
   * @param {array} datas les médias du photographe
   */
  async displayPhotographer(userPhotograph, datas) {
    const photographHeader = document.querySelector(".photograph-header");

    const photographer = new PhotographerFactory(
      userPhotograph.id,
      userPhotograph.name,
      userPhotograph.portrait,
      userPhotograph.city,
      userPhotograph.country,
      userPhotograph.price,
      userPhotograph.tagline,
      datas
    );

    photographHeader.appendChild(photographer.getPhotographerDOM());
    // mise en place du nom dans la modale de usefiltres
    const titleForm = document.querySelector(".contact_modal-title");
    const span = document.createElement("span");
    span.style.display = "block";

    span.textContent = userPhotograph.name;
    titleForm.appendChild(span);
  }

  /**
   * rendu des filtres
   * @returns {HTMLElement}
   */
  displaySortFilter() {
    this.section.classList.add("media_content");
    const selectedField = new SortFactory().getSortMediaDom();
    this.section.insertAdjacentElement("afterbegin", selectedField);
  }

  /**
   *  rendu des médias
   * @returns {HTMLElement}
   */
  async displayMedia() {
    const photographHeader = document.querySelector(".photograph-header");

    this.mediaContainer.classList.add("media-container");
    this.mediaContainer.id = "media-container";
    this.section.appendChild(this.mediaContainer);
    this.section.setAttribute("aria-hidden", "false");

    photographHeader.after(this.section);

    const fieldOptions = document.querySelectorAll(".form-options");
    fieldOptions.forEach(() => {
      document.addEventListener("input", this.sortRendered.bind(this));
    });

    // instanciation des medias 1er rendu
    this.getDatas().forEach((data) => {
      return this.mediaContainer.appendChild(
        new MediaFactory(data).getCardMediaDom()
      );
    });
  }

  /**
   * Le nouveau rendu des médias après le tri
   * @param {array} mediaOrderedBy - tableau des données réorganisé
   * @returns {HTMLElement}
   */
  getNewRenderedMedia(mediaOrderedBy) {
    document.querySelectorAll(".media-box").forEach((elt) => {
      elt.remove();
    });

    mediaOrderedBy.forEach((card) => {
      return this.mediaContainer.appendChild(
        new MediaFactory(card).getCardMediaDom()
      );
    });
  }

  /**
   * @param {keyboardEvent} evt
   */
  sortRendered(evt) {
    evt.preventDefault();

    switch (evt.target.value) {
      case "popularite":
        // eslint-disable-next-line no-case-declarations
        const sortedMediaByPop = getDataByPop(this.getDatas());
        this.setDatas(sortedMediaByPop);
        this.getNewRenderedMedia(sortedMediaByPop);
        this.displayLightbox();
        break;
      case "titre":
        // eslint-disable-next-line no-case-declarations
        const sortedMediaByTitle = getDataByTitle(this.getDatas());
        this.setDatas(sortedMediaByTitle);
        this.getNewRenderedMedia(sortedMediaByTitle);
        this.displayLightbox();
        break;
      case "date":
        // eslint-disable-next-line no-case-declarations
        const sortedMediaByDate = getDataByDate(this.getDatas());
        this.setDatas(sortedMediaByDate);
        this.getNewRenderedMedia(sortedMediaByDate);
        this.displayLightbox();
        break;
    }
  }

  /**
   *  rendu de la lightbox
   * @returns {HTMLElement}
   */
  async displayLightbox() {
    const lightbox = document.querySelector("#lightbox");
    const divDom = document.createElement("div");
    divDom.classList.add("lightbox_bloc");
    // creation de la LB au click
    const selectedArticle = document.querySelectorAll(".card_media");

    selectedArticle.forEach((elt) => {
      elt.addEventListener("keyup", this.getDataForLightboxKb.bind(this));
      elt.addEventListener("click", this.getDataForLightbox.bind(this));
    });

    document.querySelector("button.lightbox-btn.close");

    return lightbox.appendChild(divDom);
  }

 
    

  

  /**
   * @param {KeyboardEvent} evt
   */
  getDataForLightboxKb(evt) {
    if (evt.key === "Enter") {
      this.getDataForLightbox(evt);
    }
  }

  /**
   * @param {Event} evt
   */
  getDataForLightbox(evt) {
    let currentId;

    if (evt.key === "Enter") {
      currentId = Number(evt.target.lastChild.firstChild.id);
    } else {
      currentId = Number(evt.target.id);
    }

    const divDom = document.querySelector(".lightbox_bloc");
    const object = getSelectedMedia(currentId, this.getDatas())[0];

    // supprime l'élément précédent si il y a.
    divDom.innerHTML = "";

    divDom.appendChild(
      new LightboxFactory(currentId, object, this.getDatas()).getLightboxDOM()
    );
  


    document.removeEventListener("click", this.getDataForLightbox.bind(this));
    document.removeEventListener("keyup", this.getDataForLightboxKb.bind(this));

    
  }

  async init() {
    // reccup les donnée de l'api
    const { photographers, media } = await this.photographers.getData();
    const photographer = await getPhotographer(this.id, photographers);
    const datas = await getDatasByPhotographId(this.id, media);

    this.setDatas(datas);

    this.displayPhotographer(photographer, this.getDatas());
    this.displaySortFilter();
    this.displayMedia();
    this.displayLightbox();
    
  }
}
const user = new Photographer();
user.init();
