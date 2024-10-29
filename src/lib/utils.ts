import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generic type T represents any object type
export function removeDuplicatesByKey<T extends Record<string, any>>(array: T[], key: keyof T): T[] {
  return array.reduce((unique: T[], item: T) => {
      const exists = unique.find((obj: T) => obj[key] === item[key]);
      if (!exists) {
          unique.push(item);
      }
      return unique;
  }, []);
}
