import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserList from './pages/UserList';
import UserFormPage from './pages/UserFormPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserFormPage />} />
          <Route path="/edit/:id" element={<UserFormPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
