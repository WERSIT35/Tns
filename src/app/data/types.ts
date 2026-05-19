export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  volt: number;
  watt: number;
  width: number;
  length: number;
  diameter: number;
}

export interface DisplayProduct extends Product {
  imageWebp: string;
}

export const CATEGORIES = [
  'ღუმელის ტენები',
  'ტოსტერის ტენები',
  'გრილის ტენები',
  'თერმოსტატები',
  'ყავის აპარატის ტენები',
  'სამრეწველო ტენები',
  'წყლის გამაცხელებელი ტენები',
  'სარეცხი მანქანის ტენები',
  'ვენტილაციის ტენები',
] as const;

export type Category = (typeof CATEGORIES)[number];

export function toDisplay(p: Product): DisplayProduct {
  return {
    ...p,
    imageWebp: p.image.replace(/\.(jpe?g|png)$/i, '.webp'),
  };
}
