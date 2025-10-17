const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//create Schema

const userSchema = new Schema ({
    email : {
        type : String,
        required : true,
    }
});

userSchema.plugin(passportLocalMongoose);  // by default mongoose create in username and passwort with hash and salt function in our schema
//export
module.exports = mongoose.model('User', userSchema);