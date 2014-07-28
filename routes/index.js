var express = require('express'); 
var router = express.Router(); 
var util = require("util"); 
var fs = require("fs"); 

router.get('/', function(req, res) { 
  res.render("index", {title: "ohw", user: req.user });
});

router.post("/upload", function(req, res, next){ 
	if (req.files) { 
		console.log(util.inspect(req.files));
		if (req.files.sexy.size === 0) {
			return next(new Error("Hey, first would you select a file?"));
		}
		fs.exists(req.files.sexy.path, function(exists) { 
			if(exists) { 
				res.set('Content-Type', 'text/html');
				res.send("<html>" + "<head>" + "<link rel=stylesheet href=/stylesheets/style.css>" + "<title>" + req.files.sexy.name + "</title>" + "</head>" + "<body>" + "<h1>Got Your File!</h1>" + "<a href=" + "/" + req.files.sexy.name + ">" + "/" + req.files.sexy.name + "</a>" + "<br /><br />" + "<a href=/>go home</a>" + "</body>" + "</html>");
				fs.appendFile('./public/javascripts/uploads.json', util.inspect(req.files) + ',', function (err) {
				  if (err) throw err;
				  console.log('The "data to append" was appended to file!');
				});
			} else { 
				res.send("Well, there is no magic for those who don’t believe in it!"); 
			} 
		}); 
	} 
});


module.exports = router;