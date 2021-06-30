import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MemDeckTrainerComponent} from './components/mem-deck-trainer/mem-deck-trainer.component';
import {MnemonicosisComponent} from './pages/mnemonicosis/mnemonicosis.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CardMinValidatorDirective} from './directives/card-min-validator/card-min-validator.directive';
import {CardMaxValidatorDirective} from './directives/card-max-validator/card-max-validator.directive';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TrainerValidatorDirective} from './directives/trainer-validator/trainer-validator.directive';
import {HomeComponent} from './pages/home/home.component';
import {CardValueComponent} from './components/card-value/card-value.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SpreadComponent} from './components/spread/spread.component';
import {SpreadDialogComponent} from './components/spread-dialog/spread-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {AccanComponent} from './pages/accan/accan.component';
import {TrainerComponent} from './pages/trainer/trainer.component';
import {CyclicalTrainerComponent} from './components/cyclical-trainer/cyclical-trainer.component';
import {DeckFiltersFormComponent} from './components/deck-filters-form/deck-filters-form.component';
import {SuitsPipe} from './pipes/suits/suits.pipe';
import { CardValuesPipe } from './pipes/card-values/card-values.pipe';
import { MissingCardsComponent } from './pages/missing-cards/missing-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    MemDeckTrainerComponent,
    MnemonicosisComponent,
    CardMinValidatorDirective,
    CardMaxValidatorDirective,
    TrainerValidatorDirective,
    HomeComponent,
    CardValueComponent,
    SpreadComponent,
    SpreadDialogComponent,
    AccanComponent,
    TrainerComponent,
    CyclicalTrainerComponent,
    DeckFiltersFormComponent,
    SuitsPipe,
    CardValuesPipe,
    MissingCardsComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatCardModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatExpansionModule
    ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
