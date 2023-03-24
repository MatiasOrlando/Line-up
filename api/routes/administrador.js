



routes.post("/:adminId", (req, res) => {
    return res.send("ruta que el admin cree una sucursal");
  });



routes.put("/editar/:adminId", (req, res) => {
    return res.send("ruta que el admin modifique una sucursal");
  });




routes.delete("/eliminar/:adminId", (req, res) => {
    return res.send("ruta que el admin elimine una sucursal");
  });





routes.delete("/eliminarUsuario/:adminId", (req, res) => {
    return res.send("ruta que el admin elimine un usuario");
  });




routes.get("/sucursales/:adminId", (req, res) => {
    return res.send("ruta que el admin vea todas las sucursales");
  });



  

routes.get("/usuarios/:adminId", (req, res) => {
    return res.send("ruta que el admin vea todas los usuarios");
  });