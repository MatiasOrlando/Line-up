import * as Yup from "yup";

const validationUserData = {
    validationSchema: Yup.object({
        password: Yup.string().required(),
        }),
};

export default validationUserData;