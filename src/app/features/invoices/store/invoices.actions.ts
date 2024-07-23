import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Invoice } from '../models/invoice.model';

export const invoicesActions = createActionGroup({
  source: 'invoices',
  events: {
    'Load Invoices': emptyProps(),
    'Load Invoices Success': props<{ invoices: Invoice[] }>(),
    'Load Invoices Failure': props<{ error: any }>(),
    'Create Invoice': props<{ invoice: Partial<Invoice> }>(),
    'Create Invoice Success': props<{ invoice: Invoice }>(),
    'Create Invoice Failure': props<{ error: any }>(),
    'Delete Invoice': props<{ invoiceId: string }>(),
    'Delete Invoice Success': props<{ invoiceId: string }>(),
    'Delete Invoice Failure': props<{ error: any }>(),
    'Delete Invoice By Job Id': props<{ jobId: string }>(),
    'Delete Invoice By Job Id Failure': props<{ error: string }>(),
  },
});
