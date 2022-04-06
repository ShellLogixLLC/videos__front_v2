import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
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
  username: yup
    .string()
    .required('The First name is required')
    .min(4, 'First name is too short - should be 4 chars minimum.'),
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
