import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './core/stores/app.store';
import { OrderSocket } from './modules/orders/services/orderSocket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  appStore = inject(AppStore);
  orderSocket = inject(OrderSocket);
  
  protected readonly title = signal('order-restaurant-front');
}
