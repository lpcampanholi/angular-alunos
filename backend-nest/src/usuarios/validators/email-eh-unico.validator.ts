import { UsuarioService } from '../usuario.service';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UsuarioService) {}

  async validate(value: string): Promise<boolean> {
    const userWithEmailExists = await this.userService.existeComEmail(value);
    return !userWithEmailExists;
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
