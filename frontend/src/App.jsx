import { useState } from 'react'
import './style.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';

function App() {
  //---------------------State for checking if user is logged in
  const [login, setLogin] = useState([])

  //----------------------State for creating a new user
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  //------------------------ Function to create new user
  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/backend/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    console.log(data);
    setLogin(() => [...login, data.log]);
  };

  //-------------------------- Function to handle inputs for creating user
  const updateNewUserField = (e) => {
    const { value, name } = e.target;
    console.log({ name, value });

    setNewUser(() => ({
      ...newUser,
      [name]: value,
    }));
    console.log('Form Cleared')
  };

  return (
    <div className="App">
      <NavBar/>
      <Outlet context={{ updateNewUserField, newUser, createUser }} />

    </div>
  )
}

export default App
