import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';

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