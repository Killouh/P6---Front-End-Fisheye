/**
 * calcul le nombre total de like
 * @param {array} datas d'un photographe
 * @returns number
 */
export function getAllLike(datas) {
  let initValue = 0; // indice
  return datas.reduce((previous, current) => {
    return previous + current.likes;
  }, initValue);
}

/**
 * dispache l'évenement selon son type (souris / clavier)
 */
export function onLikes() {
  // à la souris
  document.removeEventListener("keyup", onLikes);
  document.removeEventListener("click", onLikes);

  document.querySelectorAll(".likes_container").forEach((elt) => {
    elt.addEventListener("click", () => {
      MoreOrLess(elt);
    });
  });

  // au clavier
  document.querySelectorAll(".likes_container").forEach((elt) => {
    elt.addEventListener("keyup", (evt) => {
      if (evt.key === "+" || evt.key === "Enter") {
        MoreOrLess(elt);
      }
    });
  });
}
/**
 *  Affect les styles sur les likes et incrément ou décréménte le nombre de like
 * @param {HTMLElement} elt
 */
function MoreOrLess(elt) {
  const footerLikes = document.querySelector(".likes_container-footer > span");
  const spanLike = elt.querySelector(".likes");

  const currentHeartValue = elt.querySelector(".likes_container >.likes");
  const currentHeartIcon = elt.querySelector("span.fas.fa-heart");

  currentHeartIcon.classList.toggle("active");
  currentHeartValue.classList.toggle("active");
  // nombre de like total
  let currentNbrLike = Number(footerLikes.textContent);

  if (
    currentHeartIcon.classList.contains("active") &&
    currentHeartValue.classList.contains("active")
  ) {
    currentHeartIcon.style.color = "#db8876";
    currentHeartValue.textContent++;
    spanLike.setAttribute(
      "aria-label",
      `${currentHeartValue.textContent} likes`
    );
    footerLikes.textContent = ++currentNbrLike;
    footerLikes.setAttribute("aria-label", `${footerLikes.textContent} likes`);
  } else {
    currentHeartIcon.style.color = "#901c1c";
    currentHeartValue.textContent--;
    spanLike.setAttribute(
      "aria-label",
      `${currentHeartValue.textContent} likes`
    );
    footerLikes.textContent = --currentNbrLike;
    footerLikes.setAttribute("aria-label", `${footerLikes.textContent} likes`);
  }
}
