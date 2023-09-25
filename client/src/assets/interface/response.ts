import { Server } from "./server";

export interface Response {
    timeStamp:Date;
    message:string;
    reason?:string;
    status:string;
    statusCode:number;
    data?:{servers?:Server[], server?:Server};
}