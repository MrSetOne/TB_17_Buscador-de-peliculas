async function getFilms(toSearch, where) {
    try {
        const findIn = where
        const key = 'api_key=db07a005b100923233a26c975a5b6200'
        const res = await axios.get(`https://api.themoviedb.org/3/search/${findIn}?${key}&language=es&query=${toSearch.replace(/ /g, "+")}`)
        const cleanData = res.data.results;

        console.log(cleanData);

        if (findIn == "movie") {
            const gen = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?${key}&language=es`)
            const genres = gen.data.genres;
            printZone.innerHTML = "";
            cleanData.forEach(film => {
                if ((film.poster_path != undefined) && (film.overview != "")) {
                    let right_gen = [];
                    film.genre_ids.forEach(genre_id => {
                        genres.forEach(genre => {
                            if (genre.id == genre_id) {
                                right_gen.push(genre.name)
                            }
                        });
                    })
                    printZone.innerHTML += `<a target="_blank" href="https://www.themoviedb.org/movie/${film.id}" class="card m-auto mt-2" style="width:25rem; height:max(47.5rem, min-content); color:black; text-decoration: none;">
                                                <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" style="height: 30rem;object-fit: cover;" alt="${film.title}">
                                                <div class="card-body">
                                                    <h2 class="card-title">${film.title}</h2>
                                                    <p class="card-text">${film.overview.substring(0,160)}...</p>
                                                    <div class="d-flex container-fluid justify-content-between">
                                                        <p class="card__gen">${right_gen.join(", ")}</p>
                                                        <p class="card__vote">${film.vote_average}</p>
                                                    </div>
                                                </div>
                                            </a>`

                }
            });
        } else if (where == "person") {
            console.log(cleanData);
            printZone.innerHTML = "";
            cleanData.forEach(person => {
                printZone.innerHTML += `<a target="_blank" href="https://www.themoviedb.org/person/${person.id}" class="card m-auto mt-2" style="width:25rem; height:max(47.5rem, min-content);color:black; text-decoration: none;">
                                                <img src="https://image.tmdb.org/t/p/w500${person.profile_path}" class="card-img-top" style="height: 30rem;object-fit: cover;" alt="${person.name}">
                                                <div class="card-body">
                                                    <h2 class="card-title">${person.name}</h2>
                                                    <h3>Conocido por...</h3>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">${person.known_for[0].title}</li>
                                                        <li class="list-group-item">${person.known_for[1].title}</li>
                                                        <li class="list-group-item">${person.known_for[2].title}</li>
                                                    </ul>
                                                </div>
                                            </a>`
            })
        }


    } catch (error) {
        console.error(error);
    }
}

const searcher = document.getElementById('searcher')
const printZone = document.getElementById('printZone')

searcher.addEventListener('submit', (e) => {
    e.preventDefault();
    getFilms(e.target.search.value, e.target.where.value);
    e.target.search.value = ""
})