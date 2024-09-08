import mongoose from "mongoose"


export const connectDB = async () =>{
    try{
        const constring = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${constring.connection.host}`);

    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}