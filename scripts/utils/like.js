export function sommeLikes(){
	const likesSelections = document.querySelectorAll(".likes");
	const divNbrLikes = document.querySelector(".somme-likes");
	let nbrLikes =somme();
	divNbrLikes.innerHTML ="";

	// Afficher la somme de tous les likes au pied de page
	divNbrLikes.innerHTML = `${nbrLikes}  <i class="fa-sharp fa-solid fa-heart" aria-label="likes"></i> `;

	/**
	 * @param {string []} ele Fonction ajoute un like au media et si elle est déja liké elle enléve le like
	 */
	function addlikes(ele) {
		if(ele.classList.contains("liked")){
			ele.innerHTML =` 
									${(parseInt(ele.innerText))-1} 
											<span class="fa-stack fa-1x">
													<i class="fa-regular fa-heart  fa-stack-1x "></i>
													<i class="fa-solid fa-heart fa-stack-1x  "></i>
											</span> 
									
							` ;
			ele.classList.toggle("liked");
			nbrLikes -=  1;
			divNbrLikes.innerHTML ="";
			divNbrLikes.innerHTML = `${nbrLikes} <i class="fa-sharp fa-solid fa-heart"></i>  `;
		}else{
			ele.innerHTML =` 
									${(parseInt(ele.innerText))+1} 
											<span class="fa-stack fa-1x">
													<i class="fa-regular fa-heart  fa-stack-1x "></i>
													<i class="fa-solid fa-heart fa-stack-1x  "></i>
											</span> 
									
							` ;
			ele.classList.toggle("liked");
			nbrLikes +=  1;
			divNbrLikes.innerHTML ="";
			divNbrLikes.innerHTML = `${nbrLikes}  <i class="fa-sharp fa-solid fa-heart" ></i> `;            
		}
	}

	likesSelections.forEach(element =>{

		// Liker ou disliker le media avec le click de la souris
		element.onclick = function() {addlikes(element);};

		/**
		 * @param {KeyboardEvent} e liker ou desliker le media avec la touche enter
		 */
		element.addEventListener("keydown",(e)=>{
			if(e.key === "Enter"){
				addlikes(element);
			}
		});
	});
	
	/***
	 * @return {number} somme la somme de tous les likes
	 */
	function somme(){
		let tab = [];
		let somme = 0;
		likesSelections.forEach(ele =>{
			tab.push(parseInt(ele.innerText));
		});
		somme = tab.reduce((a,b)=>a + b);   
		return somme ;
	}
}