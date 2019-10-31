import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import{RadioboxComponent} from './controls/radiobox/radiobox.component.ts';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent,RadioboxComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
