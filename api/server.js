const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
require("dotenv").config();
const User = require("./models/user");
const Branch = require("./models/branch");
const Appointment = require("./models/appointment");
const seed = require("./config/seed");
const routerIndex = require("./routes");

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
});

/*  const newUser = new User({
        name: 'newperson',
        email: '3sdfsdf@gmail.com',
        phone: "12389",
        dni: 42029543,
        password: "123456",
        operator: true

})
newUser.save() */

/* const usuario = User.findOne({name: "newperson"}).exec().then((user)=> {
    console.log("USER", user)
     const newBranch = new Branch({
        name: "sucursal" ,
      location:"Salta" ,
      hourRange:"12-13" ,
      MaxClients:1030 ,
      user: user,
    }) 

    console.log(newBranch)
    newBranch.save()
}) */

/* const newAppoinment = new Appointment({
    date: '2022-04-01',
    timeOfAppontment: '14:30',
    status: 'pending',
    cancelReason: null,
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: 123456789
    },
    sucursal: {
      location: 'Main Street 123',
      MaxClients: 10,
      hourRange: '10:00-20:00'
    }
  }) 
  newAppoinment.save() */
