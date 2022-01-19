import {RegistrationContainers} from 'pages/registration/[step]';

export interface IRegistrationStep {
  id: number;
  title: string;
  metaDescription: string;
  containerComponent: keyof typeof RegistrationContainers;
}
