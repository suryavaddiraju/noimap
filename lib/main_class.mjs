import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import {SESv2Client, SendEmailCommand} from "@aws-sdk/client-sesv2";
import { STSClient, AssumeRoleWithWebIdentityCommand} from "@aws-sdk/client-sts";
import { v4 as uuidv4 } from "uuid";
class noimap{
    constructor(params){
        this.s3_client = new S3Client(params.s3_client);
        this.dynamodb_client = new DynamoDBClient(params.dynamodb_client);
        this.sts_client = new STSClient(params.sts_client);
        this.ses_client = new SESv2Client(params.ses_client);   
    }
}
export {noimap};
export default noimap;