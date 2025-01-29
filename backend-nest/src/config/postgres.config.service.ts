import { UserEntity } from './../users/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ProductFeature } from 'src/produto/product-feature.entity';
import { ProductImage } from 'src/produto/product-image.entity';

import { ProductEntity } from 'src/produto/product.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [UserEntity, ProductEntity, ProductFeature, ProductImage],
      synchronize: true,
    };
  }
}
