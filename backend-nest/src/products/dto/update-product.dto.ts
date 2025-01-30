import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductFeatureDTO, ProductImageDTO } from './create-product.dto';

export class UpdateProductDTO {
  @IsUUID(undefined, { message: 'Invalid product ID' })
  id: string;

  @IsUUID(undefined, { message: 'Invalid user ID' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Value must be greater than zero' })
  @IsOptional()
  value: number;

  @IsNumber()
  @Min(0, { message: 'Invalid minimum quantity' })
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductFeatureDTO)
  @IsOptional()
  features: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Product category cannot be empty' })
  @IsOptional()
  category: string;
}
