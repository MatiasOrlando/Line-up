import * as Yup from "yup";

const validationUserData = {
    validationSchema: Yup.object({
        name: Yup.string().required(),
        password: Yup.string().required(),
        email: Yup.string().required(),
        dni: Yup.number().required(),
        phone: Yup.number().required(),
    }),
};

export default validationUserData;