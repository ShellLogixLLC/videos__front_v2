import {IRegistrationStep} from './types';

const registrationSteps: IRegistrationStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    metaDescription: 'Personal Information meta description',
    containerComponent: 'RegistrationPersonalInformationContainer',
  },
  {
    id: 2,
    title: 'Contact Information',
    metaDescription: 'Contact Information meta description',
    containerComponent: 'RegistrationContactInformationContainer',
  },
  {
    id: 3,
    title: 'Password Setup',
    metaDescription: 'Password Setup meta description',
    containerComponent: 'RegistrationSetupPasswordContainer',
  },
];

export default registrationSteps;
