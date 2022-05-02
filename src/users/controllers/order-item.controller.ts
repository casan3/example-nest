import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Put()
  update(@Body() payload: UpdateOrderItemDto) {
    return this.orderItemService.update(payload);
  }

  @Delete()
  remove(@Body() payload: UpdateOrderItemDto) {
    return this.orderItemService.deleteItem(payload);
  }
}
