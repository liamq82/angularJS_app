var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/server_side_database'); // connect to our database

var Item = require('./app/models/item');
var User = require('./app/models/user');

app.use(bodyParser());
var port = process.env.PORT || 8080; // set our port

var router = express.Router(); // get an instance of the express Router

// var session = require('session');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            console.log(user);
            if (err) {
                console.log('error: ' + err);
                return done(err);
            }
            if (!user) {
                console.log('user not found');
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                console.log('invalid password');
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));

app.post('/login',
    passport.authenticate('local', {
        session: false,
        successRedirect: '/',
        failureRedirect: 'http://localhost:8000/app/#/inventory'
        /*,
        failureFlash: true*/
    })
);

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

app.get('/hello', function(req, res) {
    res.send('hello world');
});

/*app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log('login caught');
    console.log('username from request: ' + username);
    console.log('password from request: ' + password);

    res.json({
        username: username,
        password: password
    })
});*/

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

.post(function(req, res) {
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
