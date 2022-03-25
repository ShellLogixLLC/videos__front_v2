import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .required('The Email is required')
    .email('The Email must be a valid email address'),
  password: yup
    .string()
    .matches(
      /^[^\s]+(\s+[^\s]+)*$/,
      `Password can't start or end with a blank space`,
    )
    .required('The Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
});

const signInForm: Form = {
  fields,
  schema,
};

export default signInForm;
