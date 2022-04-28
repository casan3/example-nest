import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { CustomersController } from './controllers/customers.controller';
import { Customer } from './entities/customer.entity';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
