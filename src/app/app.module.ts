import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatDialogModule,
  MatRadioModule,
  MatTabsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatSliderModule,
  MatBadgeModule
} from '@angular/material';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ListCarComponent } from './components/car/list-car/list-car.component';
import { MyNavComponent } from './components/shared/my-nav/my-nav.component';
import { ListSublevelComponent } from './components/category/list-sublevel/list-sublevel.component';
import { FormsModule } from '@angular/forms';
import { GeneralAlertComponent } from './components/shared/general-alert/general-alert.component';

@NgModule({
  entryComponents: [GeneralAlertComponent],
  declarations: [
    AppComponent,
    MyNavComponent,
    ListCategoryComponent,
    ListProductsComponent,
    ListCarComponent,
    ListSublevelComponent,
    GeneralAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FormsModule,
    MatSliderModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
