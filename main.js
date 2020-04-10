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
      <div class="card border-dark">
        ${picture ? `<img src="${picture[0].url}" class="card-img-top">` : ``}
        
        <div class="name">
          <h5>${deckName}</h5>
        </div>
      </div>
  

    `;
  };


var id = getParameterByName("id");
if (id)
{
  getOneRecord(id);
} 
else
{
  getAllRecords();
}