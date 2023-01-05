export class Video {
  constructor(video, id, title) {
    this.video = video;
    this.id = id;
    this.title = title;
  }
  /**
   * @returns {HTMLElement}
   */
  displayVideo() {
    const assets = "https://killouh.github.io/P6---Front-End-Fisheye/public/assets/images/";

    const lightbox = document.querySelector("#lightbox");
    const div = document.createElement("div");
    const video = document.createElement("video");
    const source = document.createElement("source");

    const warningSpan = document.createElement("span");
    warningSpan.classList.add("warning_span");
    warningSpan.textContent = "Vidéo";

    div.classList.add("card_media--box-video");
    div.setAttribute("data-title", `${this.title}`);
    div.setAttribute("data-id", `${this.id}`);
    video.classList.add("card_media--vid");

    // active => Version LB
    if (lightbox.classList.contains("active")) {
      video.setAttribute("controls", "");
      div.removeAttribute("aria-label");
      warningSpan.style.display = "none";
    } else {
      div.setAttribute(
        "aria-label",
        `Le contrôle de la vidéo est disponible dans la lightbox`
      );
      video.removeAttribute("controls");
      warningSpan.style.display = "block";
    }

    video.id = this.id;

    source.setAttribute("src", `${assets}${this.video}`);
    source.setAttribute("type", `video/mp4`);

    video.appendChild(source);
    div.appendChild(warningSpan);
    div.appendChild(video);

    return div;
  }
}
