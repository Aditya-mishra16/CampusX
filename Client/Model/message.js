const mongoose = require("mongoose");

const trySchema = new mongoose.Schema({
    email: String,
    password: String
})
const item = mongoose.model("items",trySchema);
module.exports = item;