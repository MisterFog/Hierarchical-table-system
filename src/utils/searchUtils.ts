import { Category, SubCategory, NestedSubCategory } from '../models/category';

const searchInNestedSubCategories = (
  nestedSubCategories: NestedSubCategory[],
  query: string
): NestedSubCategory[] =>
  nestedSubCategories.filter((nested) => nested.name.toLowerCase().includes(query.toLowerCase()));

const searchInSubCategories = (subCategories: SubCategory[], query: string): SubCategory[] =>
  subCategories.reduce((results: SubCategory[], subCategory) => {
    const matchedNestedSubCategories = subCategory.nestedSubCategories
      ? searchInNestedSubCategories(subCategory.nestedSubCategories, query)
      : [];

    if (
      subCategory.name.toLowerCase().includes(query.toLowerCase()) ||
      matchedNestedSubCategories.length > 0
    ) {
      results.push({
        ...subCategory,
        nestedSubCategories:
          matchedNestedSubCategories.length > 0
            ? matchedNestedSubCategories
            : subCategory.nestedSubCategories,
      });
    }

    return results;
  }, []);

export const searchCategories = (categories: Category[], query: string): Promise<Category[]> =>
  new Promise((resolve) => {
    const lowercasedQuery = query.toLowerCase();

    const filteredCategories = categories.reduce((results: Category[], category) => {
      const matchedSubCategories = searchInSubCategories(
        category.subCategories || [],
        lowercasedQuery
      );

      if (
        category.name.toLowerCase().includes(lowercasedQuery) ||
        matchedSubCategories.length > 0
      ) {
        results.push({
          ...category,
          subCategories:
            matchedSubCategories.length > 0 ? matchedSubCategories : category.subCategories,
        });
      }

      return results;
    }, []);

    resolve(filteredCategories);
  });
