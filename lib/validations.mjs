function validateinstance(instance){
    if (!(instance && typeof instance === "object" && instance.hasOwnProperty("s3_client") && instance.hasOwnProperty("dynamodb_client") && instance.hasOwnProperty("sts_client") && instance.hasOwnProperty("ses_client") && instance.s3_client && instance.dynamodb_client && instance.sts_client && instance.ses_client)) {
        throw new ValidationError("Invalid instance: Ensure the instance object is correctly created from the noimap class with all necessary properties.");
    }
}
async function parseSnsMessage(event){
    if (!(event && typeof event==="object" && event.hasOwnProperty("Records") && Array.isArray(event.Records) && event.Records.length > 0 && event.Records[0].hasOwnProperty("Sns") && typeof event.Records[0].Sns === "object" && event.Records[0].Sns && event.Records[0].Sns.hasOwnProperty("Message") && typeof event.Records[0].Sns.Message === "string" && event.Records[0].Sns.Message)) {
        throw new ValidationError("Invalid AWS SNS event: Pass the event object as it is from the SNS event.");
    }
    try{
        const snsMessage = JSON.parse(event.Records[0].Sns.Message);
        return snsMessage;
    }catch(e){
        throw new ValidationError("Invalid JSON message in SNS event: " + e.message);
    }
}
function validateS3SNSEvent(snsMessage) {
    if (!(snsMessage && typeof snsMessage === "object" && snsMessage.hasOwnProperty("notificationType") && snsMessage.notificationType && typeof snsMessage.notificationType === "string" && snsMessage.notificationType === 'Received')) {
        throw new ValidationError("Invalid SNS message for SES email received event: Missing or invalid notificationType.");
    } else if (!(snsMessage.hasOwnProperty("receipt") && snsMessage.receipt && typeof snsMessage.receipt === "object" && snsMessage.receipt.hasOwnProperty("action") && snsMessage.receipt.action && typeof snsMessage.receipt.action === "object")) {
        throw new ValidationError("Invalid SNS message for SES email received event: Missing or invalid receipt action.");
    }

    const action = snsMessage.receipt.action;

    if (!(action.hasOwnProperty("type") && action.type && typeof action.type === "string" && action.type === "S3" && action.hasOwnProperty("bucketName") && action.bucketName && typeof action.bucketName === "string" && action.hasOwnProperty("objectKey") && action.objectKey && typeof action.objectKey === "string")) {
        throw new ValidationError("Invalid SNS message for SES email received event: Invalid S3 action in receipt.");
    }
}
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
export {validateinstance,parseSnsMessage,validateS3SNSEvent,ValidationError};