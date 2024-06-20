const path = "https://api.themoviedb.org/3/search/movie";
const pathKey = "?api_key=b9e68beed362058bc1c6f2fdd45dc2c4";

export function fetchFilmData(wantedFilm) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWU2OGJlZWQzNjIwNThiYzFjNmYyZmRkNDVkYzJjNCIsInN1YiI6IjY2NjcwNmRmZTcxMDM0MDEwZmJlNzUzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BcaQgxzIuDO3FyhIu6OgG0nkgol6PlSAiC1LxLlReus'
        }
    };

    return fetch(`${path}${pathKey}&query=${encodeURIComponent(wantedFilm)}
    &include_adult=false&language=en-US&page=1`, options)
        .then(response => { if (!response.ok) 
            {throw new Error ("Fetchabruf / Serverantwort war nicht ok"); } return response.json();
})
}