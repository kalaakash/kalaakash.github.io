const finalURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById("main");
const search = document.getElementById('search');
const form = document.getElementById('form');

//Initialize movies at the start
getMovies(finalURL);

async function getMovies(url){
    const response = await fetch(url);
    const responseData = await response.json();

    showMovies(responseData.results);
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    } else if(vote >= 5){
        return 'orange';
    } else{
        return 'red';
    }
}

function showMovies(movies){

    //clear main
    main.innerHTML = '';

    movies.forEach((movie) => {

        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        if(poster_path !== null) {
        
            movieEl.innerHTML = `
                <img src="${imgPath + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            `;
            main.appendChild(movieEl);
        }//if poster path exists

    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_URL + searchTerm);

        //clear search form
        search.value = '';
    }
    
});