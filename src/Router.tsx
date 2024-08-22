import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const SubCategoryPage = React.lazy(() => import('./pages/SubCategoryPage'));
const NestedSubCategoryPage = React.lazy(() => import('./pages/NestedSubCategoryPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const Router = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<CategoryPage />} />
      <Route path="/sub-category/:categoryId" element={<SubCategoryPage />} />
      <Route
        path="/nested-sub-category/:categoryId/:subCategoryId"
        element={<NestedSubCategoryPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default Router;
