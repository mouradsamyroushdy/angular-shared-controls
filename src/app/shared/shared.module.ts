import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Controls from './controls';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Controls.ALL],
  exports:[Controls.ALL],
})
export class SharedModule { }