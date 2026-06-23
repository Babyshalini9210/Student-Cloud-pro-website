const mongoose = require("mongoose");

const studentSchema =
new mongoose.Schema({

    studentId: String,

    name: String,

    email: String,

    phone: String,

    department: String,

    year: String,

    address: String

});

module.exports =
mongoose.model(
    "studentrecords",
    studentSchema
);