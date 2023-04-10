import * as Yup from "yup";

const validationNewBranch = {
  validationSchema: Yup.object({
    name: Yup.string().required(),
    location: Yup.string().required(),
    closingHour: Yup.string().required(),
    openingHour: Yup.string().required(),
    allowedClients: Yup.number().required(),
  }),
};

export default validationNewBranch;
