import * as yup from 'yup';

import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'username',
    label: 'userName',
    type: 'text',
    placeholder: 'enterYourUsername',
  },
  {
    name: 'password',
    label: 'passWord',
    type: 'password',
    placeholder: 'enterYourPassword',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },
];

const schema = yup.object().shape({
  username: yup
    .string()
    .required('theUserNameIsRequired')
    .min(6, 'firstNameIsTooShort'),
  password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWithABlankSpace`)
    .required('The Password is required')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum'),
});

const signInForm: Form = {
  fields,
  schema,
};

export default signInForm;
