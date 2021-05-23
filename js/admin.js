$(document).ready(function() {
    
  $.ajax({
    type: "POST",
    url: '../ajax/cleanGameAnswer.php',
    //data: {'id': id},
    success: function(result) {  
      //do stuff
    }
  });
  //SONG IDs  
  const N = 50;
  let songID = Array.from({length: N}, (_, index) => index + 1);
  
  
  $(".questionBoxAdmin .lyrics button.song").click(function() {
    songID.sort(function(a, b){return 0.5 - Math.random()});
    var id = songID[0];
    songID.shift();
        
    $.ajax({
      type: "GET",
      url: '../ajax/cleanGameLyrics.php',
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
            $(".questionBoxAdmin .lyrics p.songPara").html(results[0]["lyrics"] + "<br><br>");
            $(".questionBoxAdmin .lyrics button.timer").show();
            $(".questionBoxAdmin .lyrics button.song").hide();     
            $(".questionBoxAdmin .lyrics p.answerPara").hide();       
            $.ajax({
              type: "GET",
              url: '../ajax/setActiveLyrics.php',
              data: {'id': id},
              success: function(result) {
                
                clickForTimer()
                clickForAnswer(id);
                
              } // end success to set active ajax call
            }); // end set active ajax call
            
                
          } // end success to lyrics ajax call
        }); // end get lyrics ajax call
        
        
      } // end success to clean game ajax call
    }); // end clean game ajax call  
  
});

function clickForTimer() {
  $(".questionBoxAdmin .lyrics button.timer").click(function() {
    $(".questionBoxAdmin .lyrics p.timerPara").show();
    $(".questionBoxAdmin .lyrics button.timer").hide();
    var timeleft = 15;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        $(".questionBoxAdmin .lyrics button.answer").show();
        $(".questionBoxAdmin .lyrics p.timerPara").hide();
        $(".questionBoxAdmin .lyrics p.timerPara progress").attr("value","0");
      }
      document.getElementById("progressBar").value = 15 - timeleft;
      timeleft -= 1;
    }, 1000);
  });
} 
  
function clickForAnswer (identifyer) {
  $(".questionBoxAdmin .lyrics button.answer").click(function() {
    $.ajax({
      type: "POST",
      url: '../ajax/cleanGameAnswer.php',
      //data: {'id': id},
      success: function(result) {  
        //do stuff
      }
    });
    
    $.ajax({
      type: "GET",
      url: '../ajax/cleanGameLyrics.php',
      data: {'id': identifyer},
      success: function(result) {  
        
        $.ajax({
          type: "GET",
          url: '../ajax/getGameArtistTitle.php',
          data: {'id': identifyer},
          success: function(result) {
            
            $(".questionBoxAdmin .lyrics button.song").show();
            $(".questionBoxAdmin .lyrics button.answer").hide();
            document.getElementById("progressBar").value = 0
            var results;
            results = JSON.parse(result);

            $(".questionBoxAdmin .lyrics p.answerPara").show();
            $(".questionBoxAdmin .lyrics p.answerPara .title").html(results[0]["title"]);
            $(".questionBoxAdmin .lyrics p.answerPara .artist").html(results[0]["artist"]);       
          
            $.ajax({
              type: "GET",
              url: '../ajax/setActiveAnswer.php',
              data: {'id': identifyer},
              success: function(result) {
                //do stuff 
              } // end success to set active answer ajax call
            }); // end set active answer ajax call
            
          } // end success to title, artist ajax call
        }); // end get title, artist ajax call
                        
      } // end success to clean game ajax call
    }); // end clean game ajax call  
        
  }); // end answer click event
 
}
  
  
}); //end doc ready

