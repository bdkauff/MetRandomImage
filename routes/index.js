var request = require("request");
var async = require("async");

exports.scrapiRandom = function(req,res) {
	//Each "scene" begins with a hit to scrAPI random image request
	var randomImageUrl = "http://scrapi.org/random?images=true";

	request.get(randomImageUrl, function(err, response, data) {
		if(err) {
			res.send("There was was an error requesting the URL")
		}

		apiData = JSON.parse(data);
		console.log(apiData);
			
			templateData = {
				medium : apiData.Medium,
				what : apiData.What,
				whereBroad : apiData.Where[0],
				whereSpecific : apiData.Where[1],
				image : apiData.image
			}

			console.log(templateData);
			res.render("index.html", templateData);
		
	});
};

exports.scrapiQuery = function(req, res) {

	var queryString = "egypt";
	var queryUrl = "http://scrapi.org/ids?query="+ queryString + "&images=true";

	request.get(queryUrl, function(err, response, data){
		if(err) {
			res.send("There was an error requesting the URL")
		}
		apiData = JSON.parse(data);
		console.log(apiData);

		if(apiData.image) {
			var templateData = {
				medium : apiData.Medium,
				what : apiData.What,
				whereBroad : apiData.Where[0],
				whereSpecific : apiData.Where[1],
				image : apiData.image
			};
		};
		console.log(templateData);
		res.render("index.html", templateData);
	});
}