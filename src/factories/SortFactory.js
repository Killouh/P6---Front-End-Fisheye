export class SortFactory {
  /**
   * @returns {HTMLElement} filtre de tri
   */
  getSortMediaDom() {
    const filtreBloc = document.createElement("form"); // Option
    const formulaire = `
    <label for="tri" class="form-label">Trier par </label>
      <select class="form-select" name="choice" id="tri">
       
        <option class="form-options" value=""> Filtres </option> 

        <option class="form-options" value="popularite">Popularité</option>
        
        <option class="form-options" value="date">Date</option>
        
        <option class="form-options" value="titre">Titre</option>
        
      </select> 
  `;

    filtreBloc.classList.add("form-block");
    filtreBloc.setAttribute("aria-labelledby", "media-container");
    filtreBloc.setAttribute("aria-hidden", "false");
    filtreBloc.innerHTML = formulaire;
    return filtreBloc;
  }
}
