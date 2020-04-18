import eventLogApi from "../eventLogApi";
import { events } from "../../assets/Events";

let eventPayload = {};

export default {
    successful: (creatorId, email, event) => {
        eventPayload = {
            creator: creatorId,
            email: email,
            event: event,
            status: events.eventSuccess,
            error: events.eventNoErrors
        }
        eventLogApi.addOneEvent(eventPayload)
            .then(() => eventLogApi.removeOldEvents());
    },

    failure: (creatorId, email, event, error) => {
        eventPayload = {
            creator: creatorId,
            email: email,
            event: event,
            status: events.eventError,
            error: error.toString()
        }
        eventLogApi.addOneEvent(eventPayload)
            .then(() => eventLogApi.removeOldEvents());
    }
}
