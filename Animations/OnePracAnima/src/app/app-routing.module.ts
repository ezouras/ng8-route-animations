import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import the components to route
import {AboutPageComponent} from './about-page/about-page.component';
import {LeftPageComponent} from './left-page/left-page.component';
import {RightPageComponent} from './right-page/right-page.component';


//you give it the name "routes".  which is a kind of routes imported above.
//it equals an array of objects. each object is a aroute.
const routes: Routes = [
{ path:"about", component: AboutPageComponent},
//data is a property in which we can pass data to the route.
//you must define an animation in ? and
{ path:"right", component: RightPageComponent, data:{animation:"isRight"}},
{ path: "left", component: LeftPageComponent, data:{animation: "isLeft"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
