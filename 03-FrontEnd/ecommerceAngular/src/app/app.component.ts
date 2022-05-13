import { Component } from '@angular/core';

//selectors instruct Angular to instantiate this component wherever
//it finds its corresponding tag in an HTML file
@Component({
  selector: 'app-root', //it is called in index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerceAngular';
}
