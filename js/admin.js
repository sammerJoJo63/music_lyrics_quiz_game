$(document).ready(function() {
  //SONG IDs  
  var songID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  
  
  
  $(".questionBoxAdmin .lyrics button").click(function() {
    songID.sort(function(a, b){return 0.5 - Math.random()});
    var id = songID[0];
    songID.shift();
    
    $.ajax({
      type: "GET",
      url: '../ajax/cleanGame.php',
      data: {'id': id},
      success: function(result) {
    
        $.ajax({
          type: "GET",
          url: '../ajax/getGameLyrics.php',
          data: {'id': id},
          success: function(result) {
            
            var results;
            if(result) {
              try {
                results = JSON.parse(result);
              } catch(e) {
                alert("No more songs! Good game!");
              }
            }
            $(".questionBoxAdmin .lyrics p").html(results[0]["lyrics"] + "<br><br>");
            
            $.ajax({
              type: "GET",
              url: '../ajax/setActive.php',
              data: {'id': id},
              success: function(result) {
                //do stuff 
              } // end success to set active ajax call
            }); // end set active ajax call
            
                
          } // end success to lyrics ajax call
        }); // end get lyrics ajax call
        
        
      } // end success to clean game ajax call
    }); // end clean game ajax call
    
    
  }); // end click event
}); //end doc ready

