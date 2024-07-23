import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';

import { invoicesActions } from '../../store/invoices.actions';
import {
  selectInvoices,
  selectInvoicesLoading,
} from '../../store/invoices.reducer';
import { InvoiceItemComponent } from '../invoice-item/invoice-item.component';

@Component({
  selector: 'app-invoices-container',
  standalone: true,
  imports: [AsyncPipe, ProgressBarComponent, InvoiceItemComponent],
  templateUrl: './invoices-container.component.html',
  styleUrl: './invoices-container.component.sass',
})
export class InvoicesContainerComponent implements OnInit {
  private store = inject(Store);

  readonly vm$ = combineLatest({
    invoices: this.store.select(selectInvoices),
    invoicesLoading: this.store.select(selectInvoicesLoading),
  });

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.store.dispatch(invoicesActions.loadInvoices());
  }
}
