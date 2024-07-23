import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  generateRandomId,
  getLastDayOfNextMonth,
} from '../../../../shared/utils/utils';
import { Invoice } from '../../models/invoice.model';
import { environment } from '../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.rootUrl}${environment.ivoicesEndpoint}`;

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  createInvoice(data: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, {
      id: generateRandomId(),
      amount: 200,
      dueDate: getLastDayOfNextMonth().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    });
  }

  deleteInvoice(data: { invoiceId: string }): Observable<string> {
    return this.http
      .delete<Invoice>(`${this.apiUrl}/${data.invoiceId}`)
      .pipe(map((invoice) => invoice.id));
  }
}
