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
  // -----------------------------state for handling Error creating User
  const [errorNewUser, setErrorNewUser] = useState("");
  

  //------------------------ Function to create new user
  const createUser = async (e) => {
    e.preventDefault();
    //set errorNewUser to remove previous errors if they exist
    setErrorNewUser("");
    try {
      const res = await fetch('/backend/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      // if res.ok is falsy, then this will catch the error sent from the usercontroller in the backend and pass it
      if(!res.ok) {
        const errorCaught = await res.json();
        console.log("Error caught:", errorCaught);
        throw new Error(errorCaught.message || "unknown error");
      //Otherwise, it will go as normal
      } else {
        const data = await res.json();
        console.log(data);
        setLogin(() => [...login, data.log]);
      }

    } catch (error) {
      console.error('Issue creating User', error)
      setErrorNewUser(error.message)
    }
  };

  //-------------------------- Function to handle inputs for creating user
  const updateNewUserField = (e) => {
    const { value, name } = e.target;
    // console.log({ name, value });

    setNewUser(() => ({
      ...newUser,
      [name]: value,
    }));
    console.log('Form Cleared')
  };

  return (
    <div className="App">
      <NavBar/>
      <Outlet context={{ updateNewUserField, newUser, createUser, errorNewUser }} />

    </div>
  )
}

export default App
