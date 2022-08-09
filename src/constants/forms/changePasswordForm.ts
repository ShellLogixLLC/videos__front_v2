import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'new_password',
    label: 'enterNewPassword',
    type: 'password',
    placeholder: 'enterNewPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'allow_password',
    label: 'confirmPassword',
    type: 'password',
    placeholder: 'confirmPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'allow_password',
    label: 'confirmPassword',
    type: 'password',
    placeholder: 'confirmPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
];

const schema = yup.object().shape({
  new_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'newPassword'),
  allow_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
});

const changePasswordForm: Form = {
  fields,
  schema,
};

export default changePasswordForm;
