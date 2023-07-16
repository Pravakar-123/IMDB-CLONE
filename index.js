
// alert('hello');
//Getting the access of favorite movie section
let favoriteSection = document.getElementById('favoriteSection');

// This check that any movie present in favorite section or not if present then show it in favorite section
if (!localStorage.getItem('favoriteMovieList')) {
    localStorage.setItem('favoriteMovieList',favoriteSection.innerHTML);

}
else {

    favoriteSection.innerHTML = localStorage.getItem('favoriteMovieList');

}

//Finding search field by id
var searchField = document.getElementById("searchField");

//It is container of all movie card
let searchResult = document.getElementById("searchResult");


//This array contain all the suggested movie
var suggestionList = [];

//Adding keyup listener to search field
searchField.addEventListener("keyup", async function (event) {
    // alert("hiii");
    suggestionList = [];
    let search = searchField.value;

    if (searchField.value == "") {

        alert("empty");
    } else {
        //Call fetchMovie() function
        let data = await fetecMovie(search);
        //call addToSuggestionList() function to add fetched movie into suggestion list
        if (data.Response === 'False') {
            // alert('hello');
            let ans = await fetchMovieByTitle(search);
            if (ans.Response == 'True') {
                await addToSuggestionList(ans, true);
                suggestionList.push(ans);
                console.log(ans);

            }


        }
        else {
            await addToSuggestionList(data, false);

        }

    }

    // }
});



//This function fetch movie from omdb api based on title of movie
async function fetecMovie(search) {
    // alert("from short");
    //url of omdb
    let url = `http://www.omdbapi.com/?s=${search}&apikey=5bd5b8fa`;
    try {
        //Fetch movie from api
        let movie = await fetch(url);
        //Fetch movie converted into json format
        let movieInJsonFormat = await movie.json();
        console.log(movieInJsonFormat);
        return movieInJsonFormat;
    } catch (err) {
        console.log(err);
    }
}

//This function add movie to suggestion list and show it to search result container
function addToSuggestionList(data1, t) {
    if (t == false) {
        console.log(data1.Search[0]);

        searchResult.innerHTML = "";
        for (let i = 0; i < data1.Search.length; i++) {
            let data = data1.Search[i];
            if (data.Poster == "N/A") {
                data.Poster = "image/image-not-found-1-scaled-1150x647.png";
            }

            suggestionList.push(data);
            let searchResultCard = document.createElement("div");
            searchResultCard.className = "searchResultCard";

            searchResultCard.innerHTML = `<div class="imagePart"  onclick="redirectMoviePage(event);">
                                           <img  id="${data.imdbID}" src="${data.Poster}"  alt=" not found">
                                      </div>
                                      <div class="namePart"><h6 class="titleOfMovie">${data.Title}</h6></div>
                                      <div class="ratingPart"><div class="ratingDiv"><span></span></div>
                                      <div class="favoriteDiv"><i class="fa-solid fa-heart heart ${data.imdbID}"  onclick="addToFavoriteList(event);"></i></div></div>`;

            searchResult.appendChild(searchResultCard);
        }


    }
    else {
        searchResult.innerHTML = "";
        let d = data1;
        console.log(d);
        if (d.Poster == "N/A") {
            d.Poster = "/image/image-not-found-1-scaled-1150x647.png";
        }

        suggestionList.push(d);
        let searchResultCard = document.createElement("div");
        searchResultCard.className = "searchResultCard";

        searchResultCard.innerHTML = `<div class="imagePart"  onclick="redirectMoviePage(event);">
                                           <img  id="${d.imdbID}" src="${d.Poster}"  alt=" not found">
                                      </div>
                                      <div class="namePart"><h6 class="titleOfMovie">${d.Title}</h6></div>
                                      <div class="ratingPart"><div class="ratingDiv"><span></span></div>
                                      <div class="favoriteDiv"><i class="fa-solid fa-heart heart ${d.imdbID}"  onclick="addToFavoriteList(event);"></i></div></div>`;

        searchResult.appendChild(searchResultCard);

    }

}

// This function add a movie to favorite list 
async function addToFavoriteList(e) {
    // alert("hi");
    let id = e.target.className.split(' ')[3];

    console.log("addTofavoriteList");
    // console.log(id);
    if (!isPresent(id)) {
        let movie = await findMoviefromArray(id);
        // console.log(isPresent(id));
        // console.log(movie);

        let favoriteMovie = document.createElement('div');
        favoriteMovie.className = `favoriteMovie ${movie.imdbID}`;

        favoriteMovie.innerHTML = `
        <div class="favoriteMovieImage"> <img
            src=${movie.Poster}
            style="height: 50px; width: 50px;" alt></div>
        <div class="favoriteMovieName"><p>${movie.Title}</p></div>
        <div class="favoriteMovieDeleteButton"><button type="submit"  class='deleteButton' onClick='deleteFavoriteListItem(event)'>Delete</button></div>

        `;
        favoriteSection.innerHTML = localStorage.getItem('favoriteMovieList');

        // Append the movie in the favorite section 
        favoriteSection.appendChild(favoriteMovie);


        // Store the favorite movie in the local Storage 
        localStorage.setItem('favoriteMovieList', favoriteSection.innerHTML);

    }
    else {
        alert("Already added");
    }



}


// This function delete movie from favorite list 
function deleteFavoriteListItem(e) {
    e.target.parentElement.parentElement.remove()
    // alert("Hi");
    // console.log();
    localStorage.setItem('favoriteMovieList', favoriteSection.innerHTML);
}

// This function find the movie from suggestionList array then return the movie 
function findMoviefromArray(id) {

    // console.log(suggestionList[0]);
    for (let i = 0; i < suggestionList.length; i++) {
        console.log('findmoviefromarray');
        let a = suggestionList[i].imdbID
        // console.log(suggestionList[i]);
        if (a === id) {
            // console.log("true");
            return suggestionList[i];
        }

    }

    return false;
}


//This function check that movie is present in favorite list or not
function isPresent(id) {
    let favoriteMovies = document.getElementsByClassName('favoriteMovie');
    for (let i = 0; i < favoriteMovies.length; i++) {
        if (id === favoriteMovies[i].className.split(' ')[1]) {
            return true;

        }
        // console.log(favoriteMovies[i].className.split(' ')[1]);


    }

    return false;


}

// This function fetch movie by title 
async function fetchMovieByTitle(title) {
    // alert("from title");

    let url = `http://www.omdbapi.com/?t=${title}&apikey=5bd5b8fa`;
    try {
        //Fetch movie from api
        let movie = await fetch(url);
        //Fetch movie converted into json format
        let movieInJsonFormat = await movie.json();
        console.log(movieInJsonFormat);
        return movieInJsonFormat;
    } catch (err) {
        console.log(err);
    }

}

//This function redirect to a new page where we will show details of movie
function redirectMoviePage(e) {
    console.log(e.target.id);
    let id = e.target.id;
    // alert(id);
    window.location.href = `moviePage.html?id=${id}`;
    // console.log(e);
}

