const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const main = document.getElementById("main-content");

for (let i = 0; i < favorites.length; i++) {
    let title = favorites[i].Name;
    let poster_pat = favorites[i].Image;
    let overview = favorites[i].overview;
    const newContainer = document.createElement("div");
    const film = document.createElement("ul");
    const imageListItem = document.createElement("li");
    const filmImage = document.createElement("img");
    const filmName = document.createElement("li");
    const filmOverview = document.createElement("li");
    const noteListItem = document.createElement("li");
    const note = document.createElement("input");
    const noteSaveListItem = document.createElement("li");
    const noteSave = document.createElement("button");

    newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
    main.appendChild(newContainer);
    newContainer.classList.add(i)

    film.classList.add("list-none");
    newContainer.appendChild(film);

    filmImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${poster_pat}`);
    imageListItem.appendChild(filmImage);
    filmImage.classList.add("mb-2", "w-40");
    film.appendChild(imageListItem);

    filmName.textContent = `Title : ${title}`;
    film.appendChild(filmName);
    filmName.classList.add("mb-2");

    filmOverview.textContent = `Überblick : ${overview}`;
    filmOverview.classList.add("mb-2");
    film.appendChild(filmOverview);

    film.appendChild(noteListItem);
    film.appendChild(noteSaveListItem);
    noteListItem.appendChild(note);
    noteSaveListItem.appendChild(noteSave);
    note.placeholder = "Notiz hinzufügen";
    note.classList.add("p-2", "h-28", "mb-4", "mt-4", "text-white", "rounded",i);
    noteSave.textContent = "Notiz speichern";
    noteSave.classList.add("p-2", "bg-green-500", "text-white", "rounded",i);
}