import {UserGroup, IUserGroup} from '../user-group/user-group.model';
import {IUser} from '../user/user.model';

import Utils from '../../@shared/helpers/utils/utils';

export interface IRole {
    _id: string;
    name: string;
    resources: IResourcePermissions[];
    createdAt: string;
    updatedAt: string;
}

export interface IResourcePermissions {
    name: string;
    permissions: IPermission[];
}

export interface IPermission {
    action: string;
    level: number;
}

export class Role {

    _id: string;
    name: string;
    resources: IResourcePermissions[];
    createdAt: Date|null;
    updatedAt: Date|null;

    constructor(private __data: IRole) {
        this._id = __data._id || '';
        this.name = __data.name || '';
        this.resources = __data.resources || [];
        this.createdAt = new Date(__data.createdAt) || null;
        this.updatedAt = new Date(__data.updatedAt) || null;
    }

    /**
     * filter a list of roles <allRoles>, include only the ones associated with <group>
     */
    static FilterByUserGroup( group: IUserGroup, allRoles: IRole[] ): IRole[] {
        if (!allRoles || allRoles.length === 0)
            return [];
        return group.roleIds
            .map(rid => allRoles.find(r => r._id === rid))
            .filter(rid => rid);
    }

    /**
     * filter a list of roles <allRoles>, include only the ones directly associated with <user>
     */
    static FilterByUser( user: IUser, allRoles: IRole[] ): IRole[] {
        if (!allRoles || allRoles.length === 0)
            return [];
        return user.roleIds
            .map(rid => allRoles.find(r => r._id === rid))
            .filter(rid => rid);
    }

    /**
     * filter a list of roles <allRoles>, include only the ones directly or indirectly associated with <user>
     * that is, the roles associated with the user + the roles associated with each of the user's groups
     */
    static FilterByUserWithGroups( user: IUser, allRoles: IRole[], allGroups: IUserGroup[] ): IRole[] {
        let result = Role.FilterByUser(user, allRoles);

        const groups = UserGroup.FilterByUser(user, allGroups);
        groups
          .map(group => Role.FilterByUserGroup(group, allRoles))
          .forEach((roles: IRole[]) => result = result.concat(roles));

        return Utils.filterDuplicates(result, '_id');
    }

    asInterface(): IRole {
        return this.__data;
    }

}
