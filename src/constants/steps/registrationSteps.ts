import {IRegistrationStep} from './types';

const registrationSteps: IRegistrationStep[] = [
  {
    id: 1,
    title: 'Contact Information',
    metaDescription: 'Contact Information meta description',
    containerComponent: 'Registration',
  },
  {
    id: 2,
    title: 'Password Setup',
    metaDescription: 'Password Setup meta description',
    containerComponent: 'VerifyPage',
  },
  {
    id: 3,
    title: 'Password Setup',
    metaDescription: 'Password Setup meta description',
    containerComponent: 'ResetPassword',
  },
  {
    id: 4,
    title: 'Password Setup',
    metaDescription: 'Password Setup meta description',
    containerComponent: 'ForgotPassword',
  },
];

export default registrationSteps;
