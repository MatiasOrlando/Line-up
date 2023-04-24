const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");

const users = [
  {
    name: "Administrador General",
    email: "admin@example.com",
    phone: 3112345678,
    password: "testing",
    admin: true,
    operator: false,
    dni: 93453333,
    status: "enabled",
  },
  {
    name: "Line up",
    email: "lineup@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23453323,
    status: "enabled",
  },
  {
    name: "Matias",
    email: "matias@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23353323,
    status: "enabled",
  },
  {
    name: "Mateo",
    email: "mateo@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 24453323,
    status: "enabled",
  },
  {
    name: "German",
    email: "german@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23458323,
    status: "enabled",
  },
  {
    name: "Pedro",
    email: "pedro@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23453023,
    status: "enabled",
  },
  {
    name: "Tomas",
    email: "tomas@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23653323,
    status: "enabled",
  },
  {
    name: "Nicholas",
    email: "nicholas@example.com",
    phone: 1112345678,
    password: "testing",
    admin: false,
    operator: false,
    dni: 23653923,
    status: "enabled",
  },
];

const sucursal = [
  {
    name: "Palermo",
    location: "CABA",
    openingHour: "10:30",
    closingHour: "22:00",
    allowedClients: 2,
    enabled: true,
    user: {
      name: "pepe",
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
    enabled: true,
    user: {
      name: "pepe",
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
    enabled: true,
    user: {
      name: "pepe",
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
    enabled: true,
    user: {
      name: "pepe",
      email: "operator4@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
  {
    name: "Villa Lynch",
    location: "Buenos Aires",
    openingHour: "12:00",
    closingHour: "13:00",
    allowedClients: 1,
    enabled: true,
    user: {
      name: "pepe",
      email: "operator5@example.com",
      phone: 1122334455,
      operator: true,
    },
  },
];

const turnos = [{}, {}, {}, {}, {}, {}, {}];

const CreateUsers = async () => {
  try {
    const userAdmin = await User.findOne({ email: "admin@example.com" });
    if (!userAdmin) {
      for (let user of users) {
        await User.create(user);
      }
      console.log("Multiple users were saved to the database!");
    }
  } catch (error) {
    console.error(error);
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

const CreateAppoitments = async () => {
  const appointmentAdm = await Appointment.findOne({
    "user.email": "admin@example.com",
  });
  if (!appointmentAdm) {
    await Appointment.create({
      date: "1990-05-10",
      timeOfAppoinment: "12:00",
      status: "pending",
      cancelReason: null,
      idApp: 12223300000,
      user: {
        name: "admin",
        email: "admin@example.com",
        phone: 1155069647,
      },
      sucursal: {
        name: "Villa Lynch",
        allowedClients: 1,
        openingHour: "12:00",
        closingHour: "13:00",
      },
    });
  }
};

const executor = async () => {
  await CreateUsers();
  await CreateBranches();
  await CreateAppoitments();
  // await CreateUsers2();
};

executor();
