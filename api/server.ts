import express, { Application } from "express";
import cors from "cors";
import dbConnection from "./db";
import dotenv from "dotenv";
import { Usuario  } from "./models/tsUser";
import { Branch } from "./models/tsBranch";
import { TurnosModelo } from "./models/tsAppointment";
import routerIndex from "./routes/index";

const app: Application = express();

dbConnection();

app.use(express.static("public"));

app.use(cors());

app.use(express.json());

// Mount the routerIndex middleware directly on the app instance
app.use("/api", routerIndex);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("SERVER LISTENING ON PORT ", port);
});





const users = [
  {
    name: "Administrador General",
    email: "admin@example.com",
    phone: 1112345678,
    password: "testing",
    admin: true,
    operator: true,
    dni: 2345333339,
  },
  {
    dni: 23456789,
    name: "Operador Sitio",
    email: "operador@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: true,
  },
  {
    dni: 34567891,
    name: "Matias Orlando",
    email: "matias@example.com",
    phone: 1112345678,
    password: "Testing",
    admin: false,
    operator: false,
  },
  {
    dni: 45678912,
    name: "Tomas Camacho",
    email: "tomas@example.com",
    phone: 1112345678,
    password: "Testing123",
    admin: false,
    operator: false,
  },
  {
    dni: 56789123,
    name: "Pedro Ragni",
    email: "pedro@example.com",
    phone: 1112345678,
    password: "Testing123!",
    admin: false,
    operator: false,
  },
];

const sucursal = [
  {
    name: "Palermo",
    location: "CABA",
    openingHour: "10:30",
    closingHour: "22:00",
    allowedClients: 2,
    user: {
      name:"pepe",
      email: "operator@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
  {
    name: "San Telmo",
    location: "CABA",
    openingHour: "07:30",
    closingHour: "20:00",
    allowedClients: 3,
    user: {
      name:"pepe",
      email: "operator2@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
  {
    name: "Villa Urquiza",
    location: "CABA",
    openingHour: "08:30",
    closingHour: "17:30",
    allowedClients: 4,
    user: {
      name:"pepe",
      email: "operator3@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
  {
    name: "Rosario",
    location: "Santa Fe",
    openingHour: "08:00",
    closingHour: "17:00",
    allowedClients: 2,
    user: {
      name:"pepe",
      email: "operator4@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
  {
    name: "Villa Lynch",
    location: "Buenos Aires",
    openingHour: "12:00",
    closingHour: "18:00",
    allowedClients: 5,
    user: {
      name:"pepe",
      email: "operator5@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
];
  
 
  const CreateUsersTs = async () => {
  const User = await Usuario.find().exec()
  if(!User[0]){
    try {
      for (let user of users) {
        await Usuario.create(user);
      }
      console.log("Multiple users were saved to the database!");
  } catch (error) {
    console.error(error);
  }
  }
  };
 
  const CreateBranches = async () => {
    try {
      const branches = await Branch.findOne({ name: "Palermo" });
      if (!branches) {
        for (let branch of sucursal) {
          await Branch.create(branch);
        }
        console.log("Multiple branches were saved to the database!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomPhoneNumber() {
  let phoneNumber = "";
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}
function generateRandomDni() {
  let phoneNumber = "";
  for (let i = 0; i < 11; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

function generatePassword() {
  let phoneNumber = "";
  for (let i = 0; i < 5; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

function generateHourRange() {
  let phoneNumber = "";
  for (let i = 0; i < 5; i++) {
    if (phoneNumber.length === 2) {
      phoneNumber += "-";
    } else {
      phoneNumber += Math.floor(Math.random() * 10);
    }
  }
  return phoneNumber;
}

function ramdomAllowedClients() {
  let phoneNumber = "";
  for (let i = 0; i < 3; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return Number(phoneNumber);
}

function generateRandomDate() {
  let phoneNumber = "2023";
  for (let i = 0; i < 9; i++) {
    if (phoneNumber.length === 4) {
      phoneNumber += "-";
    } else if (phoneNumber.length === 7) {
      phoneNumber += "-";
    } else {
      phoneNumber += Math.floor(Math.random() * 10);
    }
  }
  return phoneNumber;
}

function generateAppointmentTime() {
  let phoneNumber = "";
  for (let i = 0; i < 5; i++) {
    if (phoneNumber.length === 2) {
      phoneNumber += ":";
    } else {
      phoneNumber += Math.floor(Math.random() * 10);
    }
  }
  return phoneNumber;
}

  const CreateAppoitments = async () => {
  try {
    const user = await Usuario.find().exec();
    const appoint = await TurnosModelo.find().exec();
    const branches = await Branch.find().exec();
    if (!appoint[0]) {
      for (let e = 0; e < 10; e++) {
        for (let i = 0; i < branches.length; i++) {
          const { _id, name, email, phone } = user[i];
          const {
            location,
            allowedClients,
            closingHour, openingHour, 
            name: nombre,
          } = branches[i];
          const ID = branches[i].id;
          const newAppoinment = await TurnosModelo.create({
            date: generateRandomDate(),
            timeOfAppointment: generateAppointmentTime(),
            status: "pending",
            cancelReason: null,
            user: { _id, name, email, phone },
            sucursal: { _id: ID, location, allowedClients, closingHour, openingHour },
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
  


 
  const executor = async () => {
    await CreateUsersTs();
    await CreateBranches();
    await CreateAppoitments();
    // await CreateUsers2();
  };

  executor();