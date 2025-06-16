const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Asegurate de que MONGO_URI esté en el .env
    console.log(`🟢 Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error('🔴 Error al conectar a MongoDB:', error.message);
    process.exit(1); // Finaliza el proceso si la conexión falla
  }
};

module.exports = connectDB;
