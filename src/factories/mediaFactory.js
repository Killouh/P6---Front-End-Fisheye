// Factory pour les medias
import { TypeMediaFactory } from "./TypeMediaFactory.js";
import { onLikes } from "../utils/likes.js";

class MediaFactory {
  constructor(media) {
    this.id = media.id;
    this.date = media.date; // yyyy-mm-dd
    this.likes = media.likes;
    this.price = media.price;
    this.title = media.title;
    this.image = media.image;
    this.video = media.video;
    this.medias = media;
    this.onOpenModale = this.onOpenModale.bind(this);
    document
      .querySelectorAll("article .card_media-container")
      .forEach((elt) => {
        elt.addEventListener("keyup", this.onOpenModale);
      });
  }
  /**
   * @param {number} likes les likes courant
   */
  setLikes(likes) {
    this.likes = likes;
  }
  getLikes() {
    return this.likes;
  }
  /**
   * @param {KeyboardEvent} evt
   */
  onOpenModale(evt) {
    if (evt.key === "Enter") {
      this.openLightbox(evt);
    }
  }
  /**
   * ouvre la lightbox
   * @param {MouseEvent} evt
   */
  openLightbox(evt) {
    evt.preventDefault();

    const modal = document.getElementById("lightbox");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    

    // accessibilité
    document
      .querySelectorAll("article .card_media-container")
      .forEach((elt) => {
        elt.setAttribute("tabindex", "-1");
      });

    const section = document.querySelector("section.media_content");
    section.setAttribute("tabindex", "-1");
    section.setAttribute("aria-hidden", "true");

    const footer = document.querySelector("footer");
    footer.setAttribute("tabindex", "-1");

    document.querySelectorAll(".likes_container").forEach((elt) => {
      elt.setAttribute("tabindex", "-1");
    });
    // suppression de l'écouteur
    document.removeEventListener("keyup", this.onOpenModale.bind(this));
    document.removeEventListener("click", this.openLightbox.bind(this));
  }

  /**
   * Card media
   * @returns HTMLElement
   */
  getCardMediaDom() {
    const mediaBox = document.createElement("article");
    const media = new TypeMediaFactory(this.medias);
    const cardMedia = document.createElement("div");
    const cardMediaContainer = document.createElement("div");
    const para = document.createElement("p");
    const span = document.createElement("span");
    const spanIcon = document.createElement("span");
    const containtSpan = document.createElement("div");

    cardMedia.classList.add("card_media");
    cardMedia.setAttribute("aria-label", `${this.title}`);
    cardMedia.setAttribute("aria-hidden", "false");

    cardMediaContainer.classList.add("card_media-container");
    cardMediaContainer.setAttribute("tabindex", `0`);
    cardMediaContainer.addEventListener("click", this.openLightbox.bind(this));
    cardMediaContainer.addEventListener("keyup", this.onOpenModale.bind(this));

    para.classList.add("card_media--title");
    para.textContent = this.title;

    containtSpan.classList.add("likes_container");
    containtSpan.setAttribute("tabindex", "0");

    mediaBox.classList.add("media-box");

    span.classList.add("likes");
    span.textContent = `${this.getLikes()}`;
    spanIcon.classList.add("fas", "fa-heart");

    cardMedia.appendChild(cardMediaContainer);
    cardMediaContainer.appendChild(media);
    containtSpan.appendChild(span);
    containtSpan.appendChild(spanIcon);
    para.appendChild(containtSpan);

    mediaBox.appendChild(cardMedia);
    mediaBox.appendChild(para);

    containtSpan.addEventListener("click", onLikes);
    containtSpan.addEventListener("keyup", onLikes);

    return mediaBox;
  }
}
export { MediaFactory };
