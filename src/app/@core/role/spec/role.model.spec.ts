
import {IResourcePermissions, IRole, Role} from '../role.model';
import { IUser } from '../../user/user.model';
import { IUserGroup } from '../../user-group/user-group.model';

describe('Role Model: FilterByUserGroup', () => {

  it('should filter roles correctly when user group has non-existing roles', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const group = {
        _id: '11',
        label: 'Grupo A',
        userIds: [],
        roleIds: ['02', '03', '04'],
        createdAt: null,
        updatedAt: null
    };

    const filteredRoles = Role.FilterByUserGroup(group, roles);

    expect(filteredRoles.length).toEqual(2);
    expect(filteredRoles[0]._id).toEqual('02');
    expect(filteredRoles[1]._id).toEqual('03');

  });

  it('should filter roles correctly when user group has no roles', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const group = {
      _id: '11',
      label: 'Grupo A',
      userIds: [],
      roleIds: [],
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserGroup(group, roles);

    expect(filteredRoles.length).toEqual(0);

  });

  it('should filter roles correctly when user group has non-existing roles only', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const group = {
      _id: '11',
      label: 'Grupo A',
      userIds: [],
      roleIds: ['02', '03'],
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserGroup(group, roles);

    expect(filteredRoles.length).toEqual(0);

  });

  beforeEach(() => {});

});

describe('Role Model: FilterByUser', () => {

  it('should filter roles correctly when user has non-existing roles', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: ['02', '03', '04'],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUser(user, roles);

    expect(filteredRoles.length).toEqual(2);
    expect(filteredRoles[0]._id).toEqual('02');
    expect(filteredRoles[1]._id).toEqual('03');

  });

  it('should filter roles correctly when user has no roles', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: [],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUser(user, roles);

    expect(filteredRoles.length).toEqual(0);

  });

  it('should filter roles correctly when user has non-existing roles only', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '11',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: ['02', '03'],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUser(user, roles);

    expect(filteredRoles.length).toEqual(0);

  });

  beforeEach(() => {});

});

describe('Role Model: FilterByUserWithGroups', () => {

  it('should filter roles correctly when user has both direct roles and user group roles', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '04',
        name: 'Role D',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '05',
        name: 'Role E',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const groups = [
      {
        _id: '11',
        label: 'Grupo A',
        userIds: ['21'],
        roleIds: ['02', '03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '12',
        label: 'Grupo B',
        userIds: ['21'],
        roleIds: ['03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '13',
        label: 'Grupo C',
        userIds: ['21'],
        roleIds: ['04'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '14',
        label: 'Grupo D',
        userIds: [],
        roleIds: ['05'],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: ['01'],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserWithGroups(user, roles, groups);

    expect(filteredRoles.length).toEqual(4);
    expect(filteredRoles[0]._id).toEqual('01');
    expect(filteredRoles[1]._id).toEqual('02');
    expect(filteredRoles[2]._id).toEqual('03');
    expect(filteredRoles[3]._id).toEqual('04');

  });

  it('should filter roles correctly when user has user group roles only', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '04',
        name: 'Role D',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '05',
        name: 'Role E',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const groups = [
      {
        _id: '11',
        label: 'Grupo A',
        userIds: ['21'],
        roleIds: ['02', '03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '12',
        label: 'Grupo B',
        userIds: ['21'],
        roleIds: ['03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '13',
        label: 'Grupo C',
        userIds: ['21'],
        roleIds: ['03', '04'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '14',
        label: 'Grupo D',
        userIds: [],
        roleIds: ['05'],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: [],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserWithGroups(user, roles, groups);

    expect(filteredRoles.length).toEqual(3);
    expect(filteredRoles[0]._id).toEqual('02');
    expect(filteredRoles[1]._id).toEqual('03');
    expect(filteredRoles[2]._id).toEqual('04');

  });

  it('should filter roles correctly when user has direct roles only', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '04',
        name: 'Role D',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '05',
        name: 'Role E',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const groups = [
      {
        _id: '11',
        label: 'Grupo A',
        userIds: [],
        roleIds: ['03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '12',
        label: 'Grupo B',
        userIds: [],
        roleIds: ['03', '04'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '13',
        label: 'Grupo C',
        userIds: [],
        roleIds: ['04', '05'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '14',
        label: 'Grupo D',
        userIds: [],
        roleIds: ['05'],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: ['01', '02'],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserWithGroups(user, roles, groups);

    expect(filteredRoles.length).toEqual(2);
    expect(filteredRoles[0]._id).toEqual('01');
    expect(filteredRoles[1]._id).toEqual('02');

  });

  it('should filter roles correctly when user has no roles at all', () => {

    const roles = [
      {
        _id: '01',
        name: 'Role A',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '02',
        name: 'Role B',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '03',
        name: 'Role C',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '04',
        name: 'Role D',
        resources: [],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '05',
        name: 'Role E',
        resources: [],
        createdAt: null,
        updatedAt: null
      }
    ];

    const groups = [
      {
        _id: '11',
        label: 'Grupo A',
        userIds: [],
        roleIds: ['03'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '12',
        label: 'Grupo B',
        userIds: [],
        roleIds: ['03', '04'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '13',
        label: 'Grupo C',
        userIds: [],
        roleIds: ['04', '05'],
        createdAt: null,
        updatedAt: null
      },
      {
        _id: '14',
        label: 'Grupo D',
        userIds: [],
        roleIds: ['05'],
        createdAt: null,
        updatedAt: null
      }
    ];

    const user = {
      _id: '21',
      username: '',
      firstName: '',
      lastName: '',
      secondLastName: '',
      email: '',
      roleIds: [],
      updatePassword: false,
      deleted: false,
      createdAt: null,
      updatedAt: null
    };

    const filteredRoles = Role.FilterByUserWithGroups(user, roles, groups);

    expect(filteredRoles.length).toEqual(0);

  });

  beforeEach(() => {});

});
