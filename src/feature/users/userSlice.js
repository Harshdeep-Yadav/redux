import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const addUser = createAsyncThunk(
    'users/addUser',
    async (user) => {
        try {
            const response = await api.post('/users', user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        try {
            await api.delete(`/users/${userId}`);
            return userId;
        } catch (error) {
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list :[],
        form:{name: '', email: '', phone: ''},
        loading: false,
        fetchLoading: false,
        addLoading: false,
        deleteLoading: false,
        deletingUserId: null,
        error: null,
    },
    reducers:{
        updateForm: (state, action) => {
            console.log(state,action,"updateForm");
            const {field, value} = action.payload;
            state.form[field] = value;
        },
        resetForm: (state) => {
            state.form = {name: '', email: '', phone: ''};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.fetchLoading = true;
            state.error = null;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.list = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.fetchLoading = false;
            state.error = action.payload;
          })
          // Add
          .addCase(addUser.pending, (state) => {
            state.addLoading = true;
            state.error = null;
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.addLoading = false;
            state.list.push(action.payload);
            state.form = { name: '', email: '', phone: '' }; // reset after add
          })
          .addCase(addUser.rejected, (state, action) => {
            state.addLoading = false;
            state.error = action.payload;
          })
          // Delete
          .addCase(deleteUser.pending, (state, action) => {
            state.deleteLoading = true;
            state.deletingUserId = action.meta.arg; // Store the user ID being deleted
            state.error = null;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.deleteLoading = false;
            state.deletingUserId = null; // Clear the deleting user ID
            state.list = state.list.filter(user => user.id !== action.payload);
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.deleteLoading = false;
            state.deletingUserId = null; // Clear the deleting user ID
            state.error = action.payload;
          });
    }

})

export const { updateForm, resetForm } = userSlice.actions;
export default userSlice.reducer;