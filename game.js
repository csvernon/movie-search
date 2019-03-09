function themeSong(){
    audio.play()
};
  // Initial array of movies
  var movies = ["Guardians of the Galaxy", "Interstellar", "Avengers: Infinity War", "Thor: Ragnarok", "Game Of Thrones"];

  // Function for dumping the JSON content for each button into the div
  function displayMovieInfo() {

    // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
    
    // Here we grab the text from the input box


    var movie = $(this).attr('data-name');
      if (movie = "undefined"){
        movie = $("#movie-input").val().trim();
      }
    // Here we construct our URL  
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      var poster = response.Poster;
      var title = response.Title;
      var plot = response.Plot;
      var released = response.Released;
      var rating = response.Rated;
      var director = response.Director;
      var actors = response.Actors;
    // $("#movie-view").text(JSON.stringify(response));
    $("#movie-view").text("Movie Title: " + title);
    $("#movie-view").append("<br></br>");
    $("#movie-view").append("Rating: " + rating);
    $("#movie-view").append("<br></br>");
    $("#movie-view").append("Released: " + released);
    $("#movie-view").append("<br></br>");
    $("#movie-view").append("Plot: " + plot);
    $("#movie-view").append("<br></br>");
    $("#movie-view").append("Actors: " + actors);
    $("#movie-view").append("<br></br>");
    $("#movie-view").append('<img src="'+ poster +'"/>');

});

// =================================================================
  }

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie to our button
      a.addClass("movie");
      // Adding a data-attribute
      a.attr("data-name", movies[i]);
      // Providing the initial button text
      a.text(movies[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    if (movie != ""){
    movies.push(movie);
    }
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    displayMovieInfo();
  });

  // Generic function for displaying the movieInfo
  $(document).on("click", ".movie", displayMovieInfo);
  $(document).on("click", "#add-movie", displayMovieInfo);
  // Calling the renderButtons function to display the intial buttons
  renderButtons();
