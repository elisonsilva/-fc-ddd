import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import ProductModel from "../../../product/repository/sequilize/product.model";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import OrderItemModel from "../../../order/repository/sequilize/order-item.model";
import OrderModel from "../../../order/repository/sequilize/order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });


  it("should update an order", async () => {


    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    // Product
    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 10);
    const product2 = new Product("product2", "Product 2", 15);

    // Order Items
    const orderItem1 = new OrderItem("item1", product1.name, product1.price, product1.id, 5);
    const orderItem2 = new OrderItem("item2", product2.name, product2.price, product2.id, 2);

    // Order
    const orderRepository = new OrderRepository();
    const order = new Order("order1", customer.id, [orderItem1, orderItem2]);

    // Created
    await customerRepository.create(customer);
    await productRepository.create(product1);
    await productRepository.create(product2);

    await orderRepository.create(order);

    // Change
    orderItem1.changeQuantity(6);
    order.updateItem(orderItem1);

    await orderRepository.update(order);

    // Find
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      items: [
        {
          id: orderItem1.id,
          product_id: orderItem1.productId,
          order_id: order.id,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          name: orderItem1.name
        },
        {
          id: orderItem2.id,
          product_id: orderItem2.productId,
          order_id: order.id,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          name: orderItem2.name
        }
      ],
      total: order.total(),
    });

  });


  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 2", 1, "Zipcode 2", "City 2");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const result = await orderRepository.find(order.id);


    expect(result.id).toBe(order.id);
    expect(result.customerId).toBe(order.customerId);
    expect(result.items.shift().price).toBe(order.items.shift().price);
  });

  /**
   * 
   */
  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 15);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem1]);
    await orderRepository.create(order);

    const order2 = new Order("2", customer.id, [orderItem2]);
    await orderRepository.create(order2);

    const result = await orderRepository.findAll();

    expect(result.length).toEqual(2);
  });
});
