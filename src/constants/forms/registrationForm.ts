import * as yup from 'yup';

import {Field, Form} from '~/components/shared/forms/Form/types';

import Route from '../route';

const fields: Field[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First name',
    placeholder: 'Enter your first name',
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    placeholder: 'Enter your last name',
  },
  {
    name: 'agreed',
    type: 'checkbox',
    label: 'I agree to the',
    labelOptions: {
      firstLink: Route.Terms,
      secondLink: Route.Privacy,
      firstLinkText: 'Terms of Service',
      secondLinkText: 'Privacy Policy',
    },
  },
];

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('The First name is required')
    .min(4, 'First name is too short - should be 4 chars minimum.'),
  lastName: yup
    .string()
    .required('The Last name is required')
    .min(3, 'Last name is too short - should be 3 chars minimum.'),
  agreed: yup
    .boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

const registrationForm: Form = {
  fields,
  schema,
};

export default registrationForm;
