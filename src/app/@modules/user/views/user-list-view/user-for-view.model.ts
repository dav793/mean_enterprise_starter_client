import {IUserWithExtras} from '../../../../@core/user/user.model';

export interface IUserForView extends IUserWithExtras {
  _label_fullName: string;
  _label_groupNames: string;
  _label_roleNames: string;
}
