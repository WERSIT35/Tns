import { CATEGORIES } from './types';

const CATEGORY_EN = [
  'Oven Elements',
  'Toaster Elements',
  'Grill Elements',
  'Thermostats',
  'Coffee Machine Elements',
  'Industrial Elements',
  'Water Heater Elements',
  'Washing Machine Elements',
  'Ventilation Elements',
] as const;

const PRODUCT_NAME_EN = [
  'Oven Heating Element',
  'Toaster Heating Element',
  'Grill Heating Element',
  'Thermostat',
  'Coffee Machine Heating Element',
  'Industrial Heating Element',
  'Water Heater Element',
  'Washing Machine Element',
  'Ventilation Heating Element',
] as const;

export function categoryToEn(category: string): string {
  const idx = CATEGORIES.indexOf(category as (typeof CATEGORIES)[number]);
  return idx >= 0 ? CATEGORY_EN[idx] : category;
}

export function productNameToEn(category: string, fallbackName: string): string {
  const idx = CATEGORIES.indexOf(category as (typeof CATEGORIES)[number]);
  return idx >= 0 ? PRODUCT_NAME_EN[idx] : fallbackName;
}

