function getParameterByName(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function formattedString(value) {
  return value.split(";").join("<li>");
}

var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appTp6UQvc8Q7F18e/Decks?api_key=keyorwAJW52Aa0nI4",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          // Play with this section only --------------------------------
          var picture = record.fields["Picture"];
          var deckName = record.fields["Deck Name"];
          var strategy = record.fields["Strategy"];
        
          // Replace variable names to push
          html.push(listView(id, picture, deckName, strategy));
          // playing ends here ------------------------------------------
        });
        $(".list-view").append(html);
      }
    );
  };


  var listView = function(id, picture, deckName, strategy) {
    return `
    <div class="do-hover col-md-4 cardImageText">
      <div class="card mb-4" style="background: navy">

        <a href="index.html?id=${id}" style="text-decoration: none">
          <div class="card-image">
            ${picture ? `<img src="${picture[0].url}" class="card-img-top" style="height-auto; border-radius: 18px;">` : ``}
          </div>

          <div class="card-text">
            <h5 class="card-key" style="color: white">${deckName}</h5>
          </div>
        </a>
      </div>
    </div>
    `;
  };

function searchFunction() {
  var input, filter, cardimagetext, i, x;
  input = document.getElementById('myinput');
  filter = input.value.toUpperCase();
  cardimagetext = document.getElementsByClassName('cardImageText');

  for (x = 0; x < cardimagetext.length; x++) {
    i = cardimagetext[x].getElementsByClassName('card-key')[0];
    if (i.innerHTML.toUpperCase().indexOf(filter) > -1) {
      cardimagetext[x].style.display = '';
    }
    else {
      cardimagetext[x].style.display = 'none';
    }
  }
}

var getOneRecord = function(id) {  
  $.getJSON(
    `https://api.airtable.com/v0/appTp6UQvc8Q7F18e/Decks/${id}?api_key=keyorwAJW52Aa0nI4`,
    function(record) {
      var html = [];
      var picture = record.fields["Picture"];
      var deckName = record.fields["Deck Name"];
      var strategy = record.fields["Strategy"];
      var mainDeck = record.fields["Main Deck"];
      var extraDeck = record.fields["Extra Deck"];
      var learningCurve = record.fields["Learning Curve"];
      var priceRange = record.fields["Price Range"];
      html.push(
        detailView(
          picture,
          deckName,
          strategy,
          mainDeck,
          extraDeck,
          learningCurve,
          priceRange
        )
      );
      $(".detail-view").append(html);
    }
  );
};


var detailView = function(
  picture,
  deckName,
  strategy,
  mainDeck,
  extraDeck,
  learningCurve,
  priceRange
) {
  return `

  <div class="no-hover col-md-4">
    <div class="card mb-4">
    ${picture ? `<img src="${picture[0].url}" class="card-img-top" style="height-auto; border-radius: 18px;">` : ``}
      <div class="card-body">
        <h2 class="card-title">${deckName}</h2>
        <p class="card-text" style="text-align: center; font-size: 20px;">
          <br>
          <strong> Strategy: </strong> <br>
          ${strategy} <br> <br>
          <strong> Learning Curve: </strong> <br>
          ${learningCurve} <br> <br>
          <em> [ 1: Easy <br> 10: Difficult ] </em> <br> <br>
          <strong> Price Range: </strong> <br> 
          $${priceRange}
          <br> <br>
        </p>
      </div>
    </div>
  </div>
  <div class="no-hover col-md-4">
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title"> Main Deck </h2>
        <p class="card-text">
          ${formattedString(mainDeck)}<br>
        </p>
      </div>
    </div>
  </div>
  <div class="no-hover col-md-4">
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title"> Extra Deck </h2>
        <p class="card-text">
          ${formattedString(extraDeck)}
        </p>
      </div>
    </div>
  </div>

  `;
};


var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} 
else {
  getAllRecords();
}