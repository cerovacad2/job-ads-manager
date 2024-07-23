import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { InvoiceViewModel } from '../models/invoice.view-model';
import { invoicesActions } from './invoices.actions';
import { Invoice } from '../models/invoice.model';

export interface InvoiceState {
  invoicesLoading: boolean;
  invoiceCreating: boolean;
  invoiceDeleting: boolean;
  invoices: Invoice[];
  error: any;
}

export const initialState: InvoiceState = {
  invoicesLoading: false,
  invoiceCreating: false,
  invoiceDeleting: false,
  invoices: [],
  error: null,
};

export const invoicesFeature = createFeature({
  name: 'invoices',
  reducer: createReducer(
    initialState,
    on(invoicesActions.loadInvoices, (state) => ({
      ...state,
      invoicesLoading: true,
      error: null,
    })),
    on(invoicesActions.loadInvoicesSuccess, (state, { invoices }) => ({
      ...state,
      invoices,
      invoicesLoading: false,
    })),
    on(invoicesActions.loadInvoicesFailure, (state, { error }) => ({
      ...state,
      error,
      invoicesLoading: false,
    })),
    on(invoicesActions.createInvoice, (state) => ({
      ...state,
      invoiceCreating: true,
      error: null,
    })),
    on(invoicesActions.createInvoiceSuccess, (state, { invoice }) => ({
      ...state,
      invoices: [...state.invoices, invoice],
      invoiceCreating: false,
    })),
    on(invoicesActions.createInvoiceFailure, (state, { error }) => ({
      ...state,
      error,
      invoiceCreating: false,
    })),
    on(invoicesActions.deleteInvoice, (state) => ({
      ...state,
      invoiceDeleting: true,
      error: null,
    })),
    on(invoicesActions.deleteInvoiceSuccess, (state, { invoiceId }) => ({
      ...state,
      invoices: state.invoices.filter((i) => i.id !== invoiceId),
      invoiceDeleting: false,
    })),
    on(invoicesActions.deleteInvoiceFailure, (state, { error }) => ({
      ...state,
      error,
      invoiceDeleting: false,
    }))
  ),
});

export const {
  name: invoicesFeatureKey,
  reducer: invoicesReducer,
  selectInvoices,
  selectInvoicesLoading,
  selectInvoiceCreating,
  selectInvoiceDeleting,
  selectError,
} = invoicesFeature;

export const selectInvoiceViewModels = createSelector(
  selectInvoices,
  (invoices: Invoice[]): InvoiceViewModel[] => invoices.map(invoice => new InvoiceViewModel(invoice))
);