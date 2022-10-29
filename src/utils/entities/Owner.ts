import {Property} from "./Property";

export interface Owner {
    username: string;
    name: string;
    email: string;
    password: string;
    properties: Property[];
}