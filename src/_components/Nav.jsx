import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    const obj=  localStorage.getItem('auth')

    const regex = /"role":"(.*?)"/;
   const match = obj&& obj.length?obj.match(regex):null;
   
   if (match) {
     const roleValue = match[1]; // Extract the value of the "role" property
     console.log(roleValue); // This will log "Auditor"
   var data = roleValue
   } else {
     console.log('Role property not found.');
   }
   
    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Dashboard</NavLink>
                {data&&data=='Auditor'?
                <NavLink to="/audit" className="nav-item nav-link">Audit</NavLink>:
                null}
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}