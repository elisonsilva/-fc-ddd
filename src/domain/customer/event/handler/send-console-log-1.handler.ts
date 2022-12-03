import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CostumeCreatedEvent from "../customer-created.event";

export default class SendConsoleLogCreatedHandlerOne
    implements EventHandlerInterface<CostumeCreatedEvent>
{
    handle(event: CostumeCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}
