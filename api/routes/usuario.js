const User = require("../models/user")
const Branch = require("../models/branch")
const router = require("express").Router()

router.post("/", (req, res) => {
  const users = new User(req.body)
  users.save()
   return res.send(users);
 });


router.get("/", async (req, res) => {
 const users = await User.find().exec() 
   res.send(users);
});


router.post("/find", (req, res) => {
  const id = "641cc8ec09b9421f34b8e9e5"
  User.findById(id).exec().then((user)=> {
    console.log("USERRRR", user)
    console.log("IDDDD", user.id)
    const { operator, email, phone, id } = user
     const newBranch = new Branch({
        name: "sucursal" ,
      location:"Salta" ,
      hourRange:"12-13" ,
      MaxClients:1030 ,
      user: {id, email, phone, operator } }) 
      console.log("NEWbRANCH", newBranch)
      newBranch.save()
      res.send(newBranch)
    })
})




router.post("/login", (req, res) => {
  return res.send("ruta para loguar tu cuenta");
});


// LOGOUT ???.


router.post("/logout", (req, res) => {
  return res.send("ruta para desloguear tu cuenta");
});



router.get("/:id", (req, res) => {
  return res.send("ruta para ver los datos de tu cuenta");
});



router.put("/:id", (req, res) => {
  return res.send("ruta para editar tu contraseña");
});




router.put("/:id", (req, res) => {
  return res.send("ruta para editar los datos de tu cuenta");
});



module.exports = router