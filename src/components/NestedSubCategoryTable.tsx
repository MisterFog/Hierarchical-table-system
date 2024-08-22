import React from 'react';
import { observer } from 'mobx-react-lite';
import categoryStore from '../stores/categoryStore';
import CrudTable from './CrudTable';

interface NestedSubCategoryTableProps {
  categoryId: number;
  subCategoryId: number;
}

const NestedSubCategoryTable: React.FC<NestedSubCategoryTableProps> = observer(
  ({ categoryId, subCategoryId }) => {
    const category = categoryStore.categories.find((cat) => cat.id === categoryId);
    const subCategory = category?.subCategories?.find((sub) => sub.id === subCategoryId);
    const nestedSubCategories = subCategory?.nestedSubCategories || [];

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    ];

    const handleDataSourceChange = (newData: any) => {
      categoryStore.setNestedSubCategories(categoryId, subCategoryId, newData);
    };

    return (
      <CrudTable
        columns={columns}
        dataSource={nestedSubCategories}
        setDataSource={handleDataSourceChange}
        loading={categoryStore.loading}
        itemType="nestedSubCategory"
      />
    );
  }
);

export default NestedSubCategoryTable;
