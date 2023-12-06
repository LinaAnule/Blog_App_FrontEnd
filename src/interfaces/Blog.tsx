import {User} from "./User";
import {Comment} from "./Comment";


export interface Blog {
    id: number;
    content: string;
    blogDate: Date;
    userId: number;
    username: string;
    title: string;

}