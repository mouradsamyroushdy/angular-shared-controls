// #region -------------------------------------- Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// #endregion -----------------------------------

// #region -------------------------------------- 3rd-Parties
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { ButtonsModule } from "@progress/kendo-angular-buttons";

// #endregion -----------------------------------

// #region -------------------------------------- App
import * as Controls from "./controls";
// #endregion -----------------------------------

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    InputsModule,
    ButtonsModule,
    DropDownsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Controls.ALL],
  exports: [
    Controls.ALL,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    LabelModule
  ]
})
export class SharedModule {}
