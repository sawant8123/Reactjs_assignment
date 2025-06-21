import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';


function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>View Items</Link>
        <Link to="/add">Add Item</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
