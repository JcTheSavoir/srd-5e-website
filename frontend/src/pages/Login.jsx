const Login = () => {
  return (
    // ---------------------------parent container for login and signup forms
    <div className="loginComponentContainer">
        {/* ------------------------------Parent container for login Form */}
        <div className="loginContainer">

          <form className="loginForm" action="">
            <label htmlFor="" className="labelNameEmailLogin">Enter Username or Email</label>
            <input maxLength='35' type="text" className="inputNameEmailLogin" />
            <label htmlFor="" className="labelPasswordLogin">Enter</label>
            <input maxLength='20' type="text" className="inputPasswordLogin" />
          </form>







        </div>

        {/* -----------------------------Parent Container for Signup Form */}
        <div className="signupContainer">
          <form className="signupForm" action="">
            <label htmlFor="" className="labelEmailSignup">Enter Email</label>
            <input maxLength='35' type="text" className="inputEmailSignup" />
            <label htmlFor="" className="labelUsernameSignup">Enter Username</label>
            <input maxLength='15' type="text" className="inputUsernameSignup" />            
            <label htmlFor="" className="labelPasswordSignup">Enter Password</label>
            <input maxLength='20' type="text" className="inputPasswordSignup" />
          </form>

        </div>


    </div>
  )
}
export default Login