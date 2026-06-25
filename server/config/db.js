import mongoose from "mongoose";

export default async function connectDb(){
    try {
        mongoose.connection.on('connected', ()=>console.log("DB connected"))
        await mongoose.connect(process.env.MONGO_URL)
    }catch(error){
        console.log(error.message);
    }
}
