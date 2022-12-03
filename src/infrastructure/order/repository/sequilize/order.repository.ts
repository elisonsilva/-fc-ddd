import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../../../order/repository/sequilize/order-item.model";
import OrderModel from "../../../order/repository/sequilize/order.model";

import OrderItem from "../../../../domain/checkout/entity/order_item"; // domain/entities/order-item 

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  /**
   * Update
   * @param entity 
   */
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id }
      }
    );

    entity.items.forEach(async item => {
      await OrderItemModel.update({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      },
        {
          where: { id: item.id }
        })
    });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async find(id: string): Promise<Order> {
    const model = await OrderModel.findOne({
      where: { id: id },
      include: [{ model: OrderItemModel }],
    });

    const items: Array<OrderItem> = [];

    for (const iterator of model.items) {
      items.push(
        new OrderItem(
          iterator.id,
          iterator.name,
          iterator.price,
          iterator.product_id,
          iterator.quantity
        )
      );
    }

    const order = new Order(model.id, model.customer_id, items);

    return order;
  }

  /**
   * 
   * @returns 
   */
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })
    return orders.map(order => {
      const orderItems: Array<OrderItem> = []

      for (const iterator of order.items) {
        orderItems.push(new OrderItem(iterator.id, iterator.name, iterator.price, iterator.product_id, iterator.quantity))
      }

      return new Order(order.id, order.customer_id, orderItems)
    });
  }
}
