import { Category } from '../models/category';
import { mockCategories } from '../utils/mockData';

export const fetchCategories = (): Promise<Category[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 1000);
  });
