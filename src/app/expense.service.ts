import uuidV4 from 'uuid/v4';
import { Expense } from './expense.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()
export class ExpenseService {

  url: string = 'http://localhost:9999/expenses/';
  categories = ['Food', 'Travel', 'Other'];

  constructor(private http: Http, private authService: AuthService) { }

  addExpense(expense: Expense): Promise<void> {
    expense.id = uuidV4();
    this.http.post(this.url, expense, this.requestOption(true))
      .toPromise()
    return;
  }

  getExpense(expenseId: string): Promise<Expense> {
    return this.http.get(`${this.url}${expenseId}`, this.requestOption())
      .toPromise()
      .then(res => res.json());
  }

  getExpenses(): Promise<Expense[]> {
    return this.http.get(this.url, this.requestOption())
      .toPromise()
      .then(response => response.json());
  }

  removeExpense(expenseId: string): Promise<void> {
    this.http.delete(`${this.url}${expenseId}`, this.requestOption())
      .toPromise()
    return;
  }

  updateExpense(expense: Expense): Promise<void> {
    this.http.put(`${this.url}${expense.id}`, expense, this.requestOption(true))
      .toPromise()
    return;
  }

  private requestOption(hasBody = false) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.authService.token
    })
    if (hasBody) {
      headers.set('Content-Type', 'application/json')
    }
    return new RequestOptions({ headers: headers });
  }
  // const index = this.expenses.findIndex(it => it.id === expenseId);
  // localStorage.setItem('expenses', JSON.stringify(this.expenses));
  // const expenses = localStorage.getItem('expenses');
  //   if (expenses) {
  //     return JSON.parse(expenses);
  //   }
}