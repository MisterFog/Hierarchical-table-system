import { mockCategories } from '../utils/mockData';
import { Category } from '../models/category';

export const fetchCategories = (): Promise<Category[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 1000);
  });
