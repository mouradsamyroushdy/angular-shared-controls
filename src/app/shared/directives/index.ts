import { LoadTabOnDemandDirective } from "./load-tab-on-demand.directive";
import { ScrollbarDirective, ScrollEvent } from "./scrollbars.directive";
import { ClickStopPropagationDirective } from "./click-stop-propagation.directive";

export const ALL = [
    ClickStopPropagationDirective,
    LoadTabOnDemandDirective,
    ScrollbarDirective,
];

export {
    ClickStopPropagationDirective,
    LoadTabOnDemandDirective,
    ScrollbarDirective,
    ScrollEvent,
};