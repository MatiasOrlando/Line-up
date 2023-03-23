import * as Yup from "yup";

const validationLogin = {
    validationSchema: Yup.object({
        user: Yup.string().required("Es requerido"),
        pass: Yup.string().required("Password required"),
    }),
};

export default validationLogin;