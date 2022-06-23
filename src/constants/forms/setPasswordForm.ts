import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

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
    .required('thePasswordIsRequired')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum'),
  passwordConfirmation: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .oneOf([yup.ref('password'), null], 'passwordsMustMatch'),
});

const setPasswordForm: Form = {
  fields,
  schema,
};

export default setPasswordForm;
