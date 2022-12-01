import Address from '../../entity/address';
import Customer from '../../entity/customer';
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EnviaConsoleLog1Handler from "../customer/handler/send-console-log-1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/send-console-log-2.handler";
import EnviaConsoleLogHandler from "../customer/handler/send-console-log.handler";
import ProductCreatedEvent from "../product/product-created.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerAddressUpdatedEvent from '../../event/customer/customer-address-updated.event';

describe("Domain events tests", () => {

  /**
   * 
   */
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  /**
   * 
   */
  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });


  /**
   * 
   */
  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });


  /**
   * 
   */
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle"); // Espiar um Evento executa o method

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    /**
     * Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() 
     * deve ser chamado
     */
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });



  /**
   * Desafio
   * Agora que você já possui a base sobre Domain Events, implemente dois Eventos de Domínio para o agregado de Customer.
   * O primeiro evento deverá acontecer quando um novo Customer é criado. Nesse ponto, crie 2 handlers exibindo um "console.log".
   * O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.
   */

  // it("should notify all customer created event handlers", () => {

  //   const eventDispatcher = new EventDispatcher();

  //   const eventHandler1 = new EnviaConsoleLog1Handler();
  //   const eventHandler2 = new EnviaConsoleLog2Handler();

  //   eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
  //   eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

  //   const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
  //   const spyEventHandler2 = jest.spyOn(eventHandler1, "handle");

  //   const customerCreatedEvent = new CustomerCreatedEvent({
  //     name: "Customer 1",
  //     description: "New Customer",
  //   });

  //   eventDispatcher.notify(customerCreatedEvent);

  //   eventDispatcher.notify(customerCreatedEvent);

  //   expect(spyEventHandler1).toHaveBeenCalled();
  //   expect(spyEventHandler2).toHaveBeenCalled();
  // });

  /**
   * Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".
   */
  it("Should log when customer created event handlers 1 is called", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const spyEventHandler1 = jest.spyOn(console, 'log');

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "customer 1",
      description: "new customer",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();

    expect(spyEventHandler1).toHaveBeenCalledWith(expect.stringContaining("Esse é o primeiro console.log do evento: CustomerCreated"));
  });


  /**
   * Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated". 
   */
  it("should log when customer created event handlers 2 is called", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(console, 'log');

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 2",
      description: "New customer",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

    expect(spyEventHandler).toHaveBeenCalledWith(expect.stringContaining("Esse é o segundo console.log do evento: CustomerCreated"));
  });

  /**
   * handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".
   */
  it("Should log when customer address updated event handlers is called", () => {

    const eventDispatcher = new EventDispatcher();

    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(console, 'log');

    const customer = new Customer("1", "Customer 1")
    const address = new Address("Street 2", 123, "05858-250", "São Paulo")

    const event = new CustomerAddressUpdatedEvent({
      customer_id: customer.id,
      customer_name: customer.name,
      address: address.toString(),
    });

    customer.changeAddress(address);
    eventDispatcher.notify(event);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler).toHaveBeenCalledWith(expect.stringContaining(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address.toString()}`));
  })

});
