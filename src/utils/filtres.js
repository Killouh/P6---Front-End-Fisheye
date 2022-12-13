/**
 * tri les données par popularité
 * @param {array} datas
 * @returns {array}
 */
export function getDataByPop(datas) {
  return datas.sort((a, b) => {
    // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
    // b > a
    return b.likes - a.likes;
  });
}

/**
 * tri les données par titre
 * @param {array} datas
 * @returns {array}
 */
export function getDataByTitle(datas) {
  return datas.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
}

/**
 * tri les données par date
 * @param {array} datas
 * @returns {array}
 */
export function getDataByDate(datas) {
  return datas.slice().sort((a, b) => {
    // a < b
    const valueA = new Date(a.date);
    const valueB = new Date(b.date);
    return valueB - valueA;
  });
}

/**
 * @param {number} id du photographe
 * @param {array} users les données des photographes
 * @returns {array} données d'un photographe
 */
export function getPhotographer(id, users) {
  const datas = users.filter((user) => {
    return user.id === id;
  });
  return datas[0];
}

/**
 * tout les medias d'un photographe
 * @param {number} id du photographe
 * @param {array} medias les médias des photographes
 * @returns {arrayOfObject}
 */
export function getDatasByPhotographId(id, medias) {
  return medias.filter((media) => {
    return media.photographerId === id;
  });
}

/**
 * réccupère l'objet du media selectionné
 * @param { number } id courant
 * @param { array } datas tableau d'objet
 * @returns {arrayOfObject}
 */
export function getSelectedMedia(id, datas) {
  return datas.filter((value) => value.id === id);
}

/**
 * trouve l'index d'un objet dans un tableau
 * @param {number} index à rechercher
 * @param {array} tab
 * @returns {number}
 */
export function getIndexCurrentMedia(index, tab) {
  return tab.findIndex((eltIndex) => {
    return eltIndex.id === index;
  });
}
