import React from 'react'
import AddUserForm from '../feature/users/addUserForm'
import UserList from '../feature/users/userList'

const UserPage = () => {
  return (
    <div>
      <h1>Users Page</h1>
      <AddUserForm />
      <UserList />
    </div>
  )
}

export default UserPage