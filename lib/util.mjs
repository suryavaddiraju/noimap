function parseSnsMessage(event){
    if (!(event && typeof event==="object" && event.hasOwnProperty("Records") && Array.isArray(event.Records) && event.Records.length > 0 && event.Records[0].hasOwnProperty("Sns") && typeof event.Records[0].Sns === "object" && event.Records[0].Sns && event.Records[0].Sns.hasOwnProperty("Message") && typeof event.Records[0].Sns.Message === "string" && event.Records[0].Sns.Message)) {
        throw new TypeError("Invalid AWS SNS event: Pass the event object as it is from the SNS event.");
    }
    const snsMessage = JSON.parse(event.Records[0].Sns.Message);
    return snsMessage;
}
export {parseSnsMessage};