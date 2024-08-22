import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const NavigationBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems = [
    { title: <Link to="/">Categories</Link>, key: 'home' },
    ...(pathnames.length > 1
      ? [
          {
            title: <Link to={`/sub-category/${pathnames[1]}`}>Sub-categories</Link>,
            key: 'sub-category',
          },
        ]
      : []),
    ...(pathnames.length > 2
      ? [
          {
            title: (
              <Link to={`/nested-sub-category/${pathnames[1]}/${pathnames[2]}`}>
                Nested-subcategories
              </Link>
            ),
            key: 'nested-sub-category',
          },
        ]
      : []),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
};

export default NavigationBreadcrumb;
