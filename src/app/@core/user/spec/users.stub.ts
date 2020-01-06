import { IUser } from '../user.model';
import Utils from '../../../@shared/helpers/utils/utils';

export const usersStub = [
  {
    _id: '01',
    username: 'sharvey',
    firstName: 'Steve',
    lastName: 'Harvey',
    secondLastName: '',
    email: 'sharvey@test.com',
    roleIds: [],
    updatePassword: false,
    deleted: false,
    createdAt: '2019-03-04T00:25:39.154Z',
    updatedAt: '2019-03-04T00:25:39.154Z'
  },
  {
    _id: '02',
    username: 'winnie_r',
    firstName: 'Wynona',
    lastName: 'Ryder',
    secondLastName: '',
    email: 'wryder@test.com',
    roleIds: [],
    updatePassword: false,
    deleted: false,
    createdAt: '2019-03-04T00:25:39.154Z',
    updatedAt: '2019-03-04T00:25:39.154Z'
  }
];

export const usersStubObj: { [key: string]: IUser } = Utils.arrayToObject(usersStub, '_id');
