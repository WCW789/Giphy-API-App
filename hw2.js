var topics = ["Dog", "Octopus", "Snake", "Crab", "Cat", "Jellyfish", "Owl", "Snail", "Horse", "Dolphin"];

function gifNameFunction() {
    var gifName = $(this).attr("data-name");
    console.log(gifName);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifName + "&api_key=05jHN6FfodWNWoIBPIyhABSJESZaaaWL&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {  
        var results = response.data;
        console.log(results);

        for (var j = 0; j < results.length; j++) {
            var gifAnotherDiv = $("<div>");

            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating);

            var gifImg = $("<img>");
            gifImg.addClass("gifImgClass");
            gifImg.attr("src", results[j].images.fixed_height_still.url);
            
            gifImg.attr("data-animate", results[j].images.fixed_height.url);
            gifImg.attr("data-state", "still");
            gifImg.attr("data-still", results[j].images.fixed_height_still.url);
          
        
            gifAnotherDiv.prepend(p);
            gifAnotherDiv.prepend(gifImg);

            $("#gifAppear").prepend(gifAnotherDiv);
        }
      }); 
    
    }

function renderButtons() {
    $("#gifView").empty();

    for(var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("gifClass");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#gifView").append(button);
        }   
}

$("#gifAdd").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gifInput").val().trim();
    topics.push(gif);
    renderButtons();
});

$(document).on("click", ".gifClass", gifNameFunction);

$(document).on("click", ".gifImgClass", function() {
    var state = ($(this).attr("data-state"));
    console.log("State:" + state)
             
    if(state === "still") {
    console.log("Hello");
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate")
       
    } else { 
    console.log("Nope");
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still")
    }
}); 

renderButtons();
