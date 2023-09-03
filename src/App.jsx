import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { useState } from 'react';
import { Nav, Alert, PrivateRoute } from '_components';
import { Home } from 'home';
import { AccountLayout } from 'account';
import { UsersLayout } from 'users';
import { Audit } from 'audit/Audit';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)

  
    
    history.navigate = useNavigate();
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


    history.location = useLocation();


    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                    </Route>
                    {data&&data=='Auditor'?
                    <Route element={<PrivateRoute />}>
                        <Route path="/audit" element={<Audit />} />
                     
                    </Route>
                    :null
                    }
                    {/* public */}
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
