var http = require('http');
var express = require('express');
var path = require('path');


var app = express();

//View Engine

app.set('views', path.join(__dirname, './dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Embed File server
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './dist')));
app.use('/*', (req, res) => {
  res.render('index.html');
 //res.sendFile(path.join(__dirname, './dist/index.html'));

});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
