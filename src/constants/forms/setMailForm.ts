import * as yup from 'yup';

import {Field, Form} from '~/components/shared/forms/Form/types';

const fields: Field[] = [
  {
    name: 'email',
    type: 'text',
    label: 'Email Address',
    placeholder: '',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required(),
});

const setEmailForm: Form = {
  fields,
  schema,
};

export default setEmailForm;
