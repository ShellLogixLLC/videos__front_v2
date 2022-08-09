import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'currentPassword',
    label: 'enterOldPassword',
    type: 'password',
    placeholder: 'enterOldPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'newPassword',
    label: 'enterNewPassword',
    type: 'password',
    placeholder: 'enterNewPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
  {
    name: 'passwordConfirmation',
    label: 'confirmPassword',
    type: 'password',
    placeholder: 'confirmPassword',
    RightIcon: EyeShowIcon,
    RightToggledIcon: EyeHideIcon,
  },
];

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  newPassword: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  passwordConfirmation: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .oneOf([yup.ref('newPassword'), null], 'passwordIsTooShortOrDoesNotMatch')
    .required('thePasswordIsRequired')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
});

const changePasswordForm: Form = {
  fields,
  schema,
};

export default changePasswordForm;
