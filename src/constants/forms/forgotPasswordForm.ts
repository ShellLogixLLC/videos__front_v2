import * as yup from 'yup';

import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .required('The Email is required')
    .email('The Email must be a valid email address'),
});

const forgotPasswordForm: Form = {
  fields,
  schema,
};

export default forgotPasswordForm;
