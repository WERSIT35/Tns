import {
  allCategoriesHaveIcons,
  CategoryIconKey,
  getCategoryIconKey,
  normalizeCategoryName,
} from './category-icons';
import { CATEGORIES } from './types';

const REQUIRED_CATEGORIES = [
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

const EXPECTED_KEYS: Record<(typeof REQUIRED_CATEGORIES)[number], CategoryIconKey> = {
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

describe('category-icons mapping', () => {
  it('has all 9 Georgian categories', () => {
    expect(REQUIRED_CATEGORIES.length).toBe(9);
  });

  for (const cat of REQUIRED_CATEGORIES) {
    it(`maps "${cat}" to expected key "${EXPECTED_KEYS[cat]}"`, () => {
      expect(getCategoryIconKey(cat)).toBe(EXPECTED_KEYS[cat]);
    });
  }

  it('produces 9 unique non-fallback keys', () => {
    const keys = new Set(REQUIRED_CATEGORIES.map((c) => getCategoryIconKey(c)));
    expect(keys.size).toBe(9);
    expect(keys.has('fallback')).toBe(false);
  });

  it('returns "fallback" for unknown or empty input', () => {
    expect(getCategoryIconKey('not-a-real-category')).toBe('fallback');
    expect(getCategoryIconKey('')).toBe('fallback');
    expect(getCategoryIconKey(null as unknown as string)).toBe('fallback');
    expect(getCategoryIconKey(undefined as unknown as string)).toBe('fallback');
  });

  it('exposes a runtime guard confirming every CATEGORIES entry has an icon', () => {
    expect(allCategoriesHaveIcons()).toBe(true);
    for (const c of CATEGORIES) {
      expect(getCategoryIconKey(c))
        .withContext(`icon key for "${c}"`)
        .not.toBe('fallback');
    }
  });

  describe('normalizeCategoryName', () => {
    it('trims surrounding whitespace', () => {
      expect(normalizeCategoryName('  ღუმელის ტენები  ')).toBe('ღუმელის ტენები');
      expect(getCategoryIconKey('  ღუმელის ტენები  ')).toBe('oven');
    });

    it('collapses internal whitespace', () => {
      expect(normalizeCategoryName('ღუმელის   ტენები')).toBe('ღუმელის ტენები');
      expect(getCategoryIconKey('ღუმელის   ტენები')).toBe('oven');
    });

    it('handles tab/newline whitespace', () => {
      expect(getCategoryIconKey('\tთერმოსტატები\n')).toBe('thermostat');
    });

    it('handles null/undefined input without throwing', () => {
      expect(normalizeCategoryName(null as unknown as string)).toBe('');
      expect(normalizeCategoryName(undefined as unknown as string)).toBe('');
    });
  });
});
