import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteUser, fetchUsers} from './userSlice';

export default function UserList(){
    const {list, fetchLoading, deleteLoading, deletingUserId, error} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
            dispatch(deleteUser(userId));
        }
    };

    if (fetchLoading && list.length === 0) return <div>Loading...</div>;
    if (error) return <div style={{color: 'red'}}>Error: {error.message || error}</div>;

    return (
        <div>
                  <h2>Users</h2>
      <ul>
        {list.map((u) => (
          <li key={u.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <strong>{u.name}</strong> — {u.email}
            <button 
              onClick={() => handleDelete(u.id, u.name)}
              disabled={deletingUserId === u.id}
              style={{ 
                marginLeft: '10px', 
                backgroundColor: deletingUserId === u.id ? '#ccc' : '#ff4444', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px',
                cursor: deletingUserId === u.id ? 'not-allowed' : 'pointer'
              }}
            >
              {deletingUserId === u.id ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>

        </div>
    )
}


