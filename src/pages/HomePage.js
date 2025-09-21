import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! Navigate to users to see Redux in action.</p>
      <Link to="/users">Go to Users Page</Link>
    </div>
  )
}

export default HomePage