import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { NavigationBreadcrumb, NestedSubCategoryTable } from '../../components';

const NestedSubCategoryPage: React.FC = observer(() => {
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string | undefined;
    subCategoryId: string | undefined;
  }>();

  if (!categoryId || !subCategoryId) {
    return <div>Invalid parameters</div>;
  }

  return (
    <div className="content">
      <NavigationBreadcrumb />
      <NestedSubCategoryTable
        categoryId={parseInt(categoryId, 10)}
        subCategoryId={parseInt(subCategoryId, 10)}
      />
    </div>
  );
});

export default NestedSubCategoryPage;
