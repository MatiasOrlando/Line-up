import mongoose from "mongoose";


async function dbConnection(){
    try{
        await mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("DB TYPESCRIPT ONLINE");
    }
    catch(error){
        console.log(error);
        throw new Error(" FAILED TO INIT DB TYPESCRIPT")
    }
   
}

export default dbConnection;