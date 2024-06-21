import { addToFavoritesHandler } from './storage.js';
import { favorites } from '../journal.js';

export function updateUI(response, main) {
  const allData = response;
  
  for (let i = 0; i < response.results.length; i++) {
    let title = response.results[i].title;
    let poster_pat = response.results[i].poster_path;
    let overview = response.results[i].overview;
    const newContainer = document.createElement("div");
    const film = document.createElement("ul");
    const imageListItem = document.createElement("li");
    const filmImage = document.createElement("img");
    const filmName = document.createElement("li");
    const filmOverview = document.createElement("li");
    const addToFavorites = document.createElement("button");
    const expandButton = document.createElement("button");
    const overviewContainer = document.createElement("div");

    newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
    main.appendChild(newContainer);

    film.classList.add("list-none");
    newContainer.appendChild(film);

    if (poster_pat === null) {
      filmImage.setAttribute("src", "https://picsum.photos/id/1/5000/3333");
    } else {
      filmImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${poster_pat}`);
    }

    imageListItem.appendChild(filmImage);
    filmImage.classList.add("mb-2", "w-40");
    film.appendChild(imageListItem);

    overviewContainer.classList.add("mb-2", "overflow-hidden", "max-h-0", "transition-max-height", "duration-500", "ease-in-out");
    

    filmName.textContent = `Title : ${title}`;
    film.appendChild(filmName);
    filmName.classList.add("mb-2");

    filmOverview.textContent = `Überblick : ${overview}`;
    filmOverview.classList.add("mb-2");
    overviewContainer.appendChild(filmOverview);
    film.appendChild(overviewContainer);
    expandButton.textContent = "Mehr erfahren";
    expandButton.classList.add("p-2", "bg-gray-800", "text-white", "rounded");
    expandButton.addEventListener("click", () => {
      if (overviewContainer.classList.contains("max-h-0")) {
        overviewContainer.classList.remove("max-h-0");
        overviewContainer.classList.add("max-h-96");
        expandButton.textContent = "Weniger anzeigen";
      } else {
        overviewContainer.classList.remove("max-h-96");
        overviewContainer.classList.add("max-h-0");
        expandButton.textContent = "Mehr erfahren";
      }
    });
    film.appendChild(expandButton);

    const isFavorite = favorites.find(fav => fav.id === allData.results[i].id);
    if (!isFavorite) {
      addToFavorites.textContent = "Zu Favoriten hinzufügen";
      addToFavorites.classList.add("p-2", "bg-green-500", "text-white", "rounded", i);
      addToFavorites.addEventListener("click", () => {
        addToFavoritesHandler(i, allData);
        addToFavorites.disabled = true;
        addToFavorites.classList.add("p-2", "bg-green-500/50", "text-white", "rounded", i);
      });
      film.appendChild(addToFavorites);
    } else {
      addToFavorites.textContent = "Zu Favoriten hinzufügen";
      addToFavorites.classList.add("p-2", "bg-green-500/50", "text-white", "rounded", i);
      addToFavorites.disabled = true;
      film.appendChild(addToFavorites);
    }
  }
}
