import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MnemonicosisComponent} from './components/mnemonicosis/mnemonicosis.component';
import {HomeComponent} from './components/home/home.component';
import {AccanComponent} from './components/accan/accan.component';
import {TrainerComponent} from './components/trainer/trainer.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'trainer', component: TrainerComponent},
  {path: 'mnemonicosis', component: MnemonicosisComponent},
  {path: 'accan', component: AccanComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
