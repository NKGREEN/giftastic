$(document).ready(function() {

  var moods = [
    "mondays be like", "freaking out", "yay", "crying", "dismissed", "flirty",
    "shade", "not bad", "confused", "tired", "seriously",
    "nope", "thinking", "suspicious", "treatyoself", "hotline bling",
    "love", "lucky", "strut", "why", "evil laugh"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".mood-button", function() {
    $("#mood").empty();
    $(".mood-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8kg09rD41ApnOGiI7vQFXJTaORQfhV&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"mood-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var moodImage = $("<img>");
          moodImage.attr("src", still);
          moodImage.attr("data-still", still);
          moodImage.attr("data-animate", animated);
          moodImage.attr("data-state", "still");
          moodImage.addClass("mood-image");

          moodDiv.append(p);
          moodDiv.append(moodImage);

          $("#mood").append(moodDiv);
        }
      });
  });

  $(document).on("click", ".mood-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-mood").on("click", function(event) {
    event.preventDefault();
    var newMood = $("input").eq(0).val();

    if (newMood.length > 2) {
      moods.push(newMood);
    }

    populateButtons(moods, "mood-button", "#mood-buttons");

  });

  populateButtons(moods, "mood-button", "#mood-buttons");
});

