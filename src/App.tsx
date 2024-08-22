import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import categoryStore from './stores/categoryStore';
import Router from './Router';
import './App.css';

function App() {
  useEffect(() => {
    categoryStore.loadCategories();
  }, []);

  if (categoryStore.loading) {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
