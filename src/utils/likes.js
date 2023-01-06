/**
 * calcul le nombre total de like
 * @param {array} datas d'un photographe
 * @returns number
 */
/**
 * dispache l'évenement selon son type (souris / clavier)
 */
export function onLikes(evt) {
  // Trouve la cible du click ou focus clavier
  if (evt.type === "click" || evt.key === "Enter" || evt.key === "+") {
    const currentTarget = evt.currentTarget;

    // Regarde si la cible contient la classe likesEvent
    if (currentTarget.classList.contains("likesEvent"))  {
      // utilise la fonction de likes
      MoreOrLess(currentTarget);
    }
  }
}

/**
 *  Affect les styles sur les likes et incrément ou décréménte le nombre de like
 * @param {HTMLElement} evt
 */
function MoreOrLess(evt) {
  const footerLikes = document.querySelector(".likes_container-footer > span");
  const spanLike = evt.querySelector(".likes");

  const currentHeartValue = evt.querySelector(".likes_container >.likes");
  const currentHeartIcon = evt.querySelector("span.fas.fa-heart");

  currentHeartIcon.classList.toggle("active");
  currentHeartValue.classList.toggle("active");
  // nombre de like total
  let currentNbrLike = Number(footerLikes.textContent);
  if ( currentHeartIcon.classList.contains("active") && currentHeartValue.classList.contains("active")) {
    currentHeartIcon.style.color = "#db8876";
    currentHeartValue.textContent--;
    spanLike.setAttribute(
      "aria-label",
      `${currentHeartValue.textContent} likes`
    );
    footerLikes.textContent = --currentNbrLike;
    footerLikes.setAttribute("aria-label", `${footerLikes.textContent} likes`);
  } else {
    currentHeartIcon.style.color = "#901c1c";
    currentHeartValue.textContent++;
    spanLike.setAttribute(
      "aria-label",
      `${currentHeartValue.textContent} likes`
    );
    footerLikes.textContent = ++currentNbrLike;
    footerLikes.setAttribute("aria-label", `${footerLikes.textContent} likes`);
  }
}