function photographerFactory(data) {
    const {name, portrait, city, country, tagline, price, alt } = data;

    const picture = `assets/images/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.setAttribute("aria-label", name + "'s portait");
   

        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const caption = document.createElement('caption');
        caption.textContent = tagline;
        const p = document.createElement('p');
        p.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(caption);
        article.appendChild(p);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}