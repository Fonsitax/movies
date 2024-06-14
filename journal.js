const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Favoriten aus dem localStorage laden oder leeres Array erstellen, wenn keine Favoriten vorhanden sind
const main = document.getElementById("main-content"); // Hauptinhalt der Seite holen, um Filme anzuzeigen

for (let i = 0; i < favorites.length; i++) {
    let title = favorites[i].Name; // Titel des Films aus dem Favoriten-Objekt holen
    let poster_pat = favorites[i].Image; // Bildpfad des Films aus dem Favoriten-Objekt holen
    let overview = favorites[i].overview; // Überblick über den Film aus dem Favoriten-Objekt holen
    
    // Neuen Container für jeden Film erstellen
    const newContainer = document.createElement("div");
    const film = document.createElement("ul");
    const imageListItem = document.createElement("li");
    const filmImage = document.createElement("img");
    const filmName = document.createElement("li");
    const filmOverview = document.createElement("li");
    const removeBtnListItem = document.createElement("li");
    const removeBtn = document.createElement("button");
    const noteListItem = document.createElement("li");
    const note = document.createElement("input");
    const noteSaveListItem = document.createElement("li");
    const noteSave = document.createElement("button");

    // CSS-Klassen hinzufügen, um das Aussehen des Containers zu definieren
    newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
    main.appendChild(newContainer); // Neuen Container zur Hauptseite hinzufügen
    newContainer.classList.add(i); // Klasse hinzufügen, die den Index des Films widerspiegelt

    film.classList.add("list-none"); // CSS-Klassen für die Listenansicht der Filminformationen hinzufügen
    newContainer.appendChild(film); // Filmliste dem neuen Container hinzufügen

    filmImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${poster_pat}`); // Bildpfad für das Film-Poster setzen
    imageListItem.appendChild(filmImage); // Bild zur Liste der Filminformationen hinzufügen
    filmImage.classList.add("mb-2", "w-40"); // CSS-Klassen für das Bild festlegen
    film.appendChild(imageListItem); // Bildliste dem Film hinzufügen

    filmName.textContent = `Title : ${title}`; // Titel des Films anzeigen
    film.appendChild(filmName); // Titelliste dem Film hinzufügen
    filmName.classList.add("mb-2"); // CSS-Klassen für den Titel festlegen

    filmOverview.textContent = `Überblick : ${overview}`; // Überblick über den Film anzeigen
    filmOverview.classList.add("mb-2"); // CSS-Klassen für den Überblick festlegen
    film.appendChild(filmOverview); // Überblickliste dem Film hinzufügen

    // Button zum Entfernen des Films aus den Favoriten hinzufügen
    film.appendChild(removeBtnListItem); // Liste für den Entfernen-Button dem Film hinzufügen
    removeBtnListItem.appendChild(removeBtn); // Entfernen-Buttonliste zum Entfernen-Button hinzufügen
    removeBtn.textContent = "Von Favoriten löschen"; // Text für den Entfernen-Button festlegen
    removeBtn.classList.add("p-2", "bg-red-500", "rounded"); // CSS-Klassen für den Entfernen-Button festlegen
    removeBtn.addEventListener("click", () => { // Event-Listener für den Klick auf den Entfernen-Button hinzufügen
        const deletedFilm = favorites.splice(i, 1); // Favoritenfilm aus dem Array löschen
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Aktualisierte Favoritenliste im localStorage speichern
        alert(`Sie haben ${deletedFilm[0].Name} von Favoriten gelöscht !!`); // Benutzer über das Löschen des Favoritenfilms informieren
        window.location.reload(); // Seite neu laden, um Änderungen anzuzeigen
    });

    // Anzeige der Notiz zum Film hinzufügen, falls vorhanden
    const noticeDispaly = document.createElement("li"); // Liste für die Notiz-Anzeige erstellen
    film.appendChild(noticeDispaly); // Notiz-Anzeige zum Film hinzufügen
    if (favorites[i].notice) { // Überprüfen, ob eine Notiz vorhanden ist
        noticeDispaly.textContent = `Ihre Notiz : ${favorites[i].notice}`; // Notiz anzeigen, wenn vorhanden
    } else {
        noticeDispaly.textContent = " "; // Platzhalter anzeigen, wenn keine Notiz vorhanden ist
    }
    noticeDispaly.classList.add("m-4"); // CSS-Klassen für die Notiz-Anzeige festlegen


    // Eingabefeld und Button zum Hinzufügen einer Notiz hinzufügen
    film.appendChild(noteListItem); // Notizliste zum Film hinzufügen
    film.appendChild(noteSaveListItem); // Notiz-Speichern-Button-Liste zum Film hinzufügen
    noteListItem.appendChild(note); // Eingabefeld für die Notiz zur Notizliste hinzufügen
    noteSaveListItem.appendChild(noteSave); // Notiz-Speichern-Button zur Notiz-Speichern-Button-Liste hinzufügen
    note.placeholder = "Notiz hinzufügen"; // Platzhaltertext für das Eingabefeld festlegen
    note.classList.add("p-2", "h-28", "mb-4", "mt-4", "rounded", i); // CSS-Klassen für das Eingabefeld festlegen
    noteSave.textContent = "Notiz speichern"; // Text für den Notiz-Speichern-Button festlegen
    noteSave.classList.add("p-2", "bg-green-500", "rounded", i); // CSS-Klassen für den Notiz-Speichern-Button festlegen
    noteSave.addEventListener("click", () => { // Event-Listener für den Klick auf den Notiz-Speichern-Button hinzufügen
        if (!note.value) { // Überprüfen, ob eine Notiz eingegeben wurde
            alert("Sie müssen eine Notiz eingeben!"); // Benutzer benachrichtigen, falls keine Notiz eingegeben wurde
        } else {
            let noteInput = note.value.trim(); // Eingabewert für die Notiz bereinigen
            favorites[i].notice = noteInput; // Notiz zum entsprechenden Favoritenfilm hinzufügen
            localStorage.setItem("favorites", JSON.stringify(favorites)); // Aktualisierte Favoritenliste im localStorage speichern
            noticeDispaly.textContent = `Ihre Notiz : ${favorites[i].notice}`; // Notiz auf der Seite anzeigen
            alert("Notiz wurde hinzugefügt"); // Benutzer über das Hinzufügen der Notiz informieren
        }
    });
}