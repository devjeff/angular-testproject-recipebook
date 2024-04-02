import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // Variante 1 - schwieriger:
    // private static OPEN_CLASS_NAME = "open";
    // openClassEnabled = false;

    // constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    // @HostListener('click')
    // onElementClicked() {
    //     this.openClassEnabled = !this.openClassEnabled;

    //     if (this.openClassEnabled) {
    //         this.renderer.addClass(this.elRef.nativeElement, DropdownDirective.OPEN_CLASS_NAME);
    //     } else {
    //         this.renderer.removeClass(this.elRef.nativeElement, DropdownDirective.OPEN_CLASS_NAME);
    //     }
    // }

    // Variante 2 - leichter:
    @HostBinding('class.open')
    openClassEnabled = false;

    @HostListener('click')
    onElementClicked() {
        this.openClassEnabled = !this.openClassEnabled;
    }
}