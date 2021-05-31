import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemDeckComponent} from './components/mem-deck/mem-deck.component';
import {CyclicalComponent} from './components/cyclical/cyclical.component';

const routes: Routes = [
  {path: 'mem-deck', component: MemDeckComponent},
  {path: 'cyclical', component: CyclicalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
