import { getPhotographerMedias } from "../factories/medias.js";
import {displayCarrousel} from "../utils/lightBox.js";
import { sommeLikes } from "../utils/like.js";

/**
 * 
 * @param {object} data les medias de photographer
 * @param {object} photographer les données de photographer
 */
export function mediasFilter(data,photographer){
	const selectBox = document.querySelector(".select-filter select");
	const sectionWorks = document.querySelector(".photograph-works--articles");

	selectBox.addEventListener("change",()=>{
		const selectValue = selectBox.value;
		// filtrer selon la popularité (le nombre de likes)
		if(selectValue === "popularite"){
			const dataFilterPop = Array.from(data);
			dataFilterPop.sort((a,b)=> b.likes - a.likes);
			sectionWorks.innerHTML = "";
			dataFilterPop.forEach(ele =>getPhotographerMedias(ele,photographer));
			displayCarrousel();
			sommeLikes();
		} else if(selectValue === "date"){// filtrer selon la date
			const datafilterDate = Array.from(data);
			datafilterDate.sort((a,b)=>{
				let dateA = new Date(a.date).getTime();
				let dateB = new Date(b.date).getTime();
				return(dateB > dateA ? 1 : -1);
			});
			sectionWorks.innerHTML = "";
			datafilterDate.forEach(ele =>getPhotographerMedias(ele,photographer));
			displayCarrousel();
			sommeLikes();
		}else if (selectValue === "title"){  // filtrer selon le titre
			const dataFilterName = Array.from(data);
			dataFilterName.sort((a,b)=> a.title >b.title ?1 : -1);
			sectionWorks.innerHTML = "";
			dataFilterName.forEach(ele =>getPhotographerMedias(ele,photographer));
			displayCarrousel();
			sommeLikes();
		}
	});
}