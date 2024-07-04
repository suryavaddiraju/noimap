import {MailParser,simpleParser} from "mailparser";
import {S3Client,GetObjectCommand} from"@aws-sdk/client-s3";
import {parseSnsMessage} from "../util.mjs";
import {validateS3SNSEvent} from "./util.mjs";
function parsers(instance,event={}){
    const snsMessage = parseSnsMessage(event);
    validateS3SNSEvent(snsMessage)
    return snsMessage;
}
// if (!(snsMessage && typeof snsMessage === "object" && snsMessage.hasOwnProperty("notificationType") && snsMessage.notificationType && typeof snsMessage.notificationType === "string" && snsMessage.notificationType==='Received' && snsMessage.hasOwnProperty("receipt") && snsMessage.receipt && typeof snsMessage.receipt === "object" && snsMessage.receipt.hasOwnProperty("action") && snsMessage.receipt.action && typeof snsMessage.receipt.action === "object" && snsMessage.mail.hasOwnProperty("messageId") && typeof snsMessage.mail.messageId === "string" && snsMessage.mail.messageId && snsMessage.mail.hasOwnProperty("source") && typeof snsMessage.mail.source === "string" && snsMessage.mail.source && snsMessage.mail.hasOwnProperty("timestamp") && typeof snsMessage.mail.timestamp === "string" && snsMessage.mail.timestamp && snsMessage.mail.hasOwnProperty("destination") && Array.isArray(snsMessage.mail.destination) && snsMessage.mail.destination.length > 0 && snsMessage.mail.destination.every((item)=>typeof item==="string" && item)
export {parsers as parse};
let attachments = [];
const SNSEVENT = JSON.parse(aws_event);
validateS3SNSEvent(SNSEVENT);
async function s3_get_object(SNSEVENT){
    const s3_input = {
        Bucket:SNSEVENT.receipt.action.bucketName,
        Key : SNSEVENT.receipt.action.objectKey
    };
    const command = new GetObjectCommand(s3_input);
    const s3_client = new S3Client({
        region: "us-east-1"
    });
    const response = await s3_client.send(command);
    const stream = response.Body;
    let data = '';
    for await (const chunk of stream) {
        data += chunk;
    }
    return data;
}
const response = await s3_get_object(SNSEVENT);
let mail = await simpleParser(response);