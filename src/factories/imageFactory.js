export class Image {
  constructor(image, date, id, title) {
    this.image = image;
    this.date = date;
    this.id = id;
    this.title = title;
  }
  /**
   * @returns {HTMLElement}
   */
  displayImage() {
    const assets = "../../public/assets/images/";
    const onLb = document.querySelector("#lightbox");

    const div = document.createElement("div");
    div.classList.add("card_media--img");
    div.setAttribute("data-title", `${this.title}`);
    div.setAttribute("data-id", `${this.id}`);

    if (onLb.classList.contains("active")) {
      div.setAttribute("tabindex", `0`);
      div.setAttribute("aria-label", `${this.title}`);
    } else {
      div.removeAttribute("aria-label");
      div.removeAttribute("tabindex");
    }

    const image = document.createElement("img");
    image.src = `${assets}${this.image}`;
    image.id = this.id;
    image.setAttribute("alt", `${this.title}, fait le ${this.date}`);
    image.setAttribute("loading", `lazy`);

    div.appendChild(image);

    return div;
  }
}
