import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SelectedPokmonComponent } from './selected-pokmon/selected-pokmon.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path : "pokemon/:id",
    component : SelectedPokmonComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
