var http = require('http')
   passport = require('passport')
  , Foursquare = require('passport-foursquare').Strategy
  , instagram = require('passport-instagram').Strategy
  , nconf = require('nconf').file({file: 'settings/social.json'})
  , venues = require('foursquarevenues')(nconf.get('4SQ_CLIENT_ID'), nconf.get('4SQ_CLIENT_SECRET'));

//foursquare

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new Foursquare({
    clientID : nconf.get('4SQ_CLIENT_ID'),
    clientSecret : nconf.get('4SQ_CLIENT_SECRET'),
    callbackURL: "http://127.0.0.1:1717/auth/foursquare/callback",
},
    function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Foursquare profile is returned
      // to represent the logged-in user.  In a typical application, you would
      // want to associate the Foursquare account with a user record in your
      // database, and return that user instead.
      return done(null, profile);
    });
}));

exports.foursquare = function(req, res) {
    res.render('foursquare');
};

exports.foursquare_login = passport.authenticate('foursquare'), function(res, req) {
     
};

exports.foursquare_callback = 
            passport.authenticate('foursquare', { failureRedirect: '/#login'}),
        function(req, res) {
            res.redirect('/#foursquare');
        };

exports.popup = function(req, res) {
    var params = {
        "ll": req.query.lat + "," + req.query.lng,
        "query": req.query.name,
    }
    venues.getVenues(params, function(error, results) {
        if(!error) {
            var venue = (results.response.venues[0].name.toLowerCase() == req.query.name.toLowerCase()) ? results.response.venues[0] : null;
            res.render('popup', {
                venue: venue,
                user: req.user,
            });
        } else {
            console.log(error);
            res.send(500, { error: error}); 
        }
    });
};

