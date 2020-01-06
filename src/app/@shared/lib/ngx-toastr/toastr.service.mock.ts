import { Injectable } from '@angular/core';

@Injectable()
export class ToasterServiceMock {

  constructor() {}

  showDefault(message: string, title: string): any {
    return { id: '1' };
  }

  showSuccess(message: string, title: string): any {
    return { id: '1' };
  }

  showError(message: string, title: string): any {
    return { id: '1' };
  }

  showWarning(message: string, title: string): any {
    return { id: '1' };
  }

  showInfo(message: string, title: string): any {
    return { id: '1' };
  }

  showSaving(): any {
    return { id: '1' };
  }

  showSaved(): any {
    return { id: '1' };
  }

  showGenericError(): any {
    return { id: '1' };
  }

  showUnauthorizedError(): any {
    return { id: '1' };
  }

  showNoConnectionError(): any {
    return { id: '1' };
  }

  clear(toast: any) {}

  clearById(toastId: any) {}

  chooseToast(error: IError): any {
    return { id: 1 };
  }

}

interface IError {
  status: number;
  message: string;
  name: string;
}
