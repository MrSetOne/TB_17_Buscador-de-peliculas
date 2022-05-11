async function getFilms(toSearch) {
    try {
        const key = 'api_key=db07a005b100923233a26c975a5b6200'
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?${key}&query=${toSearch.replace(/ /g, "+")}&language=es`)
        const gen = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${key}&language=es`)
        genres = gen.data.genres
        const films = res.data.results;
        console.log(films);
        printZone.innerHTML = "";
        films.forEach(film => {
            if ((film.poster_path != undefined) && (film.overview != "")) {
                let right_gen = [];
                film.genre_ids.forEach(genre_id => {
                    genres.forEach(genre => {
                        if (genre.id == genre_id) {
                            right_gen.push(genre.name)
                        }
                    });
                })
                console.log(right_gen);
                printZone.innerHTML += `<div class="card m-auto mt-2" style="width:25rem; height:max(47.5rem, min-content)">
                                            <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" style="height: 30rem;object-fit: cover;" alt="${film.title}">
                                            <div class="card-body">
                                                <h2 class="card-title">${film.title}</h2>
                                                <p class="card-text">${film.overview.substring(0,160)}...</p>
                                                <div class="d-flex container-fluid">
                                                    <p class="card__gen">${right_gen.join(", ")}</p>
                                                    <p class="card__vote">${film.vote_average}</p>
                                                </div>
                                            </div>
                                        </div>`

            }
        });
    } catch (error) {
        console.log(error);
    }
}

const searcher = document.getElementById('searcher')
const printZone = document.getElementById('printZone')

searcher.addEventListener('submit', (e) => {
    e.preventDefault();
    getFilms(e.target.search.value);
    e.target.search.value = ""
})