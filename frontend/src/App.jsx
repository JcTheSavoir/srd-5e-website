import { useState, useEffect } from 'react'
import './style.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  //----------------------------------------------------------------------------HOOKS
  // ------------State for checking if user is logged in
  const [login, setLogin] = useState(null);
  // ------------State for loading (prevents navigation to login page during a refresh of the website, as
  // during that brief moment, login state would temporarily be null, which would force navigation to 
  // the login page per the RouteSecurity component)
  const [loading, setLoading] = useState(true);
  // ------------State for creating a new user
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  // --------------state for logging in current user
  const [currentUser, setCurrentUser] = useState ({
    emailOrUsername: '',
    password: '',
  });
  // ------------state for handling Error creating User
  const [errorNewUser, setErrorNewUser] = useState("");
  // --------------state for handling Errors logging in User
  const [errorCurrentUser, setErrorCurrentUser] = useState('');

  // -----------Keep user logged in even if page is reloaded
  useEffect(() => {
    //Check authentication from backend, verify login
    const loginStatus = async () => {
      try {
        //fetching the authentication from backend route
        const res = await fetch('/backend/check-auth', {
          method: 'GET',
          credentials: 'include'
        });
        // if fetch is valid, this will set login to the user
        if (res.ok) {
          const data = await res.json();
          setLogin(data.user);
        // if response code is 401, it means either user or token were false in the backend
        // an error is still sent to the console, but this is expected behavior 
        } else if (res.status === 401) {
          console.log("No valid user or token")
          setLogin(null);
        // else, login is set to null
        } else {
          setLogin(null);
        };
      // If server error, still set login to null
      } catch (error) {
        console.error('Unable to fetch login status', error);
        setLogin(null);
      // "Finally" will load after the try catch has finished. This will help handle issue of 
      // user being redirected while the token is still being processed
      } finally {
        // set loading to false once try catch has finished (defaults to true, so no need to change it back each time)
        setLoading(false);
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
        setLogin(data.user);
      }

    } catch (error) {
      console.error('Issue creating User', error);
      setErrorNewUser(error.message);
    };
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
        // console.log("Error caught:", errorCaught);
        throw new Error(errorCaught.message || "unknown error");
      //Otherwise, it will go as normal
      } else {
        const data = await res.json();
        setLogin(data.user);
      }
    } catch (error) {
      console.error('Issue logging in User', error);
      setErrorCurrentUser(error.message);
    };
  };

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
  const logout = async () => {
    try {
      //Call upon the logout route in the backend 
      const res = await fetch('/backend/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // check if response is valid (Response code is set in backend, res.ok is valid if the 
      // status code received is 200-299).
      if (res.ok) {
        //If it is valid, then cookie should be cleared, so login state will be set to null
        setLogin(null);
      } else {
        // If the response code sent is outside of 200-299, res.ok 
        //will be set to false, and the else statement  is activated
        console.error('Logout Failed');
      };
      // IF the fetch fails it will give an error, and the catch block will activate
    } catch (error) {
      console.error('Logout Failed', error);
    };
  };

  return (
    <div className="App">
      <NavBar/>
      <Outlet context={{ updateNewUserField, updateCurrentUserField, newUser, currentUser, loginUser, createUser, errorNewUser, errorCurrentUser, login, logout, loading}} />
      <Footer/>
    </div>
  );
};

export default App;
