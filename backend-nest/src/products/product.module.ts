import { Module } from '@nestjs/common';
// import { ProductController } from './product.controller';
import { UserModule } from 'src/users/user.module';
// import { ProductRepository } from './product.repository';

@Module({
  imports: [UserModule],
  // controllers: [ProductController],
  // providers: [ProductRepository],
})
export class ProductModule {}
