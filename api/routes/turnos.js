

// CREACION DE RESERVA.
// Ruta POST para que un usuario haga una reserva, req.params = userId, req.body = SucursalUbicacion, Fecha, Horario, nombreCompleto, Telefono, Mail,
// Se buscaria el usuario por el id pasado por req.params, en caso de que el usuario exista se crearia la reserva con los datos pasados por el req.body.
// Exito: En caso de que la reserva se cree con exito, se enviaria un status 201 y se enviaria la reserva creada.
// Fallo: En caso de que la reserva no se cree con exito, se enviaria  un status 404 y un mensaje de {error: usuario no encontrado}.

// ACCEDER A TODAS TUS RESERVAS.
// Ruta GET para que un usuario acceda a todas sus reservas, req.body = userDni.
// se buscaria Todos los turnos y se comprobaria si el usuario guardado en turno coincide con el dni pasado del usuario, en caso de que conincida se guardaria todos los turnos en una variable.
// Exito: Una vez que se compare todos los turnos y se encuentre turnos de ese usuario,
// se enviaria un status 200 y se enviaria todas las reservas.
// Fallo: En caso de que no se encuentre reservas de ese usuario, se enviaria un status 404 y un mensaje {error: reservas no encontradas}.

// EDITAR UNA DE TUS RESERVAS.
// Ruta PUT para que un usuario edite una de sus reservas, req.params = reservaId   req.body sucursalEdit, HorarioEdit, nombreEdit, TelefonoEdir, MailEdit.
// Se buscaria la reserva que coincide con el id de req.params,
// una vez encontrada, se modificaria la reserva con los datos pasados por el req.body.
// Exito: Una vez modificados los datos de la reserva, se enviaria un estado 200 y la reserva modificada.
// Error: Si falla en encontrar una reserva para modificar, se enviaria un estado 404 y un mensaje {error: no se encontro la reserva}.

// CANCELAR UNA RESERVA.
// Ruta PUT para que un usuario elimine una de sus reservas, req.params = reservaId, req.body = motivoDeCancelacion.
// Se buscaria por el id pasado cual es la reserva que se tiene que modificar, una vez encontrada 
// se modificaria el status de esa reserva a CANCELADA, y tambien el motivo pasaria a ser el pasado por 
// req.body.
// Exito: En caso de que la reserva sea encontrada y pueda ser modificada satisfactoriamente,
// se envia un estado 200 y la reserva modificada.
// Fallo: Si falla en encontrar la reserva o modificar la reserva encontrada, se enviaria un estado 400 y un mensaje {error: Fallo la cancelacion de la reserva}.
