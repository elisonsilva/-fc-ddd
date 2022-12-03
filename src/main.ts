import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';
import OrderItem from './domain/checkout/entity/order_item';
import Order from './domain/checkout/entity/order';

// [!Agregados]
// Agregado 1
// Relação de agregado por ID
let customer = new Customer('123', 'Fulano de tal');
const address = new Address('Rua dois', 2, '00000-000', "São Paulo");
customer.Address = address;
customer.activate();


// Agregado 2
// Relação de agregado por OBJ
const item1 = new OrderItem("1", 'Item 1', 99, "10", 1);
const item2 = new OrderItem("2", 'Item 2', 90, "10", 1);
const order = new Order("1", "123", [item1, item2]);
