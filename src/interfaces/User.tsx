import {Role} from "./Role";
export  interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    birthDate: string;
    jwtToken: string;
    roles: Role[];
}