// #region -------------------------------------- Angular
import { NgModule, ElementRef, Directive } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
// #endregion -----------------------------------

// #region -------------------------------------- 3rd-Parties
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { POPUP_CONTAINER, PopupModule } from '@progress/kendo-angular-popup';
// #endregion -----------------------------------

// #region -------------------------------------- App
import * as Controls from './controls';
import * as Directives from './directives';
import * as Pipes from './pipes';
import * as Enums from './enums';
// #endregion -----------------------------------

@NgModule({
    declarations: [
        Controls.ALL,
        Directives.ALL,
        Pipes.ALL,
    ],
    imports: [
        ButtonsModule,
        CommonModule,
        DropDownsModule,
        FormsModule,
        InputsModule,
        PopupModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        ButtonsModule,
        CommonModule,
        Controls.ALL,
        Directives.ALL,
        DropDownsModule,
        FormsModule,
        InputsModule,
        Pipes.ALL,
        PopupModule,
    ],
    entryComponents: [Controls.AlertComponent],
    providers: [
        Pipes.Providers,
        {
            provide: POPUP_CONTAINER,
            useFactory: () => {
                return { nativeElement: document.body } as ElementRef;
            }
        }
    ],
})
export class SharedModule { }
