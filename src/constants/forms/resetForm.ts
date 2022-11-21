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
];

const schema = yup.object().shape({
  new_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum'),
  allow_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWithABlankSpace`)
    .required('thePasswordIsRequired')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum')
    .oneOf([yup.ref('new_password'), null], 'passwordIsTooShortOrDoesNotMatch'),
});

const resetForm: Form = {
  fields,
  schema,
};

export default resetForm;
