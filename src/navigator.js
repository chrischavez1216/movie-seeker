window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    if(location.hash.startsWith("#trends")){
        trendsPage();
    } else if(location.hash.startsWith("#search=")){
        searchPage();
    } else if(location.hash.startsWith("#movie=")){
      movieDetailsPage();
    } else if(location.hash.startsWith("#category=")){
        categoriesPage();
    } else {
        homePage();
    }
}

function homePage(){
    header.classList.remove('header-container--long');
    header.style.background = '';
    headerArrow.classList.add('inactive');
    h1CategoryHeader.classList.add('inactive');
    h1MovieSeeker.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    header.classList.add('header-container');

    popularSection.classList.remove('inactive');
    categoriesPreview.classList.remove('inactive');
    genericList.classList.add('inactive');
    movieDetail.classList.add('inactive');
    menuIcon.classList.remove('inactive');
    categoriesTitle.classList.remove('inactive');
    
    window.scrollTo(0, 0);

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage(){
    console.log('TRENDS');

    header.classList.remove('header-container--long');
    header.style.backgroung = ''
    headerArrow.classList.remove('inactive');
    h1CategoryHeader.classList.remove('inactive');
    h1CategoryHeader.innerText = 'Trends'
    h1MovieSeeker.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    popularSection.classList.add('inactive');
    categoriesPreview.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');
    categoriesTitle.classList.add('inactive');
    menuIcon.classList.add('inactive');

    getFullTrendingMovies();
    window.scrollTo(0, 0);
}

function searchPage(){
    header.classList.remove('header-container--long');
    header.style.backgroung = ''
    headerArrow.classList.remove('inactive');
    h1CategoryHeader.classList.add('inactive');
    h1MovieSeeker.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    popularSection.classList.add('inactive');
    categoriesPreview.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');
    categoriesTitle.classList.add('inactive');
    menuIcon.classList.add('inactive');

    const [_, query] = location.hash.split('=');

    getMoviesBySearch(query);

    window.scrollTo(0, 0);
}

function movieDetailsPage(){
    console.log('MOVIE DETAILS');

    headerHome.classList.add('header-container--long');
    // header.style.backgroung = ''
    headerArrow.classList.remove('inactive');
    h1CategoryHeader.classList.add('inactive');
    h1MovieSeeker.classList.add('inactive');
    searchForm.classList.add('inactive');
    searchButton.classList.add('inactive');

    popularSection.classList.add('inactive');
    categoriesPreview.classList.add('inactive');
    genericList.classList.add('inactive');
    movieDetail.classList.remove('inactive');
    categoriesTitle.classList.add('inactive');
    menuIcon.classList.add('inactive');

    window.scrollTo(0, 0);

    const [_, movieId] = location.hash.split('=');
    
    // h1CategoryHeader.innerText = categoryName;

    getMovieById(movieId);
}

function categoriesPage(){
    header.classList.remove('header-container--long');
    header.style.backgroung = ''
    headerArrow.classList.remove('inactive');
    h1CategoryHeader.classList.remove('inactive');
    h1MovieSeeker.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    popularSection.classList.add('inactive');
    categoriesPreview.classList.add('inactive');
    genericList.classList.remove('inactive');
    movieDetail.classList.add('inactive');
    categoriesTitle.classList.add('inactive');
    menuIcon.classList.add('inactive');

    // const url = location.hash.split('=');
    // const url2 = url[1].split("-");
    // const urlFinal =url2[0];

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    
    h1CategoryHeader.innerText = categoryName;

    window.scrollTo(0, 0);
    
    console.log(categoryId);
    getMoviesByCategory(categoryId);
}


headerArrow.addEventListener('click', () => {
    history.back();
    header.style.background = '';
})

trendsSeeMoreButton.addEventListener('click', () => {
    location.hash = "#trends";
});

searchButton.addEventListener('click', () => {
    location.hash = `#search=${searchForm.value}`;
    
});