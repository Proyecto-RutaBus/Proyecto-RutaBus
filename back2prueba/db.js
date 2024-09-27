// db.js
import mongoose from "mongoose";

const uri = "mongodb+srv://RutaBus:1234@cluster0.hhodx.mongodb.net/RutaBus"; // Reemplaza 'tu_base_de_datos' con el nombre real de tu base de datos

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
