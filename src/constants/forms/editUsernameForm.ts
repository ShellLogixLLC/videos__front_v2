import * as yup from 'yup';

import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'username',
    type: 'text',
    label: '',
    placeholder: 'enterYourNewUsername',
  },
];

const schema = yup.object().shape({
  username: yup
    .string()
    .required('theFirstNameIsRequired')
    .min(6, 'firstNameIsTooShort')
    .max(18, 'firstNameIsTooLong')
    .matches(/^(\S+$)/g, 'thisFieldCannotContainBlankspaces'),
});

const editUsernameForm: Form = {
  fields,
  schema,
};

export default editUsernameForm;
