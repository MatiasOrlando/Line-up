const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment");

const nameList = [
  "Time",
  "Past",
  "Future",
  "Dev",
  "Fly",
  "Flying",
  "Soar",
  "Soaring",
  "Power",
  "Falling",
  "Fall",
  "Jump",
  "Cliff",
  "Mountain",
  "Rend",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gold",
  "Demon",
  "Demonic",
  "Panda",
  "Cat",
  "Kitty",
  "Kitten",
  "Zero",
  "Memory",
  "Trooper",
  "XX",
  "Bandit",
  "Fear",
  "Light",
  "Glow",
  "Tread",
  "Deep",
  "Deeper",
  "Deepest",
  "Mine",
  "Your",
  "Worst",
  "Enemy",
  "Hostile",
  "Force",
  "Video",
  "Game",
  "Donkey",
  "Mule",
  "Colt",
  "Cult",
  "Cultist",
  "Magnum",
  "Gun",
  "Assault",
  "Recon",
  "Trap",
  "Trapper",
  "Redeem",
  "Code",
  "Script",
  "Writer",
  "Near",
  "Close",
  "Open",
  "Cube",
  "Circle",
  "Geo",
  "Genome",
  "Germ",
  "Spaz",
  "Shot",
  "Echo",
  "Beta",
  "Alpha",
  "Gamma",
  "Omega",
  "Seal",
  "Squid",
  "Money",
  "Cash",
  "Lord",
  "King",
  "Duke",
  "Rest",
  "Fire",
  "Flame",
  "Morrow",
  "Break",
  "Breaker",
  "Numb",
  "Ice",
  "Cold",
  "Rotten",
  "Sick",
  "Sickly",
  "Janitor",
  "Camel",
  "Rooster",
  "Sand",
  "Desert",
  "Dessert",
  "Hurdle",
  "Racer",
  "Eraser",
  "Erase",
  "Big",
  "Small",
  "Short",
  "Tall",
  "Sith",
  "Bounty",
  "Hunter",
  "Cracked",
  "Broken",
  "Sad",
  "Happy",
  "Joy",
  "Joyful",
  "Crimson",
  "Destiny",
  "Deceit",
  "Lies",
  "Lie",
  "Honest",
  "Destined",
  "Bloxxer",
  "Hawk",
  "Eagle",
  "Hawker",
  "Walker",
  "Zombie",
  "Sarge",
  "Capt",
  "Captain",
  "Punch",
  "One",
  "Two",
  "Uno",
  "Slice",
  "Slash",
  "Melt",
  "Melted",
  "Melting",
  "Fell",
  "Wolf",
  "Hound",
  "Legacy",
  "Sharp",
  "Dead",
  "Mew",
  "Chuckle",
  "Bubba",
  "Bubble",
  "Sandwich",
  "Smasher",
  "Extreme",
  "Multi",
  "Universe",
  "Ultimate",
  "Death",
  "Ready",
  "Monkey",
  "Elevator",
  "Wrench",
  "Grease",
  "Head",
  "Theme",
  "Grand",
  "Cool",
  "Kid",
  "Boy",
  "Girl",
  "Vortex",
  "Paradox",
];

const location = [
  "Rosario",
  "Berlin",
  "Salta",
  "Washington",
  "Tierra del Fuego",
  "Capital Federal",
  "Tokyo",
  "Moscu",
  "Silicon Valey",
  "Auckland",
  "Bernal",
  "Amsterdam",
  "Sydney",
];

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

//  const CreateUsers = async () => {
//    try {
//      const user = await User.find().exec();
//      if (user[0] === undefined) {
//        for (let i = 0; i < 20; i++) {
//         const newUser = new User({
//           name: nameList[Math.floor(Math.random() * nameList.length)],
//           email:
//             nameList[Math.floor(Math.random() * nameList.length)] +
//             "@gmail.com",
//           phone: generateRandomPhoneNumber(),
//           dni: generateRandomDni(),
//           password: generatePassword(),
//         });

//         const usuario = await newUser.save();
//         // console.log(usuario);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const users = [
  {
    dni: 12345678,
    name: "Administrador General",
    email: "admin@example.com",
    phone: 1112345678,
    password: "testing",
    admin: true,
    operator: false,
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

// const CreateBranches = async () => {
//   try {
//     const branches = await Branch.find().exec();
//     if (branches[0] === undefined) {
//       for (let i = 0; i < 20; i++) {
//         const newUser = new User({
//           name: nameList[Math.floor(Math.random() * nameList.length)],
//           email:
//             nameList[Math.floor(Math.random() * nameList.length)] +
//             "@gmail.com",
//           phone: generateRandomPhoneNumber(),
//           dni: generateRandomDni(),
//           password: generatePassword(),
//           operator: true,
//         });

//         const newOperator = await newUser.save();
//         const { operator, email, phone, id } = newOperator;
//         const newBranch = new Branch({
//           name:
//             location[Math.floor(Math.random() * location.length)] + " SUCURSAL",
//           location: location[Math.floor(Math.random() * location.length)],
//           hourRange: generateHourRange(),
//           allowedClients: ramdomAllowedClients(),
//           user: { id, email, phone, operator },
//         });

//         const savedBranch = await newBranch.save();
//         console.log(savedBranch);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const CreateAppoitments = async () => {
//   try {
//     const user = await User.find().exec();
//     const appoint = await Appointment.find().exec();
//     const branches = await Branch.find().exec();
//     if (!appoint[0]) {
//       for (let e = 0; e < 10; e++) {
//         for (let i = 0; i < branches.length; i++) {
//           const { id, name, email, phone } = user[i];
//           const {
//             location,
//             allowedClients,
//             hourRange,
//             name: nombre,
//           } = branches[i];
//           const ID = branches[i].id;
//           const newAppoinment = await Appointment.create({
//             date: generateRandomDate(),
//             timeOfAppontment: generateAppointmentTime(),
//             status: "pending",
//             cancelReason: null,
//             user: { id, name, email, phone },
//             sucursal: { id: ID, location, allowedClients, hourRange },
//           });
//           const savedAppointment = await newAppoinment.save();
//         }
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

const executor = async () => {
  await CreateUsers();
  // await CreateBranches();
  // await CreateAppoitments();
};

executor();
