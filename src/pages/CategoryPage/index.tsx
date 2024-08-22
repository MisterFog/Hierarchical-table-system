import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { CategoryTable, NavigationBreadcrumb } from '../../components';
import { Category } from '../../models/category';

const CategoryPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate(`/sub-category/${category.id}`);
  };

  return (
    <div className="content">
      <NavigationBreadcrumb />
      <CategoryTable onCategoryClick={handleCategoryClick} />
    </div>
  );
});

export default CategoryPage;
