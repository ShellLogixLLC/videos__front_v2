import * as yup from 'yup';

import {Route} from '~/constants';
import {Field, Form} from '~/types';
import {EyeShowIcon, EyeHideIcon} from '~/assets';

const fields: Field[] = [
  {
    name: 'username',
    type: 'text',
    label: 'userName',
    placeholder: 'enterYourUsername',
  },

  {
    name: 'email',
    type: 'email',
    label: 'email',
    placeholder: 'enterYourEmailAddress',
  },

  {
    name: 'create_password',
    type: 'password',
    label: 'createPassword',
    placeholder: 'enterYourPassword',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },

  {
    name: 'confirm_password',
    type: 'password',
    label: 'confirmPassword',
    placeholder: 'enterTheSamePassword',
    RightIcon: EyeHideIcon,
    RightToggledIcon: EyeShowIcon,
  },
  {
    name: 'verification',
    type: 'verification',
    label: 'Verification account',
    defaultValue: true,
  },
  {
    name: 'agreed',
    type: 'checkbox',
    label: 'agreeToThe',
    labelOptions: {
      firstLink: Route.Terms,
      secondLink: Route.Privacy,
      firstLinkText: 'termsOfService',
      secondLinkText: 'privacyPolicy',
    },
  },
];

const schema = yup.object().shape({
  username: yup
    .string()
    .required('theFirstNameIsRequired')
    .min(6, 'firstNameIsTooShort'),
  email: yup
    .string()
    .required('theEmailIsRequired')
    .email('theEmailMustBeAValidEmailAddress'),
  create_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .required('theLastNameIsRequired')
    .min(6, 'passwordIsTooShortShouldBe6CharsMinimum'),
  confirm_password: yup
    .string()
    .matches(/^[^\s]+(\s+[^\s]+)*$/, `passwordCantStartOrEndWwithABlankSpace`)
    .oneOf(
      [yup.ref('create_password'), null],
      'passwordIsTooShortOrDoesNotMatch',
    ),
  verification: yup.boolean().oneOf([true, false]),
  agreed: yup.boolean().oneOf([true], 'termsAndConditionsMustBeAccepted'),
});

const registrationForm: Form = {
  fields,
  schema,
};

export default registrationForm;
