// For more information:
// - https://github.com/KingSora/OverlayScrollbars
// - https://github.com/KingSora/OverlayScrollbars/tree/master/packages/overlayscrollbars-ngx

import {
  EventEmitter,
  Output,
  ElementRef,
  Input,
  Directive,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  OnInit,
  Renderer2,
  OnChanges
} from "@angular/core";
import _ from "lodash";
import OverlayScrollbars from "overlayscrollbars";

@Directive({
  selector: "[appScrollbars]"
})
export class ScrollbarDirective
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // -------------------------------------------- Parameters
  osInstance: OverlayScrollbars;
  options: OverlayScrollbars.Options = {
    autoUpdate: true,
    callbacks: {
      // onScroll: () => this.onScroll
    },
    scrollbars: {
      autoHide: 'leave',
      autoHideDelay: 800
    }
  };
  // --------------------------------------------

  // -------------------------------------------- Inputs
  @Input() maxHeight: number | string = "auto";
  @Input() maxWidth: number | string = "auto";
  // --------------------------------------------

  // -------------------------------------------- Outputs
  @Output("onScroll") onScrollEmitter: EventEmitter<
    ScrollEvent
  > = new EventEmitter<ScrollEvent>();
  // --------------------------------------------

  // -------------------------------------------- Lifecycle-Hooks
  constructor(private element: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, "max-height", this.maxHeight);
    this.renderer.setStyle(this.element.nativeElement, "max-width", this.maxWidth);
  }
  ngAfterViewInit(): void {
    this.osInstance = OverlayScrollbars(this.element.nativeElement, this.options);
  }
  ngOnDestroy() {
    if (this.osInstance && this.osInstance.destroy) {
      this.osInstance.destroy();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxHeight && changes.maxHeight.previousValue !== changes.maxHeight.currentValue) {
      this.maxHeight = this.adjustDimension(changes.maxHeight.currentValue);
    }
    if (changes.maxWidth && changes.maxWidth.previousValue !== changes.maxWidth.currentValue) {
      this.maxWidth = this.adjustDimension(changes.maxWidth.currentValue);
    }
  }
  // --------------------------------------------

  // -------------------------------------------- Private-Methods
  private adjustDimension(dimension: string | number) {
    let value = dimension;
    if (_.isSafeInteger(dimension)) {
      value = dimension + "px";
    } else if (
      _.isString(dimension) &&
      _.indexOf(dimension, "px") == dimension.length - 2
    ) {
      value = dimension + "px";
    }
    return value;
  }
  private onScroll() {
    let event = new ScrollEvent();

    if (
      this.osInstance &&
      this.osInstance.scroll() &&
      this.osInstance.scroll().position
    ) {
      event.left = this.osInstance.scroll().position.x;
      event.top = this.osInstance.scroll().position.y;
    }

    this.onScrollEmitter.emit(event);
    this.onScrollEmitter.emit();
  }
  // --------------------------------------------
}

export class ScrollEvent {
  top: number;
  left: number;
}
