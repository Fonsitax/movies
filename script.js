const path = "https://api.themoviedb.org/3/search/movie"; // API-Endpunkt für Filmsuche
const pathKey = "?api_key=b9e68beed362058bc1c6f2fdd45dc2c4"; // API-Schlüssel für TMDB
const searchInput = document.getElementById("film-search"); // Eingabefeld für Filmsuche
const searchButton = document.getElementById("search-button"); // Such-Button
const displayField = document.getElementById("display-field"); // Anzeigefeld für Suchergebnisse
const main = document.getElementById("main-content"); // Hauptinhalt der Seite

// Eventlistener für Klick auf Such-Button
searchButton.addEventListener("click", () => {
  main.innerHTML = ''; // Hauptinhalt leeren

  let wantedFilm = searchInput.value.trim(); // Eingegebenen Filmtitel abrufen und Leerzeichen entfernen

  if (!wantedFilm) {
    alert("Sie müssen einen Filmtitel eingeben!"); // Fehlermeldung, wenn kein Filmtitel eingegeben wurde
  } else {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU2OGJlZWQzNjIwNThiYzFjNmYyZmRkNDVkYzJjNCIsInN1YiI6IjY2NjcwNmRmZTcxMDM0MDEwZmJlNzUzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BcaQgxzIuDO3FyhIu6OgG0nkgol6PlSAiC1LxLlReus'
      }
    };

    // API-Anfrage zusammenstellen und ausführen
    fetch(`${path}${pathKey}&query=${encodeURIComponent(wantedFilm)}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json()) // Antwort in JSON formatieren
      .then((response) => {
        console.log(response); // Konsolenausgabe der API-Antwort
        var allData = response;

        // Schleife durch die Ergebnisse der API-Antwort
        for (let i = 0; i < response.results.length; i++) {
          let title = response.results[i].title; // Filmtitel
          let poster_pat = response.results[i].poster_path; // Bildpfad des Films
          let overview = response.results[i].overview; // Überblick über den Film

          // Container und Elemente für jeden Film erstellen
          const newContainer = document.createElement("div");
          const film = document.createElement("ul");
          const imageListItem = document.createElement("li");
          const filmImage = document.createElement("img");
          const filmName = document.createElement("li");
          const filmOverview = document.createElement("li");
          const addToFavorites = document.createElement("button");

          // CSS-Klassen zu Container hinzufügen
          newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
          main.appendChild(newContainer); // Container dem Hauptinhalt hinzufügen
          newContainer.classList.add(i); // Index als CSS-Klasse hinzufügen

          film.classList.add("list-none"); // CSS-Klassen zu Filmliste hinzufügen
          newContainer.appendChild(film); // Filmliste zum Container hinzufügen

          filmImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${poster_pat}`); // Bildquelle setzen
          imageListItem.appendChild(filmImage); // Bildliste zum Element hinzufügen
          filmImage.classList.add("mb-2", "w-40"); // CSS-Klassen zu Bild hinzufügen
          film.appendChild(imageListItem); // Bild zum Film hinzufügen

          filmName.textContent = `Titel: ${title}`; // Titeltext setzen
          film.appendChild(filmName); // Titel zum Film hinzufügen
          filmName.classList.add("mb-2"); // CSS-Klassen zu Titel hinzufügen

          filmOverview.textContent = `Überblick: ${overview}`; // Überblickstext setzen
          filmOverview.classList.add("mb-2"); // CSS-Klassen zu Überblick hinzufügen
          film.appendChild(filmOverview); // Überblick zum Film hinzufügen

          addToFavorites.textContent = "Zu Favoriten hinzufügen"; // Text für Button setzen
          addToFavorites.classList.add("p-2", "bg-green-500", "text-white", "rounded", i); // CSS-Klassen zu Button hinzufügen
          addToFavorites.addEventListener("click", () => {
            addToFavoritesHandler(i); // Eventhandler für "Zu Favoriten hinzufügen" aufrufen
            addToFavorites.disabled = true; // Button nach Klick deaktivieren
            addToFavorites.classList.replace("bg-green-500", "bg-green-500/50"); // CSS-Klasse ersetzen
          });
          film.appendChild(addToFavorites); // Button zum Film hinzufügen
        }

        // Funktion zum Hinzufügen eines Films zu den Favoriten
        function addToFavoritesHandler(i) {
          const nameOfFilm = allData.results[i].title; // Filmtitel aus den gesamten Daten
          const imageOfFilm = allData.results[i].poster_path; // Bildpfad des Films aus den gesamten Daten
          const overviewOfFilm = allData.results[i].overview; // Überblick über den Film aus den gesamten Daten

          const filmDetails = {
            Name: nameOfFilm,
            Image: `https://image.tmdb.org/t/p/w500${imageOfFilm}`,
            overview: overviewOfFilm
          };

          // Favoriten aus localStorage abrufen oder leeres Array erstellen
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

          favorites.push(filmDetails); // Filmdetails zu Favoriten hinzufügen

          localStorage.setItem("favorites", JSON.stringify(favorites)); // Favoriten in localStorage speichern

          alert(`${nameOfFilm} wurde zu den Favoriten hinzugefügt!`); // Benutzer über Hinzufügen informieren
        }

      })
      .catch(err => console.error(err)); // Fehlerbehandlung für Fetch-Anfrage
  }
});