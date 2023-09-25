import { Status } from "../enum/status.enum";

export interface Server {
    readonly id?:string;
    ipAddress:string;
    name:string;
    memory:string;
    type:string;
    imgURL:string;
    status:Status
}