
const User = require("../models/user")
const Branch = require("../models/branch")
const Appointment = require("../models/appointment")

  
  
var nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
];

var location = ["Rosario", "Berlin", "Salta", "Washington", "Tierra del Fuego",
"Capital Federal", "Tokyo", "Moscu", "Silicon Valey", "Auckland", "Bernal", "Amsterdam", "Sydney" ]



async function generateRandomPhoneNumber () {
    let phoneNumber = '';
    for (let i = 0; i < 10; i++) {
      phoneNumber += await Math.floor(Math.random() * 10);
    }
    return phoneNumber;
  }

  async function generateRandomDni() {
    let phoneNumber = '';
    for (let i = 0; i < 11; i++) {
      phoneNumber += await Math.floor(Math.random() * 10);
    }
    return phoneNumber;
  }

  async function generatePassword() {
    let phoneNumber = '';
    for (let i = 0; i < 5; i++) {
      phoneNumber += await Math.floor(Math.random() * 10);
    }
    return phoneNumber;
  }

  async function generateHourRange() {
    let phoneNumber = '';
    for (let i = 0; i < 5; i++) {
        if(phoneNumber.length === 2){
            phoneNumber+= "-"
        }else{
            phoneNumber += await Math.floor(Math.random() * 10);
        }
    }
    return phoneNumber;
  }

  async function ramdomAllowedClients() {
    let phoneNumber = '';
    for (let i = 0; i < 3; i++) {
      phoneNumber += await Math.floor(Math.random() * 10);
    }
    return Number(phoneNumber);
  }

  async function generateRandomDate() {
    let phoneNumber = '2023';
    for (let i = 0; i < 9; i++) {
        if(phoneNumber.length === 4){
            phoneNumber += "-"
        }
        else if(phoneNumber.length === 7){
            phoneNumber += "-"
        }else{
            phoneNumber += await Math.floor(Math.random() * 10);
        }
    }
    return phoneNumber;
  }

  async function generateAppointmentTime() {
    let phoneNumber = '';
    for (let i = 0; i < 5; i++) {
        if(phoneNumber.length === 2){
            phoneNumber+= ":"
        }else{
            phoneNumber += await Math.floor(Math.random() * 10);
        }
    }
    return phoneNumber;
  }


  const CreateUsers = async () => {
    try {
        const user  = await User.find().exec()
        if(user[0] === undefined){
            for(let i = 0; i < 20; i++){
                const newUser = new User({
                    name:  nameList[Math.floor( Math.random() * nameList.length )],
                    email:  nameList[Math.floor( Math.random() * nameList.length )] + '@gmail.com',
                    phone: await generateRandomPhoneNumber(),
                    dni: await generateRandomDni(),
                    password: await generatePassword(),})

                    const usuario = await newUser.save()
                    console.log(usuario)
            }
        }
    }catch(err){
        console.log(err)
    }
  }






const CreateBranches = async () => {
try {
   const branches = await Branch.find().exec()
   if(branches[0] === undefined){
    for(let i = 0; i < 20; i++){
        const newUser = new User({
            name: nameList[Math.floor( Math.random() * nameList.length )],
            email: nameList[Math.floor( Math.random() * nameList.length )] + '@gmail.com',
            phone: await generateRandomPhoneNumber(),
            dni: await generateRandomDni(),
            password: await generatePassword(),
            operator: true,}) 

          const newOperator = await newUser.save()
          const { operator, email, phone, id } = newOperator

          const newBranch = new Branch({
            name: location[Math.floor( Math.random() * location.length )] + " SUCURSAL" ,
          location:location[Math.floor( Math.random() * location.length )] ,
          hourRange: await generateHourRange(),
           allowedClients: await ramdomAllowedClients() , 
          user: {id, email, phone, operator },
        }) 

        const savedBranch = await newBranch.save()
        console.log(savedBranch)
    }
   }
}catch(err){
    console.log(err)
}
}




const CreateAppoitments = async () => {
   try{
    const user = await User.find().exec()
    const appoint = await Appointment.find().exec()
    const branches = await Branch.find().exec()
    if(!appoint[0]){
        for(let e = 0; e < 10; e++){
            for(let i = 0; i < branches.length; i++ ){
                const { id, name, email, phone} = user[i]
                const { location, allowedClients, hourRange} = branches[i]
                const ID = branches[i].id
                const newAppoinment = new Appointment({
                    date: await generateRandomDate(),
                    timeOfAppontment: await generateAppointmentTime(),
                    status: 'pending',
                    cancelReason: null,
                    user: { id, name, email, phone },
                    sucursal: { id: ID, location, allowedClients, hourRange }
                    
                  }) 
                  const savedAppointment = newAppoinment.save()
                  console.log(savedAppointment)
            }
        }
    }
    
   }
   catch(err){
    console.log(err)
   }
}




const executor = async () => {
    await CreateUsers()
    await CreateBranches()
    await CreateAppoitments()
}

executor()

