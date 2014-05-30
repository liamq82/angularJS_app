var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/server_side_database'); // connect to our database

var Item = require('./app/models/item');

app.use(bodyParser());

var port = process.env.PORT || 8080; // set our port

var router = express.Router(); // get an instance of the express Router
router.route('/item')

.post(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    Item.find(function(err, items) {
        if (err) {
            res.send(err);
        } else {
            res.json(items);
        }
    });
}).delete(function(req, res, next) {
    var id = req.body.id;
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
    }) // executes

});

app.use('/inventory', router);
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
app.listen(port);
console.log('Server.js started on port ' + port);
