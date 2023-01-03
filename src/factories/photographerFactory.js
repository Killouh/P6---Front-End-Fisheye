import { getAllLike } from "../utils/likes.js";

import { MediaFactory } from "./mediaFactory.js";

class PhotographerFactory {
  constructor(id, name, portrait, city, country, price, tagline, datas) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.price = price;
    this.tagline = tagline;
    this.datas = datas;
  }

  /**
   * page d'accueil, carte des photographes
   * @returns {HTMLElement}
   */
  getUserCardDOM() {
    const baseUrl = "https://killouh.github.io/P6---Front-End-Fisheye/public/photographer.html";
    const article = document.createElement("article");

    article.classList.add("article");

    const cardPhotographer = `
    <a href="${baseUrl}?id=${this.id}" aria-label="voir le travail du photographe ${this.name}">
      <div class="face-box">
        <div class="box_img">
          <img src="https://killouh.github.io/P6---Front-End-Fisheye/public/assets/photographers/${this.portrait}" loading="lazy" alt="photographe ${this.name}">
        </div>
        <h2 role="heading">${this.name}</h2>
      </div>
    </a>
    <div class="box_desc">
      <h3 class="box_desc__localite" ">${this.city}, ${this.country}</h3>
      <p class="box_desc__desc">${this.tagline}</p>
      <p class="box_desc__price">${this.price}€/jour</p>
    </div>
    `;

    article.innerHTML = cardPhotographer;

    return article;
  }

  /**
   * Page d'un photographe
   * @returns HTMLElement
   */
  getPhotographerDOM() {
    const headerBlock = document.createElement("section");
    const dataHeart = new MediaFactory(this.datas);
    const likes = getAllLike(dataHeart.medias);
    const body = document.querySelector("body");
    const footer = document.createElement("footer");
    headerBlock.classList.add("header__block");
    footer.setAttribute("role", "contentinfo");
    footer.setAttribute("tabindex", "0");
    footer.classList.add("like-price");
    footer.innerHTML = `
      <div class="likes_container-footer">
        <span aria-label="nombre de j'aime ${likes} likes" >${likes}</span>
        <span aria-hidden="true">❤</span>
      </div>
      <span  aria-label="tarification par jours ${this.price}€">${this.price}€ / jour</span>
    `;

    headerBlock.innerHTML = `
    <div class="header__block-left">  
      <h1 class="header__block-name" tabindex="0" aria-hidden="false" aria-label="Photographe ${this.name}">${this.name}</h1>
      <h2 class="city" tabindex="0" aria-label="localisation ${this.city},${this.country}" aria-hidden="false" >
     ${this.city}, ${this.country}</h2>
      <div class="tagline" tabindex="0" aria-label="Devise : ${this.tagline}"
      >${this.tagline}</div>
    </div>
    <div class="header__block-right">
      <img class="photographer" loading="lazy" alt="" src="https://killouh.github.io/P6---Front-End-Fisheye/public/assets/photographers/${this.portrait}"> 
    </div> 
    
    `;
    body.appendChild(footer);
    return headerBlock;
  }
}
export { PhotographerFactory };
