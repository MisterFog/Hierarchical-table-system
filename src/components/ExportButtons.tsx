import React from 'react';
import { Button } from 'antd';
import { exportToExcel } from '../utils/exportUtils';
import { Category } from '../models/category';

interface ExportButtonsProps {
  categories: Category[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ categories }) => {
  const handleExportExcel = () => {
    exportToExcel(categories, 'categories.xlsx');
  };

  return (
    <Button type="primary" onClick={handleExportExcel}>
      Export to Excel
    </Button>
  );
};

export default ExportButtons;
