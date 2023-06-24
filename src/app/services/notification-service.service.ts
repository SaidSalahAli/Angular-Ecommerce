import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  // Method to show a success notification
  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  // Method to show an error notification
  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  // Method to show an info notification
  showInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }

  // Method to show a warning notification
  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
