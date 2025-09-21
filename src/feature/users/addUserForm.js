import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, addUser } from './userSlice';

export default function AddUserForm(){
    const { form, addLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
  
    const handleChange = (e) => {
      dispatch(updateForm({ field: e.target.name, value: e.target.value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name || !form.email) return;
      dispatch(addUser(form));
    };

    return (
        <form onSubmit={handleSubmit}>
        <h3>Add User</h3>
        {error && <div style={{color: 'red', marginBottom: '10px'}}>
          Error: {error.message || 'Something went wrong'}
        </div>}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit" disabled={addLoading}>
          {addLoading ? 'Saving...' : 'Add'}
        </button>
      </form>
  
    )
  
}