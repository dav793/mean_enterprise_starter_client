import {IUserGroup} from '../user-group/user-group.model';
import {IRole} from '../role/role.model';

export interface IUser {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    secondLastName: string;
    email: string;
    roleIds: string[];
    updatePassword: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUserWithExtras extends IUser {
    _groups: IUserGroup[];
    _roles: IRole[];
}

export class User {

    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    secondLastName: string;
    email: string;
    roleIds: string[];
    updatePassword: boolean;
    deleted: boolean;
    createdAt: Date|null;
    updatedAt: Date|null;

    constructor(private __data: IUser) {
        this._id = __data._id || '';
        this.username = __data.username || '';
        this.firstName = __data.firstName || '';
        this.lastName = __data.lastName || '';
        this.secondLastName = __data.secondLastName || '';
        this.email = __data.email || '';
        this.roleIds = __data.roleIds || [];
        this.updatePassword = __data.updatePassword || false;
        this.deleted = __data.deleted || false;
        this.createdAt = new Date(__data.createdAt) || null;
        this.updatedAt = new Date(__data.updatedAt) || null;
    }

    get fullName() {
        let name = this.firstName + ' ' + this.lastName;
        if (this.secondLastName)
            name += ' ' + this.secondLastName;
        return name;
    }

    asInterface(): IUser {
        return this.__data;
    }

}
