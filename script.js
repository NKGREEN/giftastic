var themes = ['dragon', 'heffalump', 'unicorn', 'mermaid', 'yeti', 'nessie', 'orc', 'pokemon', 'pegasus', 'hydra', 'phoenix bird']


function displayGiphy() {


    var theme = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme +       "&api_key=8Kg09rD41ApznOGiI17vQFXJTaORQfhV&limit=10";

    console.log(queryURL);



    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        console.log(results);
        $(".giphy-display").empty();
        for (var i = 0; i < results.length; i++) {

            var showDiv = $("<div class='ml-1 mr-1 float-left'>");

            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_width.url;
            var staticSrc = results[i].images.fixed_width_still.url;
            var showImage = $("<img>");
            var p = $("<p>");
            p.addClass("mb-2");
            p.text("Rating: " + rating);

            showImage.attr("src", staticSrc);
            showImage.addClass("pausePlay");
            showImage.attr("data-state", "still");
            showImage.attr("data-still", staticSrc);
            showImage.attr("data-animate", defaultAnimatedSrc);
            showDiv.append(p);
            showDiv.append(showImage);
            $(".giphy-display").prepend(showDiv);
        }

    });

}


function renderButtons() {


    $(".btn-view").empty();
    for (var i = 0; i < themes.length; i++) {

        var a = $("<button>");
        a.addClass("giphy-btn ml-1 mr-1");
        a.attr("data-name", themes[i]);
        a.text(themes[i]);
        $(".btn-view").append(a);

    }
}


$(".fetch").on("click", function (event) {
    event.preventDefault();

    var theme = $(".theme-input").val().trim();


    themes.push(theme);
    renderButtons();
});




function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

function downloadImage(event, fileName) {

    console.log("this: " + event);
    var url = null;
    event.preventDefault();

    if (window.download && url) {
        fileName = fileName || url.split('/').pop().split('?')[0];
        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.responseType = 'blob';
        ajax.onload = function (e) {
            download(e.target.response, fileName, 'application/octet-stream');
            console.log(e.target.response);
        };
        setTimeout(function () { ajax.send(); }, 0); // allows setting custom ajax headers using the return:
        return ajax;
    }
}

$(document).on("click", ".pausePlay", pausePlayGifs);
$(document).on("click", ".giphy-btn", displayGiphy);



renderButtons();

        
