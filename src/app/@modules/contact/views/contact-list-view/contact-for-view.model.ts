import { IContact } from '../../../../@core/contact/contact.model';
export interface IContactForView extends IContact{
    _label_fullName: string;
    _label_alias: string;
    _label_date: string;
    _label_type: string;
}
