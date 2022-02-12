import {ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  categories: any;
  mutateUsers: MutateData;
}
