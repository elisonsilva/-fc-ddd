import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumeCreatedEvent from "../../customer/customer-created.event";

export default class SendConsoleLogCreatedHandlerTwo
    implements EventHandlerInterface<CostumeCreatedEvent>
{
    handle(event: CostumeCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}
