import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductFeatureDTO {
  @IsString()
  @IsNotEmpty({ message: 'Feature name cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Feature description cannot be empty' })
  description: string;
}

export class ProductImageDTO {
  @IsUrl(undefined, { message: 'Invalid image URL' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Image description cannot be empty' })
  description: string;
}

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'Invalid user ID' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'Value must be greater than zero' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'Invalid minimum quantity' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: 'Product description cannot be empty' })
  @MaxLength(1000, {
    message: 'Description cannot exceed 1000 characters',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductFeatureDTO)
  features: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Product category cannot be empty' })
  category: string;
}
