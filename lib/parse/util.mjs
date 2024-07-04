function validateS3SNSEvent(snsMessage) {
    if (!(snsMessage && typeof snsMessage === "object" && Object.prototype.hasOwnProperty.call(snsMessage,"notificationType") && snsMessage.notificationType && typeof snsMessage.notificationType === "string" && snsMessage.notificationType === 'Received')) {
        throw new TypeError("Invalid SNS message for SES email received event: Missing or invalid notificationType.");
    } else{ 
        if (!(Object.prototype.hasOwnProperty.call(snsMessage,"receipt") && snsMessage.receipt && typeof snsMessage.receipt === "object" && Object.prototype.hasOwnProperty.call(snsMessage.receipt,"action") && snsMessage.receipt.action && typeof snsMessage.receipt.action === "object")) {
            throw new TypeError("Invalid SNS message for SES email received event: Missing or invalid receipt action.");
        } else{
            const action = snsMessage.receipt.action;
            if (!(Object.prototype.hasOwnProperty.call(action,"type") && action.type && typeof action.type === "string" && action.type === "S3" && Object.prototype.hasOwnProperty.call(action,"bucketName") && action.bucketName && typeof action.bucketName === "string" && Object.prototype.hasOwnProperty.call(action,"objectKey") && action.objectKey && typeof action.objectKey === "string")) {
                throw new TypeError("Invalid SNS message for SES email received event: Invalid S3 action in receipt.");
            }
            else{
                return true;
            }  
        }
    }
}
export {validateS3SNSEvent};
