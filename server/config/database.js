const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@cluster0.lapa8.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async ()=> {
    mongoose.connect((URI), {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
        .then(() => console.log("DB connected"))
        .catch(error => console.log(error));
};

module.exports = connectDB;