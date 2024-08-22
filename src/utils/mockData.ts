import { format } from 'date-fns';
import { Category } from '../models/category';

export const mockCategories: Category[] = [];
const formatDate = (date: Date): string => format(date, 'dd-MM-yyyy');
const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateCategories = () => {
  for (let i = 1; i <= 500; i++) {
    const subCategories = [];

    for (let j = 1; j <= getRandomNumberInRange(10, 30); j++) {
      const nestedSubCategories = [];

      for (let k = 1; k <= getRandomNumberInRange(10, 20); k++) {
        nestedSubCategories.push({
          id: parseInt(`${i}${j}${k}`, 10),
          name: `Nested Sub-category ${i}-${j}-${k}`,
          description: `Description for Nested Sub-category ${i}-${j}-${k}`,
          createdAt: formatDate(new Date()),
          updatedAt: formatDate(new Date()),
        });
      }

      subCategories.push({
        id: parseInt(`${i}${j}`, 10),
        name: `Sub-category ${i}-${j}`,
        description: `Description for Sub-category ${i}-${j}`,
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        nestedSubCategories: nestedSubCategories.length > 0 ? nestedSubCategories : undefined,
      });
    }

    mockCategories.push({
      id: i,
      name: `Category ${i}`,
      description: `Description for Category ${i}`,
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
      subCategories,
    });
  }
};

generateCategories();
