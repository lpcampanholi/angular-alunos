import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type inputTipos = "text" | "email" | "password";

@Component({
  selector: 'app-campo-texto',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampoTextoComponent),
      multi: true
    }
  ],
  templateUrl: './campo-texto.component.html',
  styleUrl: './campo-texto.component.css',
})
export class CampoTextoComponent implements ControlValueAccessor {
  @Input() tipo: inputTipos = "text";
  @Input() placeholder: string = "";
  @Input() rotulo: string = "";
  @Input() nome: string = "";

  valor: string = '';
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.valor = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
