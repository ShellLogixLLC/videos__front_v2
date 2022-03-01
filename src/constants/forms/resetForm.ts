import * as yup from 'yup';

import {EyeShowIcon, EyeHideIcon} from '~/assets';
import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'password',
    label: 'Enter old password',
    type: 'password',
    placeholder: 'Enter old password',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'new_password',
    label: 'Enter new password',
    type: 'password',
    placeholder: 'Enter new password',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'allow_password',
    label: 'Confirm password',
    type: 'password',
    placeholder: 'Confirm new password',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
];

const schema = yup.object().shape({
  // Unfinished VALIDATION
  password: yup
    .string()
    .required('The Password is required')
    .min(5, 'Write the current password.'),
  new_password: yup
    .string()
    .required('The Password is required')
    .min(5, 'New password.'),
  allow_password: yup
    .string()
    .required('The Password is required')
    .min(5, 'Password is too short - should be 8 chars minimum.'),
});

const resetForm: Form = {
  fields,
  schema,
};

export default resetForm;
