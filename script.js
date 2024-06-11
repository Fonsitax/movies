const path = "https://api.themoviedb.org/3/search/movie"; 
const pathKey = "?api_key=b9e68beed362058bc1c6f2fdd45dc2c4";
const searchInput = document.getElementById("film-search");
const searchButton = document.getElementById("search-button");
const displayField = document.getElementById("display-field");
const main = document.getElementById("main-content");

searchButton.addEventListener("click", () => {
  main.innerHTML = '';
  let wantedFilm = searchInput.value.trim();

  if(!wantedFilm){alert("You must enter name of a Movie")}else{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU2OGJlZWQzNjIwNThiYzFjNmYyZmRkNDVkYzJjNCIsInN1YiI6IjY2NjcwNmRmZTcxMDM0MDEwZmJlNzUzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BcaQgxzIuDO3FyhIu6OgG0nkgol6PlSAiC1LxLlReus'
    }
  };
  
  fetch(`${path}${pathKey}&query=${encodeURIComponent(wantedFilm)}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then((response) => {
      console.log(response);
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

        newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
        main.appendChild(newContainer);
        newContainer.setAttribute("id",i);

        film.classList.add("list-none");
        newContainer.appendChild(film);

        filmImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${poster_pat}`);
        imageListItem.appendChild(filmImage);
        filmImage.classList.add("mb-2", "w-40");
        film.appendChild(imageListItem);

        filmName.textContent = `Title : ${title}`;
        film.appendChild(filmName);
        filmName.classList.add("mb-2");

        filmOverview.textContent = `Overview : ${overview}`;
        filmOverview.classList.add("mb-2");
        film.appendChild(filmOverview);

        addToFavorites.textContent = "Add 2 Fav";
        addToFavorites.classList.add("p-2", "bg-green-500", "text-white", "rounded");
        film.appendChild(addToFavorites);
      }
    })
    .catch(err => console.error(err));
}})
