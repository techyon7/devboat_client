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
          <Fragment>
            <NavBar />
            <Component {...props} />
          </Fragment>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
