// alert("Hiii");

// Accessing all movie details card Element
let cast = document.getElementById("cast");
let title = document.getElementById("title");
let plot = document.getElementById("plot");
let rating = document.getElementById("rating");
let director = document.getElementById("director");
let genre = document.getElementById("genre");
let image = document.getElementById("image");
let backButton = document.getElementById("backButton");

//Here i add onclick listner to back button to movie details page
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Using this we can access query parameter
let queryParams = new URLSearchParams(window.location.search);

let id = queryParams.get("id"); // return john
console.log(id);

//Calling the setDetails() function
setDetails();

// This function set the details of movie
async function setDetails() {
  let movie = await fetchMovie(id);
  console.log(movie);

  // alert(movie.Title);

  title.innerHTML = movie.Title;
  cast.innerHTML = movie.Actors;
  plot.innerText = movie.Plot;
  rating.innerText = movie.imdbRating;
  director.innerText = movie.Director;
  rating.innerText = movie.imdbRating + "/10";
  genre.innerText = movie.Genre;
  image.src = movie.Poster;

  console.log(movie.Director);
}

//This function fetch movie from omdb api based on title of movie
async function fetchMovie(search) {
  //url of omdb
  let url = `http://www.omdbapi.com/?i=${search}&apikey=5bd5b8fa`;
  try {
    //Fetch movie from api
    let movie = await fetch(url);
    //Fetch movie converted into json format
    let movieInJsonFormat = await movie.json();
    return movieInJsonFormat;
  } catch (err) {
    console.log(err);
  }
}
