 function checkForCurrent() {
	 $.ajax({
	   type: "GET",
	   url: 'ajax/getCurrentLyrics.php',
	   //data: {'shown': 'on'},
		 success: function(r) {
		   var results;
		   results = JSON.parse(r);
		   $(".questionBoxGame .lyrics p").html(results[0]["lyrics"] + "<br><br>");
		 }
	 });
	 setTimeout(checkForCurrent, 500);
   }
   $(document).ready(function() {
	   checkForCurrent();
   });
 