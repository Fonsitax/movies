import { favorites } from "../journal.js";
export function deleteNotice(i){
    delete favorites[i].notice;
    window.location.reload();
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Sie haben die Notiz gelöscht");
}