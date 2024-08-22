import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCategories } from '../services/api';
import { Category, NestedSubCategory, SubCategory } from '../models/category';

class CategoryStore {
  public categories: Category[] = [];

  public loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  public loadCategories = async () => {
    this.setLoading(true);

    const fetchedCategories = await fetchCategories();
    runInAction(() => {
      this.categories = fetchedCategories;
      this.setLoading(false);
    });
  };

  public addCategory = (newCategory: Category) => {
    runInAction(() => {
      this.categories.push(newCategory);
    });
  };

  public updateCategory = (updatedCategory: Category) => {
    runInAction(() => {
      const index = this.categories.findIndex((cat) => cat.id === updatedCategory.id);

      if (index !== -1) {
        this.categories[index] = updatedCategory;
      }
    });
  };

  public deleteCategory = (id: number) => {
    runInAction(() => {
      this.categories = this.categories.filter((cat) => cat.id !== id);
    });
  };

  public setCategories = (categories: Category[]) => {
    runInAction(() => {
      this.categories = categories;
    });
  };

  public setSubCategories = (categoryId: number, subCategories: SubCategory[]) => {
    runInAction(() => {
      const category = this.categories.find((cat) => cat.id === categoryId);

      if (category) {
        category.subCategories = subCategories;
      }
    });
  };

  public setNestedSubCategories = (
    categoryId: number,
    subCategoryId: number,
    nestedSubCategories: NestedSubCategory[]
  ) => {
    runInAction(() => {
      const category = this.categories.find((cat) => cat.id === categoryId);
      const subCategory = category?.subCategories?.find((sub) => sub.id === subCategoryId);

      if (subCategory) {
        subCategory.nestedSubCategories = nestedSubCategories;
      }
    });
  };

  private setLoading(loading: boolean) {
    this.loading = loading;
  }
}

const categoryStore = new CategoryStore();
export default categoryStore;
