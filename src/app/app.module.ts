import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import {CodeEditorModule} from "@ngstack/code-editor";
import { TabComponent } from './tab/tab.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {HighlightModule} from "ngx-highlightjs";
import { MonacoEditorModule } from 'ngx-monaco-editor';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CodeEditorModule.forChild(),
    MonacoEditorModule.forRoot(),
    HighlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
