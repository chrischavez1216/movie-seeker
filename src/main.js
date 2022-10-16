const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

function renderMovies (movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        
        movieContainer.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function renderCategories (categories, container){
    container.innerHTML = '';

    //Creating and rendering category's title in DOM for categories preview 
     categories.forEach(category => {
         const categoryContainer = document.createElement('div');
         categoryContainer.classList.add('category-container');
 
         categoryContainer.addEventListener('click', () => {
             location.hash = `#category=${category.id}-${category.name}`;
         });
 
         const categoryTitle = document.createElement('p');
         categoryTitle.classList.add('category-picture--title');
         categoryTitle.innerText = category.name;
 
         categoryContainer.appendChild(categoryTitle);
         container.appendChild(categoryContainer);
     });
}

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies[1]);
    renderMovies(movies, trendingSliderPreview);
}

async function getFullTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies);

    renderMovies(movies, genericList);
}

async function getMovieById(id){

    const { data: movie } = await api(`movie/${id}`);
    
    movieDetailTitle.textContent = movie.title;
    movieDetailOverview.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;


    header.style.background  = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})`;

    renderCategories(movie.genres, movieDetailCategories);
    getRelatedMoviesById(id);
    
}

async function getRelatedMoviesById(id){
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;

    renderMovies(relatedMovies, relatedMoviesContainer);
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    
    renderMovies(movies, genericList);
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    renderCategories(categories, categoriesPreview);
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query: query,
        }
    });
    const movies = data.results;
    
    renderMovies(movies, genericList);
}



