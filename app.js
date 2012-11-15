/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , social = require('./routes/social.js')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 1717);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/landing', routes.landing);
app.get('/parks/init', routes.init);
app.get('/filters', routes.filters);

app.get('/foursquare', social.foursquare);
app.get('/auth/foursquare', social.foursquare_login);
app.get('/auth/foursquare/callback', social.foursquare_callback);
app.get('/popup', social.popup);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
