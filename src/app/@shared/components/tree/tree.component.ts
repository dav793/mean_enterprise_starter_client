import {Component, OnInit, OnChanges, Input, Output, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

import { TreeNode } from './tree.interface';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnChanges {

	@Input() treeData: TreeNode[];

	treeControl = new NestedTreeControl<TreeNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<TreeNode>();

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {

		if (changes.treeData)
			this.dataSource.data = this.treeData;

	}

	hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

	onNodeClick(node: TreeNode) {
		if (node.clickEmitter$)
			node.clickEmitter$.next();
	}

}
