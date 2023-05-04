import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://demetrepanjakidze1:3LRK4fmTU4w8YX93@cluster0.n9ea3hx.mongodb.net/FIRST-PROJECT?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
