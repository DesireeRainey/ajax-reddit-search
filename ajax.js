// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $('#search-form').on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var userInput = $('#query').val() || 'kittens'; 
  $.get('https://www.reddit.com/search.json', {
    q: userInput,
    limit: 10
    }).done(function(response) {
      console.log(response.data.children);
      addSearchResult(response.data.children)
  });
}

  
// Clear previous search results.
function clearSearchResults() {
  $('#results').html(''); //this will clear the search results
  // document.getElementById('results').value = '';
}

// Adds a single result object to the page.
function addSearchResult(results) {
  for(var i = 0; i < results.length; i++) {
    console.log(results[i].data.title);
    // Create a list item to contain the search result link
    var li = document.createElement('li');
    // create an anchor tag
    //var a = $('<a>')
     var a = document.createElement('a');
     a.href = results[i].data.url;
     a.textContent = results[i].data.title; 

     var image = document.createElement('img');
     image.src = results[i].data.thumbnail;
     image.style.height = 25;
     image.style.width = 25;
    // put the link inside the list item.
    $(li).append(image);
    $(li).append(a);
    // add the list item to the list of search results
    $('#results').append(li);
  }
}

