import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // avoid ExpressionChangedAfterItHasBeenCheckedError with 'mat-form-field-hide-placeholder'
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}