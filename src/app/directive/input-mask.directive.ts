import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective {

  // Expresión regular para permitir solo números
  private regex!: RegExp;

  @Input('appInputMask') mask: string = ''; // Máscara como parámetro de entrada

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Construir la expresión regular basada en la máscara recibida
    this.regex = new RegExp(this.mask);
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    let cleanedValue = initialValue.replace(this.mask, '');
    
    // Validar si el valor sigue la expresión regular
    const match = cleanedValue.match(this.regex);

    if (match === null) {
      cleanedValue = '';
    }
    
    // Actualizar el valor en el campo
    if (initialValue !== cleanedValue) {
      this.el.nativeElement.value = cleanedValue;
      // Emitir evento de cambio manualmente
      event.stopPropagation();
    }
  }

}
