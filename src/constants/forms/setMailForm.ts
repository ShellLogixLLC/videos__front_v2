import * as yup from 'yup';

import {Field, Form} from '~/types';

const fields: Field[] = [
  {
    name: 'email',
    type: 'text',
    label: 'email',
    placeholder: 'enterYourEmail',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('theEmailMustBeAValidEmailAddress').required(),
});

const setEmailForm: Form = {
  fields,
  schema,
};

export default setEmailForm;
