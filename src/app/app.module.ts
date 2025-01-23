import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';

import { AppComponent } from './app.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { FilterByTypesPipe } from './pipes/filter-by-types.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkflowComponent,
    FilterByTypesPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgFlowchartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 