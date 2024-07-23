import { Invoice } from '../../models/invoice.model';
export class InvoiceViewModel {
  id: string;
  jobAdId: string;
  amount: number;
  dueDate: Date;
  amountFormatted: string;
  dueDateFormatted: string;

  constructor(private invoice: Invoice) {
    this.id = this.invoice.id;
    this.jobAdId = this.invoice.jobAdId;
    this.amount = this.invoice.amount;
    this.amountFormatted = this.getFormattedAmount();
    this.dueDate = new Date(this.invoice.dueDate);
    this.dueDateFormatted = this.getFormattedDueDate();
  }

  getFormattedAmount(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.amount);
  }

  getFormattedDueDate(): string {
    return this.dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
