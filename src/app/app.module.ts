import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as Components from "./components";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [AppComponent, Components.ALL],
  bootstrap: [AppComponent]
})
export class AppModule {}
