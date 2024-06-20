import { fetchFilmData } from './src/fetchApi.js';
import { updateUI } from './src/mainUi.js';
import { addToFavoritesHandler } from './src/storage.js';

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("film-search");
const main = document.getElementById("main-content");

searchButton.addEventListener("click", () => triggerSearch());
searchInput.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        triggerSearch();
    }
})

function triggerSearch() {
    main.innerHTML = '';
    const wantedFilm = searchInput.value.trim();

    if (!wantedFilm) {
        alert("Sie müssen einen Namen eines Films eingeben!");
    } else {
        fetchFilmData(wantedFilm)
            .then(response => {
                updateUI(response, main);
            })
            .catch(err => console.error(err));
    }
}
