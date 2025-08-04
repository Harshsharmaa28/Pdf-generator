import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,}$/, "Phone must be at least 10 digits")
    .required("Phone is required"),
  position: yup.string(),
  description: yup.string(),
});
