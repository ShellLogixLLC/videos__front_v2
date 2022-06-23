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
    .required('theFirstNameIsRequired')
    .min(4, 'firstNameIsTooShort'),
  password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('The Password is required')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum'),
});

const signInForm: Form = {
  fields,
  schema,
};

export default signInForm;
