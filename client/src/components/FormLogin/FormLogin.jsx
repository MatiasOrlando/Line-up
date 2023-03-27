import { useFormik } from "formik";
import validationLogin from "./validation/validationLogin";

export default function FormLogin() {
  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
    validationSchema: validationLogin.validationSchema,
  });

  return (
    <div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div>
          <h2>Iniciar Sesion</h2>
        </div>
        <div>
          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            id="user"
            onChange={formik.handleChange}
            value={formik.values.user}
          />
          <div className="box-span">
            {formik.errors.user && (
              <span className="box-span">{formik.errors.user}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="pass">Contraseña</label>
          <input
            type="text"
            id="pass"
            onChange={formik.handleChange}
            value={formik.values.pass}
          />
        </div>
        <div>
          <p>Olvidaste tu contraseña ? </p>
        </div>
        <div>
          <button type="submit">Ingresar</button>
        </div>
        <hr />
      </form>
      <div>
        <label class="checkbox-primary">
          <input type="checkbox" />
          Opcion
        </label>
        <span class="checkmark"></span>
      </div>

      <div>
        <button>No tenes cuenta? Registrate</button>
      </div>
    </div>
  );
}
