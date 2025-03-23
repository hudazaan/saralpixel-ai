const mongoose= require("mongoose"); 

const connectDB= async () =>{
try{ 
    mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true, 
    }); 
    console.log("MongoDB is Connected!!"); 
} catch(error) {
    console.error("Connection error: ", error);
    process.exit(1); 
} 
};

module.exports= connectDB; 