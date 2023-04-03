const FormCancel = () => {
  return (
    <>
      <div className="container-reason">
        <div className="hi-name">Hola Ivan</div>
        <div className="explanation-cancel">
          ¿Por qué desea cancelar su reserva?
        </div>
      </div>
      <hr className="line-hr" />
      <div className="no-show">
        <input type="checkbox" name="" value="" className="checkbox-noshow" />
        <p>Ya no quiero ir</p>
      </div>
      <hr className="line-hr" />
      <div className="no-show">
        <input type="checkbox" name="" value="" className="checkbox-noshow" />
        <p>Me equivoqué de horario</p>
      </div>
      <div className="container-cancel">
        <p className="p-cancel">Su reserva actual será cancelada</p>
        <p className="p-cancel">La cancelación no puede ser revertida</p>
        <button className="btn-primary" style={{ backgroundColor: "#E53939" }}>
          <span className="button-cancel-text">Confirmar cancelación</span>
        </button>
      </div>
      <hr className="line-hr" />
      <div className="no-show">
        <input type="checkbox" name="" value="" className="checkbox-noshow" />
        <p>Encontré un lugar mejor</p>
      </div>
      <hr className="line-hr" />
      <div className="no-show">
        <input type="checkbox" name="" value="" className="checkbox-noshow" />
        <p>Me cancelaron</p>
      </div>
      <hr className="line-hr" />
      <div className="no-show" style={{ marginBottom: "122px" }}>
        <input type="checkbox" name="" value="" className="checkbox-noshow" />
        <p>Otro</p>
      </div>
    </>
  );
};

export default FormCancel;
