

// SINGUP.
// Ruta POST para que un usurio registre su cuenta. req.body = nombreApellido, DNI, mail, contrasenia.
// Exito:
// En caso de que se cree satisfactoriamente la cuenta, se enviaria el nuevo usuario con el status 201.
// Fallo:
// En caso de que no se cree la cuenta, se enviaria un status 200 con un mensaje de {error: no se pudo crear la cuenta}.

// LOGIN
// Ruta Get para que un usuario se loguee en su cuenta. req.params = userId, req.body = nombreCompleto, contrasenia, se buscaria el usuario por el id que llega por parametro en el modelo User, y se compararia si coincide el nombre y contrasenia con los datos que llegan del req body,
// Exito:
// En caso de que se los datos que paso el usuario y los guardados en la base de datos sean iguales, se enviaria un status 200 y el usuario buscado.
// Fallo:
// En caso de que la comparacion falle, se enviaria un status 401 y un mensaje de {error: usuario o contrasania no coincide}.

// LOGOUT ???.

// USER INFO.
// Ruta GET para que un usuario acceda y pueda ver los datos de su cuenta. req.params = id, se buscaria el usuario por el id que pasa del req params en el modelo User.
// Exito:
// En caso de que se encuentre el usuario buscado, se enviaria un status 200 y el usuario buscado.
// Fallo:
// En caso de que no se encuentre el usuario buscado, se enviaria un status 404, con el mensaje {error: usuario no encontrado}.


// EDIT PASSWORD.
// Ruta put para encontrar un usuario y modificar su contrasania, req.params = id, req.body = ContraseniaNueva,
// Exito
// En caso que se pueda editar de la base de datos la contrasenia del usuario, se enviaria un status 200 y un mensaje {contrasenia modificada}.
// Error
// En caso de que no se pueda modificar la contrasenia, se enviaria un status 404, con el mensaje {error: usuario no encontrado}.


// EDIT USER INFO ??? (name, email, dni telefono).

