



routes.get("/:sucursalId", (req, res) => {
    return res.send("ruta que un operador puede ver todas sus reservas");
  });





routes.put("/editar/:reservaId", (req, res) => {
    return res.send("ruta que modifique el estado de la reserva");
  });