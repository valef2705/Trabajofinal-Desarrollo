const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Ya no usar useNewUrlParser ni useUnifiedTopology, porque son opciones por defecto y no se usan más
    });
    console.log('🟢 Turnos: Conectado a MongoDB → turnero');
  } catch (error) {
    console.error('🔴 Turnos: Error al conectar a MongoDB:', error);
    process.exit(1); // Salir si no puede conectar
  }
};

module.exports = connectDB;
