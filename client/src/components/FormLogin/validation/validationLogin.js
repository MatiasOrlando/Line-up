import * as Yup from "yup";

const validationLogin = {
  validationSchema: Yup.object({
    user: Yup.string().required(),
    pass: Yup.string().required(),
  }),
};

export default validationLogin;
