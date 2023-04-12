const  { userSchema, Usuario} = require("../models/tsUser")
const  { brachSchema, Branch} = require("../models/tsBranch")


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
  if(!User[0].name){
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
  


 
  const executor = async () => {
    await CreateUsersTs();
    await CreateBranches();
    // await CreateAppoitments();
    // await CreateUsers2();
  };
  
 