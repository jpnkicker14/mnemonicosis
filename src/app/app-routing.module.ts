import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemDeckTrainerComponent} from './components/mem-deck-trainer/mem-deck-trainer.component';
import {MnemonicosisComponent} from './components/mnemonicosis/mnemonicosis.component';
import {HomeComponent} from './components/home/home.component';
import {AccanComponent} from './components/accan/accan.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'trainer', component: MemDeckTrainerComponent},
  {path: 'mnemonicosis', component: MnemonicosisComponent},
  {path: 'accan', component: AccanComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
