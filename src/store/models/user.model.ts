export interface User{
    id: string;
    name : string;
    mobile: number;
    password?: string;
    status?: string;
    toggle?: boolean;
    lon?: number;
    lat?: number; 
    friends?: Array<string>;
}