import { useState, useEffect } from 'react'
import './style.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';

function App() {
  //------------------------------------------------------------HOOKS
  // State for checking if user is logged in
  const [login, setLogin] = useState(null)

  // State for creating a new user
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  // state for logging in current user
  const [currentUser, setCurrentUser] = useState ({
    emailOrUsername: '',
    password: '',
  });
  // state for handling Error creating User
  const [errorNewUser, setErrorNewUser] = useState("");
  // state for handling Errors logging in User
  const [errorCurrentUser, setErrorCurrentUser] = useState('');

  // Keep user logged in even if page is reloaded
  useEffect(() => {
    //Check authentication from backend, verify login
    const loginStatus = async () => {
      try {
        //fetching the authentication from backend route
        console.log("Try went off in UseEffect")
        const res = await fetch('/backend/check-auth', {
          method: 'GET',
          credentials: 'include'
        });
        console.log("log of res variable", res)
        console.log("log of res.ok", res.ok)
        // if fetch is valid, this will set login to the user
        if (res.ok) {
          console.log("if statement in use Effect went off")
          const data = await res.json();
          console.log('log of data variable', data)
          setLogin(data.user)
        // else, login is set to null
        } else {
          console.log("else statement in useeffect went off")
          setLogin(null);
        };
      // If server error, still set login to null
      } catch (error) {
        console.log("Catch statement in useEffect went off")
        console.log('log of the error', error)
        console.error('Unable to fetch login status', error)
        setLogin(null)
      };
    };
    //initialize the function
    loginStatus();
  // empty array so it only runs once
  }, []);


  //------------------------------------------------------FUNCTIONS
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

      // if res.ok is falsy, then this will catch the error sent 
      // from the usercontroller in the backend and pass it to the frontend
      if(!res.ok) {
        const errorCaught = await res.json();
        console.log("Error caught:", errorCaught);
        throw new Error(errorCaught.message || "unknown error");
      //Otherwise, it will go as normal
      } else {
        const data = await res.json();
        // console.log(data);
        console.log(data.user);
        setLogin(data.user);
      }

    } catch (error) {
      console.error('Issue creating User', error)
      setErrorNewUser(error.message)
    }
  };
  //--------------------------Function to handle login form being submitted
  const loginUser = async (e) => {
    e.preventDefault();
    //set errorCurrentUser to remove previous errors if they exist
    setErrorCurrentUser("");
    try {
      const res = await fetch('/backend/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
        // For use in keeping user logged in via cookies
        credentials: 'include',
      });
      // if res.ok is falsy, then this will catch the error sent
      // from the usercontroller in the backend and pass it to the frontend
      if(!res.ok) {
        const errorCaught = await res.json();
        console.log("Error caught:", errorCaught);
        throw new Error(errorCaught.message || "unknown error");
      //Otherwise, it will go as normal
      } else {
        const data = await res.json();
        // console.log(data);
        // console.log(data.user);
        setLogin(data.user);
      }
    } catch (error) {
      console.error('Issue logging in User', error)
      setErrorCurrentUser(error.message)
    }
  }

  //-------------------------- Function to handle inputs for creating user
  const updateNewUserField = (e) => {
    const { value, name } = e.target;
    // console.log({ name, value });

    setNewUser(() => ({
      ...newUser,
      [name]: value,
    }));
    // console.log('Form Cleared')
  };
  // -------------------------Function to handle inputs for logging in current user
  const updateCurrentUserField = (e) => {
    const {value, name } = e.target;

    setCurrentUser(() => ({
      ...currentUser,
      [name]: value,
    }));
  };
  // -------------------------Function to handle logout to clear the "login" state
  const logout = () => {
    setLogin(null);
  };

  return (
    <div className="App">
      <NavBar/>
      <Outlet context={{ updateNewUserField, updateCurrentUserField, newUser, currentUser, loginUser, createUser, errorNewUser, errorCurrentUser, login, logout}} />

    </div>
  );
};

export default App
