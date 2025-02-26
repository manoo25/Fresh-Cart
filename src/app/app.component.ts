import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CartService } from './core/services/cart/cart.service';
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {



}
