import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { SliderComponent } from "../../Pages/slider/slider.component";

@Component({
  selector: 'app-blank',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, SliderComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
