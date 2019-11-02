import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  // #region ------------------------------------ Inputs
  @Input() listItems: any[];
  @Input() label = "";
  @Input() styles: any = {};
  @Input() txtField: any;
  @Input() txtValue: any;
  @Input() selectedItem: any;
  @Input() defaultValue: any = null;
  @Input() itemDisabled;
  @Input() primitive = false;
  @Input() disabled = false;
  // #endregion ---------------------------------

  // #region ------------------------------------ Outputs
  @Output() selectedItemOutput: EventEmitter<any> = new EventEmitter<any>();
  // #endregion ---------------------------------

  // #region ------------------------------------ Lifecycle-Hooks
  constructor() {
    console.log("Hi");
  }
  ngOnInit() {}
  // #endregion ---------------------------------

  // #region ------------------------------------ ControlValueAccessor
  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  writeValue(value: any): void {
    this.selectedItem = value;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  // #endregion ---------------------------------

  // #region ------------------------------------ Listeners
  onSelectionChange($event) {
    this.propagateChange($event);
    this.selectedItemOutput.emit($event);
  }
  // #endregion ---------------------------------
}

export interface DropdownItem {
  text: string;
  value: number;
}
