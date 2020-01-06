import { IUserGroup } from '../user-group.model';
import Utils from '../../../@shared/helpers/utils/utils';

export const userGroupsStub = [
  {
    _id: '11',
    label: 'Administrators',
    userIds: [],
    roleIds: [],
    createdAt: '2019-03-04T00:25:39.154Z',
    updatedAt: '2019-03-04T00:25:39.154Z'
  },
  {
    _id: '12',
    label: 'Associates',
    userIds: [],
    roleIds: [],
    createdAt: '2019-03-04T00:25:39.154Z',
    updatedAt: '2019-03-04T00:25:39.154Z'
  }
];

export const userGroupsStubObj: { [key: string]: IUserGroup } = Utils.arrayToObject(userGroupsStub, '_id');
