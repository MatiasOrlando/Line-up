

// VER TODAS LAS RESERVAS DE UNA SUCURSAL.
// Ruta GET para que un operador pueda ver todas las resevas confirmada para la sucursal en la que esta asignado
// req.params = sucursalID.
// Se buscaria todas las reservas y se filtraria cuales cuales de las reservas.sucursal.id = sucursalId
// las que coincidan se guardaria en una variable.
// Exito: En caso de que se encuentre reservas confirmadas para esa sucursal, se enviaria un estado 200 y las reservas encontradas.
// Fallo: En caso de que no se encuentre reservas confirmadas, se enviaria un estado 404 y un mensaje = {error: no se encontraron reservas}.

// MODIFICAR EL ESTADO DE UNA RESERVA.
// Ruta Put para que un operador pueda modificar el estado de una reserva de su sucursal, req.parmas = sucurdalId, reservaId, req.body = estadoAModificar.
// Se buscaria la reserva por el id de la reservaId, una vez encontrado se comprobraria que la reserva.sucursal.id coincida con el sucursalId del operador,
// por ultimo se modificaria el status de la reserva por el pasado por req.body
// Exito: En caso de se encuentre la reserva y se confirme que pertenece a la misma sucursal del operador y se modifique con el estado pasado, se enviaria un status 200 y la reserva modificada.
// Fallo: En caso de que falle algun proceso, se enviaria un estado 400 y un mensaje = {error: se fallo en modificar el estado de la reserva }.
