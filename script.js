const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Função para buscar filmes a partir de uma URL da API //
getMovies(APIURL);

async function getMovies(url) {
    // Realiza uma solicitação à API e aguarda a resposta
    const resp = await fetch(url);
    // Converte a resposta para JSON
    const respData = await resp.json();

    // Exibe os dados dos filmes na página
    showMovies(respData.results);
}

function showMovies(movies) {
    // Limpa o conteúdo atual dentro do elemento principal na página HTML
    main.innerHTML = "";

    // Olha para cada filme que recebemos da API, um de cada vez
    movies.forEach((movie) => {
        // Desestrutura o objeto 'movie' para extrair suas propriedades
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        // Especifica o que deve aparecer dentro do elemento <div>
        movieEl.innerHTML = `

            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        // Adiciona o elemento do filme ao elemento principal na página HTML
        main.appendChild(movieEl);
    });
}

// Basicamente é uma função que determina uma cor com base em uma pontuação. Se a pontuação for 8 ou mais, retorna 'green'

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});