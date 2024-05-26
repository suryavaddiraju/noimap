import {MailParser} from "mailparser";
import {validateinstance,parseSnsMessage,validateS3SNSEvent,ValidationError} from "./validations.mjs";
async function parser(instance,event={}){
    validateinstance(instance);
    const snsMessage = await parseSnsMessage(event);
    validateS3SNSEvent(snsMessage);
    return snsMessage;
}
// if (!(snsMessage && typeof snsMessage === "object" && snsMessage.hasOwnProperty("notificationType") && snsMessage.notificationType && typeof snsMessage.notificationType === "string" && snsMessage.notificationType==='Received' && snsMessage.hasOwnProperty("receipt") && snsMessage.receipt && typeof snsMessage.receipt === "object" && snsMessage.receipt.hasOwnProperty("action") && snsMessage.receipt.action && typeof snsMessage.receipt.action === "object" && snsMessage.mail.hasOwnProperty("messageId") && typeof snsMessage.mail.messageId === "string" && snsMessage.mail.messageId && snsMessage.mail.hasOwnProperty("source") && typeof snsMessage.mail.source === "string" && snsMessage.mail.source && snsMessage.mail.hasOwnProperty("timestamp") && typeof snsMessage.mail.timestamp === "string" && snsMessage.mail.timestamp && snsMessage.mail.hasOwnProperty("destination") && Array.isArray(snsMessage.mail.destination) && snsMessage.mail.destination.length > 0 && snsMessage.mail.destination.every((item)=>typeof item==="string" && item)
export {parser};