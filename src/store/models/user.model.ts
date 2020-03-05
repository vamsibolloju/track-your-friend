interface Address{
    Label: string;
    Country: string;
    State: string;
}

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
    trackMode?: string;
    addressMode?: string;
    address?: Address;
    lastUpdated?: number
}