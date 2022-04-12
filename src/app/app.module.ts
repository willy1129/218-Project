import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataGetterService } from './data-getter.service';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilService } from './util.service';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SavedFiltersComponent } from './saved-filters/saved-filters.component';
@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CheckboxesComponent,
    ChartComponent,
    SavedFiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [DataGetterService, UtilService],
  bootstrap: [AppComponent, DataTableComponent]
})
export class AppModule { }
