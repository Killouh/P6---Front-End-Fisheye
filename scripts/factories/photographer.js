// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/images/Photographers ID Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');



    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", name + "'s portait");


    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`);
    a.setAttribute("class", "profil");
    a.setAttribute("id",id);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = city + ", " + country;
    const caption = document.createElement("caption");
    caption.textContent = tagline;
    const p = document.createElement("p");
    p.textContent = price + "€/jour";

    article.appendChild(a)
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(caption);
    article.appendChild(p);
        
    return (article);
  }
  return { name, picture, getUserCardDOM }
}