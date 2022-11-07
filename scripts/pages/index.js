//Recupère les données du JSON
async function getPhotographers() {
	let datas =  await fetch("./data/photographers.json").then(datas=>datas.json());
	return datas;  
}

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    // Création du lien de chaque photographe
    const buttons = document.querySelectorAll(".profil")


    
    init();
    