$(document).ready(function() {
var tvShows = ["The Wire", "The Sopranos", "South Park", "Beavis and Butthead", "The Simpsons"];

function appendNewButton(tvShow) { 	
	var a = $('<button>');
    a.addClass('tv-shows');
    a.attr('data-name', tvShow);
    a.attr('title', 'Click to see GIFs');
    a.text(tvShow);
    $('#tv-show-buttons').append(a);
}

function renderButtons() { 
	for (var i = 0; i < tvShows.length; i++) {
		appendNewButton(tvShows[i]);
    }
}

renderButtons();

$('button').on('click', function() {
    var tvShow = $(this).data('tvShow');
//dont know where api is getting these results from    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var tvShowDiv = $('<div>');
        var p = $('<p>').text("Rating: " + results[i].rating);
        var tvShowImage = $('<img>').attr("src", results[i].images.original_still.url);
        tvShowDiv.append(p);
        tvShowDiv.append(tvShowImage);
        tvShowImage.addClass('tv-show-image-class');
        tvShowImage.attr('data-still', results[i].images.original_still.url);
        tvShowImage.attr('data-animate', results[i].images.original.url);
        $('#gifs-appear-here').prepend(tvShowDiv);
        }
    });

//not sure about emptying div in order to fill with new gifs when other buttons are pressed
		function emptyDiv () {
		$('#gifs-appear-here').empty();
		$('#gifs-appear-here').prepend(tvShowDiv); 
		}
		emptyyDiv();
});

$('#add-tv-show').on('click', function() {
     var tvShow = $('#tv-show-input').val().trim();
     tvShows.push(tvShow);
     appendNewButton(tvShow);
     return false;
 	});

//not sure if im doing click animate right!
$('.tv-show-image-class').on('click', function() {
 	var state = $(this).attr('data-state'); 
	if ( state == 'still'){
	    $(this).attr('src', $(this).data('animate'));
	    $(this).attr('data-state', 'animate');
		}
	else {
	    $(this).attr('src', $(this).data('still'));
	    $(this).attr('data-state', 'still');
		}
	});
});