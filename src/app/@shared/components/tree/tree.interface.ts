import {Subject} from 'rxjs';

export interface TreeNode {
	name: string;
	children?: TreeNode[];
	clickEmitter$?: Subject<void>;
}
