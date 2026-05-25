import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MnemonicosisComponent} from './pages/mnemonicosis/mnemonicosis.component';
import {HomeComponent} from './pages/home/home.component';
import {AccanComponent} from './pages/accan/accan.component';
import {TrainerComponent} from './pages/trainer/trainer.component';
import {MissingCardsComponent} from './pages/games/missing-cards/missing-cards.component';
import { BeatClockComponent } from './pages/games/beat-clock/beat-clock.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'trainer', component: TrainerComponent},
  {path: 'mnemonicosis', component: MnemonicosisComponent},
  {path: 'accan', component: AccanComponent},
  {path: 'missing-cards', component: MissingCardsComponent},
  {path: 'beat-clock', component: BeatClockComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
