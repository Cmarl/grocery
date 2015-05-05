'use strict';

var Mongoose = require('mongoose');

var itemSchema = Mongoose.Schema({
  name: {type: String, required: true},
  priority: {type: String},
  userId: {type: String, required: true},
  done: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, default: Date.now},
  qty: {type: Number, required: true},
  department: {type: String},
  photo: {type: String}
});

var Item = Mongoose.model('Item',itemSchema);
module.exports = Item;
