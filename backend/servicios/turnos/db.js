require('dotenv').config(); // 👈 Asegura que se cargue el archivo .env
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🟢 Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
