require('dotenv').config();
const mongoose = require("mongoose")


const dbConnection = async() => {

    try {
        
        await mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializad DB');
    }
}

module.exports = dbConnection