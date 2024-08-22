import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { NavigationBreadcrumb, SubCategoryTable } from '../../components';
import categoryStore from '../../stores/categoryStore';
import { SubCategory } from '../../models/category';

const SubCategoryPage: React.FC = observer(() => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      categoryStore.loadCategories();
    }
  }, [categoryId]);

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    if (categoryId) {
      navigate(`/nested-sub-category/${categoryId}/${subCategory.id}`);
    }
  };

  return (
    <div className="content">
      <NavigationBreadcrumb />
      {categoryId && (
        <SubCategoryTable
          categoryId={parseInt(categoryId, 10)}
          onSubCategoryClick={handleSubCategoryClick}
        />
      )}
    </div>
  );
});

export default SubCategoryPage;
