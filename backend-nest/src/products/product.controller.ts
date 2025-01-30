// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { randomUUID } from 'crypto';

// import { CreateProductDTO } from './dto/create-product.dto';
// import { UpdateProductDTO } from './dto/update-product.dto';
// import { ProductEntity } from './product.entity';
// import { ProductRepository } from './product.repository';

// @Controller('products')
// export class ProductController {
//   constructor(private readonly productRepository: ProductRepository) {}

//   @Get()
//   async findAll() {
//     return await this.productRepository.findAll();
//   }

//   @Post()
//   async create(@Body() productData: CreateProductDTO) {
//     const product = new ProductEntity();
//     product.id = randomUUID();
//     product.name = productData.name;
//     product.userId = productData.userId;
//     product.value = productData.value;
//     product.amount = productData.amount;
//     product.description = productData.description;
//     product.category = productData.category;
//     // product.features = productData.features;
//     // product.images = productData.images;
//     const registeredProduct = await this.productRepository.save(product);
//     return registeredProduct;
//   }

//   @Put('/:id')
//   async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
//     const updatedProduct = await this.productRepository.update(id, productData);
//     return {
//       message: 'Product successfully updated',
//       product: updatedProduct,
//     };
//   }

//   @Delete('/:id')
//   async remove(@Param('id') id: string) {
//     const removedProduct = await this.productRepository.remove(id);
//     return {
//       message: 'Product successfully removed',
//       product: removedProduct,
//     };
//   }
// }
