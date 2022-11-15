import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[libDynamicComp]'
})
export class RenderedViewDynamicCompDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
