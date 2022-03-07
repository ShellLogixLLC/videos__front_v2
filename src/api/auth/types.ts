import {ICommonRequestReturn, MutateData} from '~/types';

export interface IUseUsersReturn extends ICommonRequestReturn {
  //todo remove any before get data
  categories: any;
  mutateUsers: MutateData;
}
