import mongoose from "mongoose";

async function connectToDB(){
    try{
        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB ", response.connection.host);
    }catch(err){
        console.error("There is problem in connecting to DB ", err.message);
        process.exit(1); // 1 means failure, 0 means success
    }
}

export default connectToDB;