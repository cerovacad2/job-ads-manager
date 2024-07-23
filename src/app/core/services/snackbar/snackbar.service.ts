import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  showError(
    message: string,
    action: string = 'Close',
    duration: number = 1500
  ) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['error-snackbar'],
    });
  }
}
