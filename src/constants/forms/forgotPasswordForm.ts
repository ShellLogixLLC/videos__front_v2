import * as yup from 'yup';

import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'email',
    type: 'email',
    label: 'email',
    placeholder: 'enterYourEmail',
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .required('theEmailIsRequired')
    .email('theEmailMustBeAValidEmailAddress'),
});

const forgotPasswordForm: Form = {
  fields,
  schema,
};

export default forgotPasswordForm;
