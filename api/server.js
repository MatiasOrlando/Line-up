const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
const User = require("./models/user");
const Branch = require("./models/branch");
const Appointment = require("./models/appointment");
const seed = require("./config/seed");
const routerIndex = require("./routes");
const { swaggerDocs } = require("./routes/swagger");
require("dotenv").config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static("public"));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

app.use("/api", routerIndex);
// Rutas

app.listen(3001, () => {
  console.log(`Servidor corriendo en puerto ${3001}`);
  swaggerDocs(app, 3001);
});
