import React, { Fragment, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import NavBar from "../components/navigation/NavBar";

function ProtectedRoute({ component: Component, ...rest }) {
  const { session } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={props =>
        session.token ? (
          session.userIsSetup || props.location.pathname === "/profile-setup"? (
            <Fragment>
              <NavBar {...props}/>
              <Component {...props} />
            </Fragment>
          ) : (
            <Redirect to="/profile-setup"/>
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: !console.log(props) && props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
