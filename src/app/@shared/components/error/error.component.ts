import {Component, Input, OnInit} from '@angular/core';

import {ErrorCode} from '../../enums/errors';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

	@Input() errorCode: ErrorCode;
	@Input() errorSig: string;

	private errorMessages = {
		unauthorized: 'USUARIO NO AUTORIZADO',
		forbidden: 'OPERACION PROHIBIDA',
		internal_server_error: 'ERROR INTERNO DE SERVIDOR'
	};

	constructor() {}

	ngOnInit() {}

	get errorIsUnauthorized(): boolean {
		if (this.errorCode === ErrorCode.UNAUTHORIZED)
			return true;
		return false;
	}

	get errorIsForbidden(): boolean {
		if (this.errorCode === ErrorCode.FORBIDDEN)
			return true;
		return false;
	}

	get errorIsInternalServerError(): boolean {
		if (this.errorCode === ErrorCode.INTERNAL_SERVER_ERROR)
			return true;
		return false;
	}

	get errorMessage(): string {
		if (this.errorCode)
			return this.errorMessages[this.errorCode] || '';
	}

}
