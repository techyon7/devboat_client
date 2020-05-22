import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import Authentication from "../components/pages/Authentication";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../components/pages/UserProfile";
import ProfileSetupForm from "../components/pages/ProfileSetupForm";

// AppRouter Component
export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/register" component={Authentication} />
          <Route exact path="/verify/:verification_key" component={Authentication} />
          <Route exact path="/reset/:reset_password_key" component={Authentication} />
          <ProtectedRoute exact path="/profile-setup" component={ProfileSetupForm} />
          <ProtectedRoute exact path="/:username" component={UserProfile} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}
