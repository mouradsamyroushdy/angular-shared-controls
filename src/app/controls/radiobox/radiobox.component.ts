import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-radiobox",
  templateUrl: "./radiobox.component.html",
  styleUrls: ["./radiobox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioboxComponent implements OnInit, ControlValueAccessor {
  // #region ------------------------------- Params
  private _model: any;

  // #region ------------------------------- Setters/Getters
  get model(): any {
    return this._model;
  }
  set model(value: any) {
    console.log(this._model);
    if (value !== this._model) {
      this._model = value;
      this.onChangeCallback(value);
    }
  }

  // #region ------------------------------- Inputs
  @Input() label: string;
  @Input() name: string;
  @Input() value: string;

  // #region ------------------------------- Outputs
  @Output() checkChanged = new EventEmitter();

  // #region ------------------------------- Lifecycle-Hooks
  constructor() {}
  ngOnInit() {}

  // #region ------------------------------- Control-Value-Accessor
  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  writeValue(value: any): void {
     this._model = value;
     return;
    if (value !== this._model) {
      this._model = value;
    }
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  onTouchedCallback(): void {}
  onChangeCallback(val: any): void {}

  valueChanged($event) {
    this.propagateChange($event);
    this.checkChanged.emit($event);
  }
}
