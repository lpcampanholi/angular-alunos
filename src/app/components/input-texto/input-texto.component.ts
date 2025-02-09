import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type inputTipos = "text" | "email" | "password";

@Component({
  selector: 'app-input-texto',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextoComponent),
      multi: true
    }
  ],
  templateUrl: './input-texto.component.html',
  styleUrl: './input-texto.component.css',
})
export class InputTextoComponent implements ControlValueAccessor {
  @Input() tipo: inputTipos = "text";
  @Input() placeholder: string = "";
  @Input() rotulo: string = "";
  @Input() inputNome: string = "";

  valor: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
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
