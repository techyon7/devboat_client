import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import Authentication from "../components/pages/Authentication";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../components/pages/UserProfile";
import ProfileSetupForm from "../components/pages/ProfileSetupForm";
import VerifyEmail from "../components/authentication/VerifyEmail";
import SkillsInterestsStep from "../components/profile-setup/SkillsInterestsStep";
// AppRouter Component
export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Route exact path="/" component={Authentication} />
        <Route exact path="/login" component={Authentication} />
        <Route exact path="/register" component={Authentication} />
        <Route exact path="/verify" component={VerifyEmail} />
        <ProtectedRoute path="/setup-1" component={SkillsInterestsStep} />
        <ProtectedRoute path="/profileSetup" component={ProfileSetupForm} />
        <ProtectedRoute path="/profile" component={UserProfile} />
      </GlobalProvider>
    </BrowserRouter>
  );
}
