import { Image } from "./imageFactory.js";
import { Video } from "./videoFactory.js";

export class TypeMediaFactory {
  /**
   * Dispache la donnée en fonction de son type.
   * @param {objet} media - propiétés d'un media
   * @returns {HTMLElement}
   */
  constructor(media) {
    // je regarde si la bonne propriété existe
    if (media.hasOwnProperty("image")) {
      return new Image(
        media.image,
        media.date,
        media.id,
        media.title
      ).displayImage();
    } else if (media.hasOwnProperty("video")) {
      return new Video(media.video, media.id, media.title).displayVideo();
    } else {
      throw new Error("Type de format inconnu.");
    }
  }
}
