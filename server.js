var express = require('express');
var request = require('request');
var app     = express();
const port = process.env.PORT || 3000;

app.get('/jmusic/:id', function(req, res){
 
  var id = req.params.id;
  url = 'https://api.jamendo.com/v3.0/tracks/?client_id=2742583e&namesearch='+id;
  //Test url -> http://localhost:3000/jmusic/broken+angel
  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		var arr = [];
		var titlee = "";
		var link = "";
		var art = "";
		var duration = "";
		var src = "https://www.jamendo.com";
		var albmImg = "";
		// var json = { title : "None", url : "None"};
						
				for (var key2 in body["results"]) {
					//arr.push(key2 + " -> "+body["data"][key2]);
							if(body["results"][key2].name){
								titlee = body["results"][key2].name;
							}
							if(body["results"][key2].audio){
								link = body["results"][key2].audio;
							}
							if(body["results"][key2].duration){
								duration = body["results"][key2].duration;
							}
							if(body["results"][key2].artist_name){
								art = body["results"][key2].artist_name;
							}
							if(body["results"][key2].album_image){
								albmImg = body["results"][key2].album_image;
							}
						arr.push({ title : titlee, url : link, artist : art, duration : duration, thumbnail : albmImg, source : src });
						titlee = "";
						link = "";
						art = "";
						duration = "";
						albmImg = "";
				}
			
		
		res.send(arr);

	  // var ranking="None";
      
      // 

	    // json.pakagenname=body.Package;
		// json.url=body.HeaderImage;
		// json.bit=1;
		return;
	}
	console.log("Error");
  })
})

app.get('/dmusic/:id', function(req, res){
 
  var id = req.params.id;
  url = 'https://api.deezer.com/search?q='+id;
  //Test url -> http://localhost:3000/dmusic/broken+angel
  request({ url: url,json: true}, function(error, response, body){
    if(!error){
		var arr = [];
		var titlee = "";
		var link = "";
		var art = "";
		var src = "https://www.deezer.com";
		var duration = "";
		var albmImg = "";
		// var json = { title : "None", url : "None"};
						
				for (var key2 in body["data"]) {
					//arr.push(key2 + " -> "+body["data"][key2]);
							if(body["data"][key2].title){
								titlee = body["data"][key2].title;
							}
							if(body["data"][key2].preview){
								link = body["data"][key2].preview;
							}
							if(body["data"][key2].duration){
								duration = body["data"][key2].duration;
							}
							if(body["data"][key2].artist.name){
								art = body["data"][key2].artist.name;
							}
							if(body["data"][key2].album.cover){
								albmImg = body["data"][key2].album.cover;
							}
						arr.push({ title : titlee, url : link, artist : art, duration : duration, thumbnail : albmImg, source : src  });
						titlee = "";
						link = "";
						art = "";
						duration = "";
						albmImg = "";
				}
			
		
		res.send(arr);
	  // var ranking="None";
      
      // 

	    // json.pakagenname=body.Package;
		// json.url=body.HeaderImage;
		// json.bit=1;
			return;
	}
	
	console.log("Error");
  })
})




app.listen(port)
  console.log('Server started on port', port);
exports = module.exports = app;
