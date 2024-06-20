export function addToFavoritesHandler(i, allData) {
    const idOfFilm = allData.results[i].id;
    const nameOfFilm = allData.results[i].title;
    const imageOfFilm = allData.results[i].poster_path;
    const overviewOfFilm = allData.results[i].overview;
    const filmDetails = {
      id: idOfFilm,
      Name: nameOfFilm,
      Image: `https://image.tmdb.org/t/p/w500${imageOfFilm}`,
      overview: overviewOfFilm
    };
  
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(filmDetails);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${nameOfFilm} wurde zu den Favoriten hinzugefügt!`);
  }