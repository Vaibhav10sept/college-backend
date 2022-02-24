const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:String,
    yearOfBatch:String,
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
      },
    skills:[String],
   
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

