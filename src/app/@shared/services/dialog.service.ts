import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { YesNoDialogComponent, YesNoDialogData } from '../components/dialogs/yes-no-dialog/yes-no-dialog.component';
import { LoginDialogComponent, LoginDialogData } from '../components/dialogs/login-dialog/login-dialog.component';

@Injectable()
export class DialogService {

	constructor(private dialog: MatDialog) {}

	openYesNoDialog(options: YesNoDialogData): Observable<true|false|undefined> {
		return new Observable(subscriber => {
			setTimeout(() => {  // this is needed to avoid errors by ensuring this doesn't happen during a change detection cycle

				const dialogRef = this.dialog.open(YesNoDialogComponent, {
					width: '250px',
					data: options
				});

				dialogRef.afterClosed().subscribe(result => {
					subscriber.next(result);
					subscriber.complete();
				});

			});
		});
	}

	openLoginDialog(options: LoginDialogData): Observable<{ password: string }> {
		return new Observable(subscriber => {
			setTimeout(() => {  // this is needed to avoid errors by ensuring this doesn't happen during a change detection cycle

				const dialogRef = this.dialog.open(LoginDialogComponent, {
					width: '420px',
					data: options
				});

				dialogRef.afterClosed().subscribe(result => {
					subscriber.next(
						result && ('password' in result) ? result : {password: ''}
					);
					subscriber.complete();
				});

			});
		});
	}

}
