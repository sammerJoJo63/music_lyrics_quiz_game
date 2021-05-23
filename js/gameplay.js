 function checkForCurrent() {
	 $.ajax({
	   type: "GET",
	   url: 'ajax/getCurrentLyrics.php',
	   //data: {'shown': 'on'},
		 success: function(r) {
		   var results;

		   if(r) {
			   try {
				   results = JSON.parse(r);
				   $(".questionBoxGame .lyrics p.songParaGame").html(results[0]["lyrics"] + "<br><br>");
				   $(".questionBoxGame .lyrics").attr("songID", results[0]["id"]);
				   $(".questionBoxGame .lyrics p.answerParaGame .title, .questionBoxGame .lyrics p.answerParaGame .artist").empty();
				} catch(e) {
					var identifyer = $(".questionBoxGame .lyrics").attr("songID");
					console.log($(".questionBoxGame .lyrics").attr("songID"));
					$.ajax({
					   type: "GET",
					   url: 'ajax/getCurrentAnswer.php',
					   data: {id: identifyer},
						 success: function(r) {
							 $(".questionBoxGame .lyrics p.answerParaGame").show();
							 //$(".questionBoxGame .lyrics p.songPara").hide();
							 //console.log(r);
							 var results = JSON.parse(r);
							 console.log(results);
							$(".questionBoxGame .lyrics p.answerParaGame .title").html(results[0]["title"]);
							$(".questionBoxGame .lyrics p.answerParaGame .artist").html(results[0]["artist"]);
						 }	
					});
				}
			}
		   
		   
		 }
	 });
	 setTimeout(checkForCurrent, 1000);
   }
   $(document).ready(function() {
	   checkForCurrent();
   });
 