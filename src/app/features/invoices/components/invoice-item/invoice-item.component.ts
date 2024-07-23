import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceViewModel } from '../../models/invoice.view-model';

@Component({
  selector: 'app-invoice-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './invoice-item.component.html',
  styleUrl: './invoice-item.component.sass',
})
export class InvoiceItemComponent {
  @Input({ required: true }) invoice!: InvoiceViewModel;
}
