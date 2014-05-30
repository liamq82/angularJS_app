var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    type: String,
    color: String,
    style: String,
    price: Number,
    description: String,
    quantity: Number
});

module.exports = mongoose.model('Item', ItemSchema);
