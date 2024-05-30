//----------------------------------------------------Login/Signup page
//------------------------------------Import to use the outlet context value
import { useOutletContext } from 'react-router-dom'
//------------------------------------Import to use Link for page navigation
import { Link } from 'react-router-dom'

const Login = () => {

  //setting the variables passed to Outlet
  const {updateNewUserField, updateCurrentUserField, loginUser, newUser, currentUser, createUser, errorNewUser, errorCurrentUser, login, logout} = useOutletContext();

  return (

// ---------------------------parent container for login component
    <div className="loginComponentContainer">
{/* ----------------------Conditional rendering based on if a user is logged in or not. */}
      {login ? (
        <div className="loggedInOptionsContainer">
          <h1 className='loggedInTitle'> Here are your special logged in Controls <em>{login.username.toUpperCase()}</em></h1>
          <div className='loggedInLinks'>
            {/* -----------------Link only accessible to users who have logged in */}
            <Link to='/create' style={{ textDecoration: 'none', color: 'rgb(92, 6, 190)', backgroundColor: 'rgba(90, 0, 2, 0.9)', borderRadius: '30px',fontWeight: 'bold', fontSize: '40px'}}>Create Something New</Link>
            <Link to='/usersContent' style={{textDecoration: 'none', color: 'rgb(92, 20, 162)', backgroundColor: 'rgba(1, 6, 62, 0.9)', borderRadius: '30px',fontWeight: 'bold', fontSize: '40px'}}>Edit Your Creations</Link>
          </div>
            {/* ----------------Allow users to logout */}
          <button className="loggedInLogoutBtn" onClick={logout}>Logout</button>
        </div>
      ) : ( 
        <div className='loginAndSignUpContainer'>
          {/* ------------------------------Parent container for login Form */}
          <div className="loginContainer">
            <form className="loginForm" onSubmit={loginUser}>
              <h2 className='loginFormTitle'>Login</h2>
              <label htmlFor="" className="labelNameEmailLogin">
                <input maxLength='35' onChange={updateCurrentUserField} name='emailOrUsername' value={currentUser.emailOrUsername} type="text" className="inputNameEmailLogin" placeholder='Username or Email'/>
              </label>
              <label htmlFor="" className="labelPasswordLogin">
                <input maxLength='20' onChange={updateCurrentUserField} name='password' value={currentUser.password} type="password" className="inputPasswordLogin" placeholder='Password'/>
              </label>
              
              <button type="submit">Login</button>
            </form>

          </div>
          {/* ------------------------------------If there is an error logging in existing user */}
          {errorCurrentUser && <div className="errorLogin">{errorCurrentUser}</div>}          
          {/* ------------------------------------If there is an error creating the new user */}
          {errorNewUser && <div className="errorSignup">{errorNewUser}</div>}

          {/* -----------------------------Parent Container for Signup Form */}
          <div className="signupContainer">
            <form className="signupForm" onSubmit={createUser} >
            <h2 className='signupFormTitle'>Signup</h2>
              <label htmlFor="" className="labelEmailSignup">
                <input onChange={updateNewUserField} name="email" value={newUser.email} maxLength='35' type="text" className="inputEmailSignup" placeholder='Enter Email'/>
              </label>
              <label htmlFor="" className="labelUsernameSignup">
                <input onChange={updateNewUserField} name="username" value={newUser.username} maxLength='15' type="text" className="inputUsernameSignup" placeholder='Enter Username'/>
              </label>
              <label htmlFor="" className="labelPasswordSignup">
                <input onChange={updateNewUserField} name="password" value={newUser.password} maxLength='20' type="password" className="inputPasswordSignup" placeholder='Enter Password'/>
              </label>
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      )}
    
    </div>
  )
}
export default Login