import {Owner} from "./Owner";
import {Camera} from "./Camera";
import {Alarm} from "./Alarm";

export interface Property {
    id: number;
    name: string;
    address: string;
    owner: Owner;
    cameras: Camera[];
    alarms: Alarm[];
}