import React from 'react';
import { observer } from 'mobx-react-lite';
import type { ColumnsType } from 'antd/es/table';
import { SubCategory } from '../models/category';
import categoryStore from '../stores/categoryStore';
import { getColumnSearchProps } from '../utils/ColumnSearch';
import CrudTable from './CrudTable';

interface SubCategoryTableProps {
  categoryId: number;
  onSubCategoryClick: (subCategory: SubCategory) => void;
}

const SubCategoryTable: React.FC<SubCategoryTableProps> = observer(
  ({ categoryId, onSubCategoryClick }) => {
    const category = categoryStore.categories.find((cat) => cat.id === categoryId);
    const subCategories = category?.subCategories || [];

    const columns: ColumnsType<SubCategory> = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...getColumnSearchProps('description'),
      },
      { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    ];

    const handleDataSourceChange = (newData: any) => {
      categoryStore.setSubCategories(categoryId, newData);
    };

    return (
      <CrudTable
        columns={columns}
        dataSource={subCategories}
        setDataSource={handleDataSourceChange}
        loading={categoryStore.loading}
        onCategoryClick={onSubCategoryClick}
        itemType="subCategory"
      />
    );
  }
);

export default SubCategoryTable;
