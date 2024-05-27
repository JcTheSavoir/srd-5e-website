//----------------------------------------------------Login/Signup page
//------------------------------------Import to use the outlet context value
import { useOutletContext } from 'react-router-dom'
//------------------------------------Import to use Link for page navigation
import { Link } from 'react-router-dom'

const Login = () => {

  //setting the variables passed to Outlet
  const {updateNewUserField, newUser, createUser, errorNewUser, login, logout} = useOutletContext();

  return (

    // ---------------------------parent container for login and signup forms
    <div className="loginComponentContainer">

    {/* ----------------------Conditional rendering based on if a user is logged in or not. */}
      {login ? (
        <div className="loggedInOptionsContainer">
          <h2 className='loggedInTitle'> Here are your special logged in Controls <em>{login.username.toUpperCase()}</em></h2>
          {/* ----------------Allow users to logout */}
          <button className="loggedInLogoutBtn" onClick={logout}>Logout</button>

          {/* -----------------Link only accessible to users who have logged in */}
          <Link to='/create' style={{ textDecoration: 'none', color: 'white', fontSize: 'xx-large'}}>Create Something New</Link>
        </div>
      ) : ( 
        <>
          {/* ------------------------------Parent container for login Form */}
          <div className="loginContainer">

            <form className="loginForm" action="">
              <label htmlFor="" className="labelNameEmailLogin">Enter Username or Email</label>
              <input maxLength='35' type="text" className="inputNameEmailLogin" />
              <label htmlFor="" className="labelPasswordLogin">Enter</label>
              <input maxLength='20' type="text" className="inputPasswordLogin" />
            </form>

          </div>
          {/* ------------------------------------If there is an error creating the new user */}
          {errorNewUser && <div className="errorSignup">{errorNewUser}</div>}

          {/* -----------------------------Parent Container for Signup Form */}
          <div className="signupContainer">
            <form className="signupForm" onSubmit={createUser} >
              <label htmlFor="" className="labelEmailSignup">Enter Email</label>
              <input onChange={updateNewUserField} name="email" value={newUser.email} maxLength='35' type="text" className="inputEmailSignup" />
              <label htmlFor="" className="labelUsernameSignup">Enter Username</label>
              <input onChange={updateNewUserField} name="username" value={newUser.username} maxLength='15' type="text" className="inputUsernameSignup" />
              <label htmlFor="" className="labelPasswordSignup">Enter Password</label>
              <input onChange={updateNewUserField} name="password" value={newUser.password} maxLength='20' type="password" className="inputPasswordSignup" />
              <button type="submit">Create Account</button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
export default Login