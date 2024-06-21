const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
export function deleteNotice(i){
    delete favorites[i].notice;
    window.location.reload();
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Sie haben die Notiz gelöscht");
}