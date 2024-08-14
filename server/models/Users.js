const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    items: String,
    quantity: String,
    price: String
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel