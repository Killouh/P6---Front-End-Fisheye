import { Api } from "../api/api.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";

class App {
  constructor() {
    this.getAllPhotographers = new Api("../../data/photographers.json");
    this.getAllPhotographers = new Api("https://killouh.github.io/P6---Front-End-Fisheye/data/photographers.json");
    this.photographersSection = document.querySelector(".photographer_section");
  }
  /**
   * rendu de la page des photographes
   * @param {array} photographers
   */
  async displayPhotographers(photographers) {
    photographers.forEach((photographer) => {
      const photographerModel = new PhotographerFactory(
        photographer.id,
        photographer.name,
        photographer.portrait,
        photographer.city,
        photographer.country,
        photographer.price,
        photographer.tagline
      );
      const userCardDOM = photographerModel.getUserCardDOM();
      this.photographersSection.appendChild(userCardDOM);
    });
  }
  async init() {
    // Récupère les datas des photographes
    const { photographers } = await this.getAllPhotographers.getData();
    this.displayPhotographers(photographers);
  }
}

const app = new App();
app.init();
