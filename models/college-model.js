const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name:String,
    yearFounded:String,
    city:String,
    state:String,
    country:String,
    courses:[String],
});

const College = mongoose.model('College', collegeSchema);
module.exports = College;

