import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Spin, Button } from 'antd';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import categoryStore from '../stores/categoryStore';
import { searchCategories } from '../utils/searchUtils';

const Search: React.FC = observer(() => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('query') || '';
    setQuery(searchQuery);
  }, [location.search]);

  const handleSearch = async () => {
    if (query.trim()) {
      setLoading(true);
      navigate(`?query=${encodeURIComponent(query)}`);

      const filteredResults = await searchCategories(categoryStore.categories, query);
      categoryStore.setCategories(filteredResults);
      setLoading(false);
    } else {
      categoryStore.loadCategories();
      navigate('?');
    }
  };

  const clearSearch = () => {
    setQuery('');
    categoryStore.loadCategories();
    navigate('?');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        suffix={loading ? <Spin size="small" /> : null}
        style={{ width: 'calc(100% - 88px)', marginRight: '8px' }}
      />
      <Button
        icon={<SearchOutlined />}
        onClick={handleSearch}
        disabled={!query}
        style={{ marginRight: '8px' }}
      >
        Search
      </Button>
      <Button icon={<CloseCircleOutlined />} onClick={clearSearch} disabled={!query} />
    </div>
  );
});

export default Search;
