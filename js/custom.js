$(document).ready(function() {
  //console.log("qveen");''
  
  var songID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  $(".questionBox .lyrics button").click(function() {
  
    songID.sort(function(a, b){return 0.5 - Math.random()});
    var id = songID[0];
    songID.shift();
    console.log(id);
    
    $.ajax({
      type: "GET",
      url: "ajax/getGameLyrics.php",
      data: {'id': id},
      success: function(result) {
        console.log(result);
        var results;
        if(result) {
          try {
              results = JSON.parse(result);
          } catch(e) {
              alert("No more songs! Good game!"); // error in the above string (in this case, yes)!
          }
      }
        //var results = JSON.parse(result);
        //console.log(results);
        $(".questionBox .lyrics p").html(results[0]["lyrics"]);
      }
    });
  });
});
// Set another completion function for the request above
