import { CATEGORIES, Category } from './types';

export type CategoryIconKey =
  | 'oven'
  | 'toaster'
  | 'grill'
  | 'thermostat'
  | 'coffee'
  | 'industrial'
  | 'water-heater'
  | 'washing-machine'
  | 'ventilation'
  | 'fallback';

const KEY_BY_CATEGORY: Record<Category, Exclude<CategoryIconKey, 'fallback'>> = {
  'ღუმელის ტენები': 'oven',
  'ტოსტერის ტენები': 'toaster',
  'გრილის ტენები': 'grill',
  'თერმოსტატები': 'thermostat',
  'ყავის აპარატის ტენები': 'coffee',
  'სამრეწველო ტენები': 'industrial',
  'წყლის გამაცხელებელი ტენები': 'water-heater',
  'სარეცხი მანქანის ტენები': 'washing-machine',
  'ვენტილაციის ტენები': 'ventilation',
};

export function normalizeCategoryName(s: string): string {
  return (s ?? '').trim().replace(/\s+/g, ' ');
}

export function getCategoryIconKey(category: string): CategoryIconKey {
  if (!category) return 'fallback';
  const normalized = normalizeCategoryName(category) as Category;
  return KEY_BY_CATEGORY[normalized] ?? 'fallback';
}

/** Runtime guard used by tests: every CATEGORIES entry has a real icon (not 'fallback'). */
export function allCategoriesHaveIcons(): boolean {
  for (const c of CATEGORIES) {
    if (getCategoryIconKey(c) === 'fallback') return false;
  }
  return true;
}
