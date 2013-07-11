var request = require("request");
var async = require("async");

exports.index = function(req, res){

};

exports.europeana = function(req, res) {
	
	var baseUrl = "http://europeana.eu/api/v2/search.json?wskey=";
	var apiKey = process.env.EUROPEANA_API_KEY;
	var query = "&query=picasso+pablo";

	request.get(baseUrl + apiKey + query, function(err, response, data){
		if(err) {
		res.send("There was an error requesting the url.")
		}
		var apiData = JSON.parse(data);
		var templateData =  {
			data : apiData
		}
		res.send("index.html", templateData);
	});
};

exports.rijks = function(req,res) {
	
	var baseUrl = "http://www.rijksmuseum.nl/api/oai/"+process.env.RIJKS_API_KEY+"/?";
	var query = "verb=ListRecords&set=collectie_online&metadataPrefix=oai_dc";
	var testUrl = "https://www.rijksmuseum.nl/api/oai/745c39a7-340c-4993-adf3-3e471238d528/?verb=listrecords&metadataPrefix=oai_dc"
	
	request.get(testUrl, function(err, response, data) {
		if(err) {
			console.log("There was an error requesting the url")
		}
		var parseString = require('xml2js').parseString;
		var xml = data;
		parseString(xml, function(err, result) {
			//console.log(result);
			var json = JSON.stringify(result);
			console.log(json);
			var templateData = {
			json : json
			}	
			res.send('index.html', templateData);
		});
	});
};

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

	var queryString = "africa";
	var queryUrl = "http://scrapi.org/ids?query=" + queryString;

	request.get(queryUrl, function(err, response, data){
		if(err) {
			res.send("There was an error requesting the URL")
		}
		apiData = JSON.parse(data);
		console.log(apiData);
		
		var templateData = {
			medium : apiData.Medium,
			what : apiData.What,
			whereBroad : apiData.Where[0],
			whereSpecific : apiData.Where[1],
			image : apiData.image
		};
		console.log(templateData);
		res.render("index.html", templateData);
	});
}