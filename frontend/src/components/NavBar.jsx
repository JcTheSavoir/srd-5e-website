import { Link } from "react-router-dom"

 const NavBar = () => {
    return (
        <div className="navbarContainer">
                {/* Link to Options page */}
            <Link to='/options'>
                <div>Options</div>
            </Link>
                {/* Title of NavBar/all pages */}
            <div className="navbarTitle">Welcome to the DND Information Page</div>

                {/* Link to login page */}
            <Link to='/login'>
                {/* -------------------------------Change this div to a ternary once login/logout is tracked */}
                <div>Sign-up/Login</div>
            </Link>
        </div>
      );
    };
 export default NavBar;