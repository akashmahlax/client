import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '' }); // Clear form
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItem = async (id, updatedFields) => {
    try {
      const response = await axios.put(`http://localhost:5000/items/${id}`, updatedFields);
      setItems(items.map(item => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}: {item.description}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            <button onClick={() => handleUpdateItem(item._id, { name: 'New Name', description: 'New Description' })}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h2>Add a New Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={handleCreateItem}>Add Item</button>
    </div>
  );
}

export default App;