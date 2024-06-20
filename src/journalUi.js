import { deleteNotice } from "./deleteNotice.js";

export function updateUI(favorites) {
    const main = document.getElementById("main-content");
    main.innerHTML = ''; 

    for (let i = 0; i < favorites.length; i++) {
        const { Name: title, Image: poster_path, overview, notice } = favorites[i];
        
        const newContainer = document.createElement("div");
        newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
        
        const film = document.createElement("ul");
        film.classList.add("list-none");

        if( poster_path === null )
            {
             filmposter ="https://fastly.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8";
            }
          else
          {      
            filmposter = `https://image.tmdb.org/t/p/w500/${poster_path}`;
          }



        const filmImage = document.createElement("img");
        filmImage.setAttribute("src", `${filmposter}`);
        filmImage.classList.add("mb-2", "w-40");

        const filmName = document.createElement("li");
        filmName.textContent = `Title : ${title}`;
        filmName.classList.add("mb-2");

        const filmOverview = document.createElement("li");
        filmOverview.textContent = `Überblick : ${overview}`;
        filmOverview.classList.add("mb-2");

        const removeBtnListItem = document.createElement("li");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Von Favoriten löschen";
        removeBtn.classList.add("p-2", "bg-red-500", "rounded");
        removeBtn.addEventListener("click", () => {
            const deletedFilm = favorites.splice(i, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`Sie haben ${deletedFilm[0].Name} von Favoriten gelöscht !!`);
            updateUI(favorites); 
        });

        const noteListItem = document.createElement("li");
        const note = document.createElement("input");
        note.classList.add("p-2", "h-28", "mb-4", "mt-4", "rounded");
        note.placeholder = "Notiz hinzufügen";

        const noteSaveListItem = document.createElement("li");
        const noteSave = document.createElement("button");
        noteSave.textContent = "Notiz speichern";
        noteSave.classList.add("p-2", "bg-green-500", "rounded");
        noteSave.addEventListener("click", () => {
            if (!note.value.trim()) {
                alert("Sie müssen eine Notiz schreiben!");
            } else {
                favorites[i].notice = note.value.trim();
                localStorage.setItem("favorites", JSON.stringify(favorites));
                alert("Sie haben eine Notiz hinzugefügt");
                updateUI(favorites);
            }
        });

        const noticeDisplay = document.createElement("li");
        noticeDisplay.classList.add("m-4");
        film.append(filmImage, filmName, filmOverview, removeBtnListItem, noteListItem, noteSaveListItem, noticeDisplay);
        newContainer.appendChild(film);
        main.appendChild(newContainer);
        if (notice) {
            noteSave.textContent = "Notiz-Bearbeitung speichern";
            note.value = notice;
            noticeDisplay.textContent = `Ihre Notiz : ${notice}`;

            const deleteNoticeBtnListItem = document.createElement("li");
            const deleteNoticeBtn = document.createElement("button");
            deleteNoticeBtn.textContent = "Notiz löschen";
            deleteNoticeBtn.classList.add("p-2", "bg-red-500", "rounded");
            deleteNoticeBtn.addEventListener("click", () => {
                deleteNotice(i);
                updateUI(favorites);
            });
            deleteNoticeBtnListItem.appendChild(deleteNoticeBtn);
            film.appendChild(deleteNoticeBtnListItem);
        }

        removeBtnListItem.appendChild(removeBtn);
        noteListItem.appendChild(note);
        noteSaveListItem.appendChild(noteSave);

        
        newContainer.appendChild(film);
        main.appendChild(newContainer);
    }
}
