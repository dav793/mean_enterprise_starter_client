import { IRole } from '../role.model';
import Utils from '../../../@shared/helpers/utils/utils';

export const rolesStub = [
  {
    _id: '21',
    name: '',
    resources: [],
    createdAt: '2019-03-04T00:25:39.154Z',
    updatedAt: '2019-03-04T00:25:39.154Z'
  }
];

export const rolesStubObj: { [key: string]: IRole } = Utils.arrayToObject(rolesStub, '_id');
