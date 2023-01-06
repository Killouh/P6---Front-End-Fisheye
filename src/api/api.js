class Api {
  /**
   * chemin des datas
   * @param {String} url
   */
  constructor(url) {
    this.url = url;
  }
  async getData() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("OOPS, Il y a une erreur dans le chemin !", err);
      });
  }
}

export { Api };
