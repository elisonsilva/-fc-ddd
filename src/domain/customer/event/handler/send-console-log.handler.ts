import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CostumeCreatedEvent from "../../../customer/event/customer-created.event";

export default class SendConsoleLogCreatedHandler
    implements EventHandlerInterface<CostumeCreatedEvent>
{
    handle(event: CostumeCreatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.customer_id}, ${event.eventData.customer_name} alterado para: ${event.eventData.address}`);
    }
}
