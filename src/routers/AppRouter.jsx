import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from '../context/GlobalContext';
import Authentication from "../components/pages/Authentication";
import ProtectedRoute from './ProtectedRoute';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import UserProfile from "../components/pages/UserProfile";
// AppRouter Component

export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Authentication>
          <Route exact path="/" component={Login} />
  	      <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute path="/profile" component={UserProfile} />
        </Authentication>
      </GlobalProvider>
    </BrowserRouter>
  );
}
