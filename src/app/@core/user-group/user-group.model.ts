
import {User, IUser} from '../user/user.model';

export interface IUserGroup {
  _id: string;
  label: string;
  userIds: string[];
  roleIds: string[];
  createdAt: string;
  updatedAt: string;
}

export class UserGroup {

  _id: string;
  label: string;
  userIds: string[];
  roleIds: string[];
  createdAt: Date|null;
  updatedAt: Date|null;

  constructor(private __data: IUserGroup) {
    this._id = __data._id || '';
    this.label = __data.label || '';
    this.userIds = __data.userIds || [];
    this.roleIds = __data.roleIds || [];
    this.createdAt = new Date(__data.createdAt) || null;
    this.updatedAt = new Date(__data.updatedAt) || null;
  }

  /**
   * filter a list of user groups <allGroups>, include only the groups associated with <user>
   */
  static FilterByUser(user: IUser, allGroups: IUserGroup[]): IUserGroup[] {
    return allGroups.filter(g => g.userIds.indexOf(user._id) > -1);
  }

  asInterface(): IUserGroup {
      return this.__data;
  }

}
