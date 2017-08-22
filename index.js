$(document).ready(function(){
	var $city = $("#city");
	var $statement = $("#statement");
	var $wind = $("#wind");
	var $temperature = $("#temperature");
	var $buttonConvert = $("#buttonConvert");
	var flag = 0;

	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
	  	var latitude = position.coords.latitude;
	  	var longitude = position.coords.longitude;
	  	
		    $.ajax({
				type: 'GET',
				url: 'https://api.darksky.net/forecast/' + '4b924441b8dd1f5e10007c37a4d08831' + '/' + latitude +',' + longitude,
				dataType: 'json',
				success: function(data){

					//Convertendo Simbolos data.timezone para melhor compreensao
					var stringUni = [];
					var stringChar = [];
					for (var i=0; i<data.timezone.length; i++){
						stringUni.push(data.timezone.charCodeAt(i));
					}

					for (var j=0; j<stringUni.length; j++){
						if (stringUni[j] == 47){
							stringUni[j] = 45;
						}
						else if(stringUni[j] == 95){
							stringUni[j] = 32;
						}
					}
					for (k=0; k<stringUni.length; k++){
						stringChar.push(String.fromCharCode(stringUni[k]));
					}
					finalString = stringChar.join("");
					// -----------------------------

					$city.html(finalString);	
					$temperature.html(Math.round(data.currently.temperature));
					$statement.html(data.currently.summary);
					$wind.html(data.currently.windSpeed);
				}

			});
    	});
	}

	$buttonConvert.click(function(){
		if (flag == 1){
			var celsius = parseInt($temperature.html());
			var f = (9*celsius/5) + 32;
			$temperature.html(Math.round(f));
			$buttonConvert.html("C");
			flag = 0;
			return;
		}

		else if (flag == 0){
			var f = parseInt($temperature.html());
			var celsius = 5 * (f - 32)/9
			$temperature.html(Math.round(celsius));
			$buttonConvert.html("F");
			flag++;
			return;
		}
	});


});