import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';

const routes: Routes = [
  {
    path: '',
    component: AutocompleteInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
