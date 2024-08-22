import React from 'react';
import { observer } from 'mobx-react-lite';
import type { ColumnsType } from 'antd/es/table';
import { Category } from '../models/category';
import categoryStore from '../stores/categoryStore';
import { getColumnSearchProps } from '../utils/ColumnSearch';
import CrudTable from './CrudTable';

interface CategoryTableProps {
  onCategoryClick: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = observer(({ onCategoryClick }) => {
  const { categories } = categoryStore;

  const columns: ColumnsType<Category> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
      sortDirections: ['descend', 'ascend'],
      filters: [
        { text: 'Category 1', value: 'Category 1' },
        { text: 'Category 10', value: 'Category 10' },
      ],
      onFilter: (value, record) => (record.name ?? '').includes(value as string),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => (a.description ?? '').localeCompare(b.description ?? ''),
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) =>
        new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime(),
      sortDirections: ['descend', 'ascend'],
      render: (text) => <span>{text ?? 'N/A'}</span>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: (a, b) =>
        new Date(a.updatedAt ?? '').getTime() - new Date(b.updatedAt ?? '').getTime(),
      sortDirections: ['descend', 'ascend'],
      render: (text) => <span>{text ?? 'N/A'}</span>,
    },
  ];

  return (
    <CrudTable
      columns={columns}
      dataSource={categories}
      setDataSource={(newData: any) => categoryStore.setCategories(newData)}
      loading={categoryStore.loading}
      onCategoryClick={onCategoryClick}
      itemType="category"
    />
  );
});

export default CategoryTable;
