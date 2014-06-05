var express = require('express'); // call express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var mongoose = require('mongoose');
var Item = require('./app/models/item');
var User = require('./app/models/user');
// var session = require('session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express(); // define our app using express
// app.use(bodyParser());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
// app.use(session({
//     secret: 'keyboard cat'
// }));


app.use(cookieParser());
app.use(bodyParser());
app.use(session({
    secret: 'keyboard cat'
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());









mongoose.connect('localhost:27017/server_side_database'); // connect to our database

var port = process.env.PORT || 8080; // set our port
var router = express.Router(); // get an instance of the express Router

passport.serializeUser(function(user, done) {
    console.log('serialize: user id ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // console.log('de-serialize: user id', user.id);
    User.findById(id, function(err, user) {
        console.log('de-serialize: find user ', user.id);
        done(err, user);
    });
});

function ensureAuthenticated(req, res, next) {
    console.log('ensure authentication: ', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.send([{
        message: 'authentication failed'
    }]);
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                console.log('strategy:  error ', err);
                return done(err);
            }
            if (!user) {
                console.log('strategy: user not found');
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            // if (!user.validPassword(password)) {
            //     console.log('invalid password');
            //     return done(null, false, {
            //         message: 'Incorrect password.'
            //     });
            // }
            console.log('strategy: ' + user.username + ' logged in');

            return done(null, user);
        });
    }
));

app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log('post: isAuthenticated ', req.isAuthenticated());
        console.log('post: req body ', req.body);
        console.log('post: req cookie ', req.cookies);

        // `req.user` contains the authenticated user.
        console.log('post: req user ', req.user);
        //res.redirect('http://localhost:8000/app/#/inventory');
        res.send({
            message: 'Logged in'
        });

    });

app.get('/inventory/item/:id', ensureAuthenticated,
    function(req, res) {
        var id = req.params.id;
        Item.find({
            _id: id
        }, function(err, item) {
            if (err) {
                console.log('get item: error ', err);
                res.send(err);
            } else if (item) {
                console.log('get item: ', item);
                res.send(item);
            }
        })
    });


app.post('/addUser', function(req, res) {
    console.log('create user ' + req.body.username);
    console.log('create password ' + req.body.password);
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {

        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'User created!'
            });
        }

    });
});

app.get('/users', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});


router.route('/item/:id')

.delete(function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    Item.findByIdAndRemove(id, function(err, item) {
        if (err) {
            res.send(err);
        } else {
            if (item) {
                res.json(item);
            } else {
                res.send('item not found');
            }
        }
    })
});

router.route('/item')

.post(ensureAuthenticated, function(req, res) {
    console.log('adding item ' + req.body.type);
    console.log('browser cookie follows' + req.cookies);
    console.log(req.cookies);
    var item = new Item();
    item.type = req.body.type;
    item.color = req.body.color;
    item.style = req.body.style;
    item.price = req.body.price;
    item.description = req.body.description;
    item.quantity = req.body.quantity;

    item.save(function(err) {

        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Item created!'
            });
        }

    });

}).get(function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
});

app.use('/inventory', router);
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
app.listen(port);
console.log('Server.js started on port ' + port);
