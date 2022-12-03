import CostumeCreatedEvent from "../../../customer/event/customer-created.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class SendConsoleLogCreatedHandlerTwo
    implements EventHandlerInterface<CostumeCreatedEvent>
{
    handle(event: CostumeCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}
