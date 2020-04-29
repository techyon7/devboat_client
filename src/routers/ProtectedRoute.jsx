import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { session } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={props =>
        session.token ? (
          <Component {...props} />
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
