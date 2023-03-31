const User = require("../models/user");
const Branch = require("../models/branch");
const Appointment = require("../models/appointment")
const router = require("express").Router();
const emailConfirmation = require("../config/emailConfirmation");
const mapUser = require("../config/userMapped");


router.post("/register", async (req, res) => {
  try {
    const userCreated = await User.create(req.body);
    return res.status(200).send(`User registered successfully`);

  } catch (error) {
    console.error(error);
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().exec();
    const allUsers = mapUser(users);
    return res.send(allUsers);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).send(`User not found`);
    const validatedUser = await user.validatePassword(password);
    if (!validatedUser)
      return res.status(401).send(`No authorization, Invalid credentials`);
    return res.status(200).send(user);
  } catch {
    return res.status(404).send("User not found");
  }
});

router.get("/:id", async (req, res) => {
  // Recibo por params id Usuario const {id} = req.params
  const idUser = "642365b81a45cf8b5f01c8dc";
  try {
    const userFound = await User.findById(idUser).exec();
    const selectedUser = mapUser([userFound]);
    return res.send(selectedUser);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  // Recibimos por req.body newPassword, idUser
  if(!req.body.phone){
    const { password } = req.body
    try {
      const userPasswordUpdate = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          password
        },
        { new: true }
      );
      await userPasswordUpdate.save();
      return res.send(`Password was successfully updated`);
    } catch (error) {
      console.error(error);
    }
  }else if(req.body.phone && req.body.password){
    const {phone, password} = req.body
    try {
      const userPasswordUpdate = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          password, phone
        },
        { new: true }
      );
      await userPasswordUpdate.save();
      return res.send(`Password was successfully updated`);
    } catch (error) {
      console.error(error);
    }
  }

  
});

router.post("/appointmentBooked", async (req, res) => {
  emailConfirmation();
});


router.get("/:id/:number", async(req, res) => {
  try {
    if(!req.params.id || !req.params.number){
      return res.status(400).send("missing key values")
    }
     const id = req.params.id;
     const number = req.params.number
     const limit = number * 12
     const appointments = await Appointment.find({
       "user.id": id,
     });
     if (!appointments[0]) {
       return res
         .status(404)
         .send({ message: "appointments of operator branch does not exist" });
     }
 const dataForUser = appointments.map((item) => {return {date: item.date, timeOfAppontment: item.timeOfAppontment, status: item.status,sucursal: item.sucursal.location, user: item.user.name }}) 
 if(dataForUser[0]){
  const pageInfo = dataForUser.splice(limit - 12, limit)
   return res.status(200).send(pageInfo);
 }else{
   return res.status(404).send({message: "Not appointments to be sent"})
 } 
   } catch (err) {
     console.log(err);
   }
})


router.get("/email/:email", async (req, res) => {
  // Recibo por params id Usuario const {id} = req.params
  const email = req.params.email
  try {
    if(!email){
      return res.status(400).send({message: "email cannot be undefined"})
    }
    const userFound = await User.findOne({email: email}).exec();
    console.log(userFound)
    if(!userFound){
      return res.status(400).send({message: "the email passed is not from any saved user"})
    }
    return res.status(200).send(userFound);
  } catch (error) {
    console.error(error);
  }
});




module.exports = router;
