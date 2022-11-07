//Afficher les medias de photographe 
/**
 * 
 * @param {object} data les medias de photographer
 * @param {object} photographer les données de photographer
 */
 export function getPhotographerMedias(data,photographer){
	const {image, video, title, likes} = data;
	const name = (photographer.name).split(" ",1);
	const works = document.querySelector(".photograph-works--articles");
	const figure = document.createElement("figure");
	const  mediaFooter = document.createElement("figcaption");
	const poster = title.split(" ").join("_");
	const lienMedia = document.createElement("a");
	let media = createMedia();

	/*****
	 * @return {HTMLElement} mediaP si media == image return image et si mediaP=== video return video
	 */
	function createMedia(){
		let mediap;
		if (image){
			//creer l'image
			mediap = document.createElement("img");
			mediap.src = `assets/images/${name[0]}/${image}`;
			mediap.alt = `${title} photo`;
        
		}else if(video){
			// creer la video 
			const source = document.createElement("source");
			const videoTitle = document.createElement("title");
			videoTitle.id ="videoTitle";
			videoTitle.innerText = title;
			mediap = document.createElement("video");
			mediap.setAttribute("controls","");
			mediap.setAttribute("aria-labelledby","videoTitle");
			mediap.append(videoTitle);
			mediap.poster = `assets/images/${name[0]}/${poster}.png`;
			mediap.append(source);
			source.src = `assets/images/${name[0]}/${video}`;
			source.type = "video/mp4";
                       
		}
		return mediap;
	}

	//creer une figure pour les media
	lienMedia.append(media);
	lienMedia.href = "#";
	figure.append(lienMedia);

	//ajouter figurecaption 
	mediaFooter.classList.add("media-footer");
	mediaFooter.innerHTML = `
            <h3> ${title} </h3>
            <p class="likes" tabindex="0"> ${likes} 
                <span class="fa-stack fa-1x" aria-label="likes">
                    <i class="fa-regular fa-heart  fa-stack-1x"id="likeHeart" ></i>
                    <i class="fa-solid fa-heart fa-stack-1x  "></i>
                </span> 
            </p>
    `;
	figure.append(mediaFooter);
	works.append(figure);

}