const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

    try{
        mongoose.connect("mongodb+srv://valpas312:41667229Vv@cluster0.naob6w4.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connected to database")                
    } catch (error) {
        console.log(error)
    }
    
module.exports = mongoose;