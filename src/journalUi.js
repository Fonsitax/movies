import { deleteNotice } from "./deleteNotice.js";

export function updateUI(favorites) {
    const main = document.getElementById("main-content");
    main.innerHTML = ''; 

    for (let i = 0; i < favorites.length; i++) {
        const { Name: title, Image: poster_path, overview, notice } = favorites[i];
        
        const newContainer = document.createElement("div");
        newContainer.classList.add("p-4", "border", "rounded", "bg-white", "shadow", "flex", "flex-col", "items-center", "w-full", "max-w-xs");
        main.appendChild(newContainer);
        const film = document.createElement("ul");
        film.classList.add("list-none");
        newContainer.appendChild(film);

        //console.log(poster_path);

        let filmbild = "";

        if (poster_path === "https://image.tmdb.org/t/p/w500null")
            {
             
              filmbild = "https://picsum.photos/id/1/5000/3333";  
            }
            else{
                filmbild = poster_path;
            }


        const filmImage = document.createElement("img");
        filmImage.setAttribute("src", `${filmbild}`);
        filmImage.classList.add("mb-2", "w-40");
        film.appendChild(filmImage);
        const filmName = document.createElement("li");
        filmName.textContent = `Title : ${title}`;
        filmName.classList.add("mb-2");
        film.appendChild(filmName);
        const filmOverview = document.createElement("li");
        filmOverview.textContent = `Überblick : ${overview}`;
        filmOverview.classList.add("mb-2");
        film.appendChild(filmOverview);
        const removeBtnListItem = document.createElement("li");
        const removeBtn = document.createElement("button");
        const expandButton = document.createElement("button");
        const overviewContainer = document.createElement("div");
        overviewContainer.appendChild(filmOverview);
        overviewContainer.classList.add("mb-2", "overflow-hidden", "max-h-0", "transition-max-height", "duration-500", "ease-in-out");
        
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
        film.appendChild(noteListItem);
        noteListItem.appendChild(note);
        const noteSaveListItem = document.createElement("li");
        const noteSave = document.createElement("button");
        film.appendChild(noteSaveListItem);
        noteSaveListItem.appendChild(noteSave);
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

        film.append(removeBtnListItem);
        removeBtnListItem.appendChild(removeBtn);
        
        noteListItem.appendChild(note);
        noteSaveListItem.appendChild(noteSave);

        
        //newContainer.appendChild(film);
        //main.appendChild(newContainer);
    }
}
