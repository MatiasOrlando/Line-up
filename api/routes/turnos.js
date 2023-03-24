

routes.post("/agregar", (req, res) => {
    return res.send("ruta para crear una reserva");
  });



routes.get("/:id", (req, res) => {
    return res.send("ruta para buscar todas las reservas de un usuario");
  });




routes.put("/:reservaId", (req, res) => {
    return res.send("ruta para modificar una reserva");
});
  



routes.put("/cancelar/:reservaId", (req, res) => {
    return res.send("ruta para modificar el estado del turno a cancelado");
});