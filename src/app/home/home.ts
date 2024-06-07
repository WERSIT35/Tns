export interface Home {
    categorys:string[],
    items:Item[],
}
export interface Item {
    id:number;
    name: string;
    price: number;
    description: string;
    image:string;
    code:string;
    category:string;
}