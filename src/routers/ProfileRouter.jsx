import React from "react";
import UserProfile from "../components/pages/UserProfile";
import ProjectEditor from "../components/pages/ProjectEditor";
import NavBar from "../components/navigation/NavBar";
import ProtectedRouter from "./ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// ProfileRouter Component

export default function ProfileRouter() {
  return (
    <Router>
      <NavBar />
      <br />
      <Switch>
        <Route path="/" exact component={UserProfile} />
        <Route path="/project-editor" exact component={ProjectEditor} />
      </Switch>
    </Router>
  );
}
