import eventLogApi from "../eventLogApi";
import { events } from "../../assets/Events";

let eventPayload = {};

export default {
    addOneEventSuccessful: (creatorId, email, event) => {
        eventPayload = {
            creator: creatorId,
            email: email,
            event: event,
            type: events.eventSuccess
        }
        eventLogApi.addOneEvent(eventPayload);
    },

    addOneEventFailure: (creatorId, email, event, error) => {
        eventPayload = {
            creator: creatorId,
            email: email,
            event: event,
            type: events.eventError,
            error: error.toString()
        }
        eventLogApi.addOneEvent(eventPayload);
    }
}
