import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {TreeNode} from '../../../@shared/components/tree/tree.interface';

@Component({
	selector: 'app-layout-sidenav',
	templateUrl: './layout-sidenav.component.html',
	styleUrls: ['./layout-sidenav.component.scss']
})
export class LayoutSidenavComponent implements OnInit {

	entityTreeData: TreeNode[] = [
		{
			name: 'One',
			children: [
				{
					name: 'Two',
					clickEmitter$: new Subject<void>()
				},
				{
					name: 'Three',
					clickEmitter$: new Subject<void>()
				}
			]
		},
		{
			name: 'Four',
			clickEmitter$: new Subject<void>()
		}
	];

	constructor() {}

	ngOnInit() {

		this.entityTreeData[0].children[0].clickEmitter$
			.subscribe(() => console.log('Two clicked'));

		this.entityTreeData[0].children[1].clickEmitter$
			.subscribe(() => console.log('Three clicked'));

		this.entityTreeData[1].clickEmitter$
			.subscribe(() => console.log('Four clicked'));

	}

}
