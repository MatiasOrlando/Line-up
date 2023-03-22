

// CREAR UNA SUCURSAL.
// Ruta POST para crear una sucursal con su operador, rango horario, limite Maximo de clientes y ubicacion,
// req.body = ubicacion, horario, cupo y operador.
// req.params = adminId.
// Se buscaria el administrador comparando el id pasado con todos los usuarios,
// Y se verificaria que el usuario encontro tenga la propiedad superadmin = true
// en caso positivo, se crearia la sucursal con los datos pasados por req.body.
// Exito: En caso de que se pueda crear una sucursal, se enviaria un estado 201 y la sucursal creada.
// Fallo: En caso de que falle en crear la sucursal, se enviaria un estado 404 y un mensaje = {error: se fallo en crear la sucursal}.


routes.post("/:adminId", (req, res) => {
    return res.send("ruta que el admin cree una sucursal");
  });


// EDITAR UNA SUCURSAL.
// Ruta PUT para modificar una sucursal por operador, rango horario, limite maximo y ubicacion.
// req.params = adminID, sucursalId.
// Se buscaria el administrador comparando el adminId pasado con todos los usuarios,
// Y se verificaria que el usuario encontrado tenga la propiedad superadmin = true
// en caso positivo, se modificaria la sucursal con los datos pasados por req.body
// Exito: En caso de que se pueda modificar la sucursal, se enviaria un estado 200 y la sucursal modificada.
// Fallo: En caso de que no se pueda modificar la sucursal, se enviaria un estado 400 y un mendaje {error: no se pudo modificar la sucursal}.

routes.put("/editar/:adminId", (req, res) => {
    return res.send("ruta que el admin modifique una sucursal");
  });

// ELIMINAR UNA SUCURSAL.
// RUTA DELETE para eliminar una sucursal pasada por req.params por el administrador.
// req.params = adminId, sucursalId.
// Se buscaria el administrador comparando el adminId pasado con todos los usuarios,
// Y se verificaria que el usuario encontrado tenga la propiedad superadmin = true
// en caso positivo, se eliminaria la sucursal de la basa de datos.
// Exito: En caso de que se eliminara la sucursal, se enviaria un estado 200 y un mensaje {se elimino la sucursal}.
// Fallo: En caso de que no se pudiera eliminar la sucursal, se enviaria un estado 401 y un mensaje = {error: user is not authorized}.


routes.delete("/eliminar/:adminId", (req, res) => {
    return res.send("ruta que el admin elimine una sucursal");
  });


// ELIMINAR USUARIO.
// RUTA DELETE para eliminar un usuario pasado por req.params por el administrador.
// req.params = adminId, userToDeleteId.
// Se buscaria el administrador comparando el adminId pasado con todos los usuarios,
// Y se verificaria que el usuario encontrado tenga la propiedad superadmin = true
// en caso positivo, se eliminaria el usuario de la basa de datos.
// Exito: En caso de que se eliminara el usuario, se enviaria un estado 200 y un mensaje {se elimino el usuario}.
// Fallo: En caso de que no se pudiera eliminar el usuario, se enviaria un estado 401 y un mensaje = {error: user is not authorized}.


routes.delete("/eliminarUsuario/:adminId", (req, res) => {
    return res.send("ruta que el admin elimine un usuario");
  });


// VER TODAS LAS SUCURSALES.
// RUTA GET para ver todas las sucursales que existen en la base de datos.
// req.params = adminId.
// Se buscaria el administrador comparando el adminId pasado con todos los usuarios,
// Y se verificaria que el usuario encontrado tenga la propiedad superadmin = true.
// en caso positivo, se obtendrian todos las sucursales que hay, y se guardarian en una variable.
// Exito: En caso de que se encuentran las sucurdales, se enviaria un estado 200 y las sucursales encontradas.
// Fallo: En caso de que no se pueden obtener las sucursales, se enviaria un estado 401 y un mensaje = {error: user is not authorized}.


routes.get("/sucursales/:adminId", (req, res) => {
    return res.send("ruta que el admin vea todas las sucursales");
  });


// VER TODAS LOS USUARIOS.
// RUTA GET para ver todas los usuarios que existen en la base de datos.
// req.params = adminId.
// Se buscaria el administrador comparando el adminId pasado con todos los usuarios,
// Y se verificaria que el usuario encontrado tenga la propiedad superadmin = true
// en caso positivo, se obtendrian todos los usuarios que hay, y se guardarian en una variable.
// Exito: En caso de que se encuentran los usuarios, se enviaria un estado 200 y los usuarios encontrados.
// Fallo: En caso de que no se pueden obtener los usuarios, se enviaria un estado 401 y un mensaje = {error: user is not authorized}.


routes.get("/usuarios/:adminId", (req, res) => {
    return res.send("ruta que el admin vea todas los usuarios");
  });