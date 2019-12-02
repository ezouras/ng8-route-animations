import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import {
  //slider,
  //fader,
  stepper,
 //transformer
} from './route-animations';
//slider and fader are constants that are equal to trigger functions
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    //fader,
    //slider,
    //transformer,
    stepper
  ]
})
export class AppComponent {
  title = 'OnePracAnima';

  //define different animations for the routes
  //outlet - your name.  RouterOutlet - the type imported
// above.
  prepareRoute(outlet: RouterOutlet){
    //pass in dynamic data

    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];

}
}
