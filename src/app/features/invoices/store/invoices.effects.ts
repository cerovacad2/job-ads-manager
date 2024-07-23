import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { InvoiceService } from '../services/invoice/invoice.service';
import { invoicesActions } from './invoices.actions';
import { selectInvoices } from './invoices.reducer';

@Injectable()
export class InvoicesEffects {
  private actions$ = inject(Actions);
  private invoiceService = inject(InvoiceService);
  private store = inject(Store);
  private snackbarService = inject(SnackbarService);

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoicesActions.loadInvoices),
      switchMap(() =>
        this.invoiceService.getInvoices().pipe(
          map((invoices) => invoicesActions.loadInvoicesSuccess({ invoices })),
          catchError((error) =>
            of(invoicesActions.loadInvoicesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoicesActions.createInvoice),
      switchMap(({ invoice }) =>
        this.invoiceService.createInvoice(invoice).pipe(
          map((createdInvoice) =>
            invoicesActions.createInvoiceSuccess({ invoice: createdInvoice })
          ),
          catchError((error) =>
            of(invoicesActions.createInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoicesActions.deleteInvoice),
      mergeMap(({ invoiceId }) =>
        this.invoiceService.deleteInvoice({ invoiceId }).pipe(
          map(() => invoicesActions.deleteInvoiceSuccess({ invoiceId })),
          catchError((error) =>
            of(invoicesActions.deleteInvoiceFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteInvoiceByJobId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invoicesActions.deleteInvoiceByJobId),
      withLatestFrom(this.store.select(selectInvoices)),
      mergeMap(([{ jobId }, invoices]) => {
        const invoice = invoices.find((inv) => inv.jobAdId === jobId);
        if (invoice) {
          return of(invoicesActions.deleteInvoice({ invoiceId: invoice.id }));
        } else {
          return of();
        }
      })
    )
  );

  handleErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          invoicesActions.loadInvoicesFailure,
          invoicesActions.createInvoiceFailure,
          invoicesActions.deleteInvoiceFailure,
          invoicesActions.deleteInvoiceByJobIdFailure
        ),
        tap(({ error }) => {
          const errorMessage = error.message || 'Oops, something went wrong';
          this.snackbarService.showError(errorMessage);
        })
      ),
    { dispatch: false }
  );
}
