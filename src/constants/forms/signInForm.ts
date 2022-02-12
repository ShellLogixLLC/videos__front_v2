import * as yup from 'yup';

import {EyeShowIcon, EyeHideIcon} from '~/assets';
// import {Field, Form} from '~/components/shared/forms/Form/types';
import {Field, Form} from '~/types';

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
    .required('The Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
});

const signInForm: Form = {
  fields,
  schema,
};

export default signInForm;
