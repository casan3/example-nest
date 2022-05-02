import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const newOrderItem = new OrderItem();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;

    return this.orderItemRepo.save(newOrderItem);
  }

  async update(changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne({
      where: {
        order: { id: changes.orderId },
        product: { id: changes.productId },
      },
    });

    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }

    return this.orderItemRepo.save(orderItem);
  }

  async deleteItem(changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne({
      where: {
        order: { id: changes.orderId },
        product: { id: changes.productId },
      },
    });

    return this.orderItemRepo.delete(orderItem.id);
  }
}
