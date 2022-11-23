import { getPhotographerMedias } from "../factories/medias.js";
import { mediasFilter } from "../utils/filters.js";
import { sommeLikes } from "../utils/like.js";
import { displayCarrousel } from "../utils/lightBox.js";


//Recupère les données du JSON
async function getPhotographers() {
  let datas =  await fetch("./data/photographers.json").then(datas=>datas.json());
  return datas;  
}

//Récuperer l'index de photographe 
async function getIndexPhotographer(){
  let params = (new URL(document.location)).searchParams;
  let idPhotographer = parseInt(params.get("id"));
  let indexPhotographer;
  const photographers = (await getPhotographers()).photographers;
  photographers.forEach(photographer => {
    if(photographer.id === idPhotographer){
      indexPhotographer = photographers.indexOf(photographer);
    }
  });
    
  return indexPhotographer;
}
// ajouter le contenu de la section photograph-header de la page photographer
async function photographerHeader(data){
  const {name, city, country, tagline, portrait} = data;
  let photographHeader = document.querySelector(".photograph-header--data");
  let photographPhoto = document.querySelector(".photograph-header--photo");

  // Ajouter le nom de photographe a la section
  let photographerName = document.createElement("h1");
  photographerName.classList.add("name");
  photographerName.innerText = `${name}`;
  photographHeader.append(photographerName);

  // Ajouter la ville a la section
  let photographAdress = document.createElement("h2");
  photographAdress.classList.add("city");
  photographAdress.innerText = `${city} , ${country}`;
  photographHeader.append(photographAdress);

  // Ajouter le slogan a la section 
  let photographTagline =  document.createElement("p");
  photographTagline.classList.add("tagline");
  photographTagline.innerText = `${tagline}`;
  photographHeader.append(photographTagline);

  //Ajouter la photo  a la section
  let photo = document.createElement("img");
  photo.src = `assets/images/Photographers ID Photos/${portrait}`;
  photo.setAttribute("alt","");
  photo.tabIndex = "0";
  photo.role = "presentation";
  photographPhoto.append(photo);

}

// afficher les données de photographer
async function getDataPhotographer(){
  let index = await getIndexPhotographer();
  const  photographers  = (await getPhotographers()).photographers;
  const photograph = photographers[index];
  const media = (await getPhotographers()).media;
  const photographerMedias = media.filter(ele =>ele.photographerId === photograph.id);
  const photographerPrice = document.querySelector(".photographer-price");

  await photographerHeader(photograph);
  photographerPrice.innerHTML =`${photograph.price}€ / jour`;
  photographerPrice.tabIndex = "0";

  // recuperer le nom de photographe dans la modale
  const photographeName = document.getElementById("photographerName");
  photographeName.innerText = photograph.name;
  photographerMedias.forEach(ele =>{
    getPhotographerMedias(ele,photograph);
  });

  mediasFilter(photographerMedias,photograph); 
  sommeLikes(photographerMedias,photograph);
  displayCarrousel();
    

}

getDataPhotographer();

