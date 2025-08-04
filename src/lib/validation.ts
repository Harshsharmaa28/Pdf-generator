import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,}$/, 'Phone must be at least 10 digits')
    .required('Phone is required'),
  position: yup.string().required('Position is required'),
  description: yup.string().required('Description is required'),
});

export type FormData = yup.InferType<typeof formSchema>;
