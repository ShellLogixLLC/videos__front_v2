import * as yup from 'yup';

import {Route} from '~/constants';
import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
  },

  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
  },

  {
    name: 'create_password',
    type: 'password',
    label: 'Create password',
    placeholder: 'Enter password',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },

  {
    name: 'confirm_password',
    type: 'password',
    label: 'Confirm password',
    placeholder: 'Enter the same password',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },
  {
    name: 'verification',
    type: 'verification',
    label: 'Verification account',
    defaultValue: true,
  },
  {
    name: 'agreed',
    type: 'checkbox',
    label: 'I agree to the  ',
    labelOptions: {
      firstLink: Route.Terms,
      secondLink: Route.Privacy,
      firstLinkText: 'Terms of Service  ',
      secondLinkText: ' Privacy Policy',
    },
  },
];

const schema = yup.object().shape({
  username: yup
    .string()
    .required('The First name is required')
    .min(4, 'First name is too short - should be 4 chars minimum.'),
  email: yup
    .string()
    .required('The Email is required')
    .email('The Email must be a valid email address'),
  create_password: yup
    .string()
    .required('The Last name is required')
    .min(3, 'Last name is too short - should be 3 chars minimum.'),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref('create_password'), null],
      'Password is too short or does not match the previous one',
    ),
  verification: yup.boolean().oneOf([true, false]),
  agreed: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

const registrationForm: Form = {
  fields,
  schema,
};

export default registrationForm;
