import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemDeckTrainerComponent} from './components/mem-deck-trainer/mem-deck-trainer.component';
import {MnemonicosisComponent} from './components/mnemonicosis/mnemonicosis.component';

const routes: Routes = [
  {path: 'trainer', component: MemDeckTrainerComponent},
  {path: 'mnemonicosis', component: MnemonicosisComponent},
  {path: '**', redirectTo: 'trainer', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
