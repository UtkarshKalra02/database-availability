import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    items: '',
    quantity: '',
    price: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/addUser', formData)
      .then(() => {
        setFormData({ name: '', items: '', quantity: '', price: '' });
        axios.get('http://localhost:8080/getUsers')
          .then(response => {
            setUsers(response.data);
            setFilteredUsers(response.data);
            setSearchQuery('');
            setSearchPerformed(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
    if (searchQuery === '') {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter(user =>
        user.items && user.items.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className='container'>
      <div className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
        <div className='w-50 mb-4'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name of Product</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='items'>Items</label>
              <input
                type='text'
                className='form-control'
                id='items'
                name='items'
                value={formData.items}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='text'
                className='form-control'
                id='quantity'
                name='quantity'
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                type='text'
                className='form-control'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary mt-3'>Add User</button>
          </form>
        </div>
        <div className='w-50 mb-4'>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              className='form-control mb-2'
              placeholder='Search by Items'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type='submit' className='btn btn-primary'>Search</button>
          </form>
        </div>
        <div className='w-50'>
          {searchPerformed && filteredUsers.length === 0 ? (
            <p>Item not available</p>
          ) : (
            searchPerformed && (
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name of Product</th>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.items}</td>
                        <td>{user.quantity}</td>
                        <td>{user.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
