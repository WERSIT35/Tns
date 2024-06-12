export interface Home {
    categorys:string[],
    items:Item[],
}
export interface Item {
    id:number;
    name: string;
    price: number |null;
    description: string;
    image:string;
    code:string;
    category:string;

    volt:number;
    watt:number;
    width:number;
    length:number;
    diameter:number;
}