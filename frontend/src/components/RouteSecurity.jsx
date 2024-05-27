// To protect pages/routes that should only be accessed if a user is logged in
// ----------------------------------import for Navigate and useOutletContext
import { Navigate, useOutletContext } from 'react-router-dom';


//-----------------------------------Component, decides if the "children" component should be rendered based on 
// given condition
const RouteSecurity = ({ children }) => {
    //------------------------Import login state
    const { login } = useOutletContext()

    //---------------------------If login is null, (user not logged in) activated this
    if (!login) {
        return <Navigate to='/login' replace />; 
    };

    return children;
}
export default RouteSecurity