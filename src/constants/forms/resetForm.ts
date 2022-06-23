import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
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
  new_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(5, 'newPassword'),
  allow_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(5, 'Password is too short - should be 8 chars minimum.'),
});

const resetForm: Form = {
  fields,
  schema,
};

export default resetForm;
