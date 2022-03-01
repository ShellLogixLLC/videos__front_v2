import * as yup from 'yup';

import {EyeShowIcon, EyeHideIcon} from '~/assets';
import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'password',
    type: 'password',
    label: 'Create password',
    placeholder: '',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Repeat password',
    placeholder: '',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
];

const schema = yup.object().shape({
  password: yup
    .string()
    .required('The Password is required')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const setPasswordForm: Form = {
  fields,
  schema,
};

export default setPasswordForm;
