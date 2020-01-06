import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToasterService {

    private defaultTimeout = 3000;

    constructor(private toastr: ToastrService) {}

    showDefault(message: string, title: string): any {
        return this.toastr.show(message, title, {
            toastClass: 'ngx-toastr ngx-custom-default',
            timeOut: this.defaultTimeout
        });
    }

    showSuccess(message: string, title: string): any {
        return this.toastr.success(message, title, {
            timeOut: this.defaultTimeout
        });
    }

    showError(message: string, title: string): any {
        return this.toastr.error(message, title, {
            timeOut: this.defaultTimeout
        });
    }

    showWarning(message: string, title: string): any {
        return this.toastr.warning(message, title, {
            timeOut: this.defaultTimeout
        });
    }

    showInfo(message: string, title: string): any {
        return this.toastr.info(message, title, {
           timeOut: this.defaultTimeout
        });
    }

    showSaving(): any {
        return this.showDefault('Por favor espere...', 'Guardando');
    }

    showSaved(): any {
      return this.showSuccess('', 'Guardado!');
    }

    showGenericError(): any {
        return this.showError('Algo salió mal...', 'Oh no!');
    }

    showUnauthorizedError(): any {
        return this.showError('', 'Usuario no autorizado');
    }

    showNoConnectionError(): any {
      return this.showError('Verifique su conexión a Internet y Cortafuegos', 'No se puede establecer conexión');
    }

    clear(toast: any) {
        this.toastr.clear(toast.toastId);
    }

    clearById(toastId: any) {
        this.toastr.clear(toastId);
    }

    chooseToast(error: IError): any {
      let toastFn = () => {};

      switch (error.status) {
        case 401:
          toastFn = this.showUnauthorizedError.bind(this);
          break;
        case 500:
          toastFn = this.showGenericError.bind(this);
          break;
        case 0:
          toastFn = this.showNoConnectionError.bind(this);
          break;
        default:
          toastFn = (() => {
            this.showError(error.message, error.name);
          }).bind(this);
          break;
      }

      return toastFn();
    }

}

interface IError {
  status: number;
  message: string;
  name: string;
}
