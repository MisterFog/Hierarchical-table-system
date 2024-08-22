import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Category, NestedSubCategory, SubCategory } from '../models/category';
import categoryStore from '../stores/categoryStore';
import ExportButtons from './ExportButtons';

type Item = SubCategory | Category | NestedSubCategory;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td
      {...restProps}
      onClick={(e) => {
        if (editing) {
          e.stopPropagation();
        }
      }}
    >
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface CrudTableProps {
  columns: ColumnsType<Category>;
  dataSource: Item[];
  setDataSource: React.Dispatch<React.SetStateAction<Item[]>>;
  loading: boolean;
  onCategoryClick?: (category: Item) => void;
  itemType: 'category' | 'subCategory' | 'nestedSubCategory';
}

const CrudTable: React.FC<CrudTableProps> = observer(
  ({ columns, dataSource, setDataSource, loading, onCategoryClick, itemType }) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<number | null>(null);
    const { categories } = categoryStore;
    const { categoryId, subCategoryId } = useParams<{
      categoryId?: string;
      subCategoryId?: string;
    }>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const isEditing = (record: Item) => record.id === editingKey;

    const edit = (record: Partial<Item> & { id: React.Key }) => {
      form.setFieldsValue({ name: '', ...record });
      setEditingKey(record.id);
    };

    const cancel = () => {
      setEditingKey(null);
    };

    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;

        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.id);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setDataSource(newData);
          setEditingKey(null);
        } else {
          newData.push(row);
          setDataSource(newData);
          setEditingKey(null);
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const defaultColumns = [
      ...columns.map((item) => ({
        ...item,
        editable: true,
      })),
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, record: Item) => {
          const editable = isEditing(record);

          return editable ? (
            <span>
              <Typography.Link
                onClick={(e) => {
                  e.stopPropagation();
                  save(record.id);
                }}
                style={{ marginRight: 8 }}
              >
                Save
              </Typography.Link>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  cancel();
                }}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Typography.Link
                disabled={editingKey !== null}
                onClick={(e) => {
                  e.stopPropagation();
                  edit(record);
                }}
              >
                Edit
              </Typography.Link>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDelete(record.id);
                }}
              >
                <a style={{ marginLeft: 8 }}>Delete</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const mergedColumns = defaultColumns.map((col) => {
      if ('editable' in col && col.editable && 'dataIndex' in col) {
        return {
          ...col,
          onCell: (record: Item) => ({
            record,
            inputType: col.dataIndex === 'id' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title:
              typeof col.title === 'function' ? String(col.title({} as any)) : String(col.title),
            editing: isEditing(record),
          }),
        };
      }

      return col;
    });

    const handleDelete = (id: number) => {
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
    };

    const handleAdd = () => {
      let newItem: Category | SubCategory | NestedSubCategory;

      switch (itemType) {
        case 'category': {
          const newId = dataSource.length ? Math.max(...dataSource.map((item) => item.id)) + 1 : 1;

          newItem = {
            id: newId,
            name: `New Category ${dataSource.length + 1}`,
            description: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Category;

          setDataSource([...dataSource, newItem]);
          break;
        }

        case 'subCategory': {
          const selectedCategory = categories.find(
            (item) => item.id === Number(categoryId)
          ) as Category;

          if (selectedCategory) {
            const newId = selectedCategory.subCategories?.length
              ? Math.max(...selectedCategory.subCategories.map((item) => item.id)) + 1
              : 1;

            newItem = {
              id: newId,
              name: `New Sub-Category ${(selectedCategory.subCategories ?? []).length + 1}`,
              description: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              nestedSubCategories: [],
            } as SubCategory;

            const updatedCategory = {
              ...selectedCategory,
              subCategories: [...(selectedCategory.subCategories ?? []), newItem],
            };

            setDataSource(updatedCategory.subCategories);
          }

          break;
        }

        case 'nestedSubCategory': {
          const selectedCategory = categories.find(
            (item) => item.id === Number(categoryId)
          ) as Category;

          const subCategory = selectedCategory?.subCategories?.find(
            (sub) => sub.id === Number(subCategoryId)
          ) as SubCategory;

          if (subCategory) {
            const newId = subCategory.nestedSubCategories?.length
              ? Math.max(...subCategory.nestedSubCategories.map((item) => item.id)) + 1
              : 1;

            newItem = {
              id: newId,
              name: `New Nested Sub-Category ${(subCategory.nestedSubCategories ?? []).length + 1}`,
              description: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as NestedSubCategory;

            const updatedSubCategory = {
              ...subCategory,
              nestedSubCategories: [...(subCategory.nestedSubCategories ?? []), newItem],
            };

            setDataSource(updatedSubCategory.nestedSubCategories);
          }

          break;
        }

        default:
          throw new Error('Invalid item type');
      }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
      setCurrentPage(pagination.current ?? 1);
      setPageSize(pagination.pageSize ?? 10);
    };

    const paginatedCategories = dataSource.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button>
          <ExportButtons categories={categories} />
        </div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            scroll={{ y: 600 }}
            loading={loading}
            dataSource={paginatedCategories}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              current: currentPage,
              pageSize,
              total: dataSource.length,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
            onRow={(record) => ({
              onClick: () => onCategoryClick && onCategoryClick(record),
            })}
          />
        </Form>
      </div>
    );
  }
);

export default CrudTable;
