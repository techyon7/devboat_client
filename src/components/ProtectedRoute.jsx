import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default function ProtectedRoute() {
	return(
		<Route
			render={props =>
				loggedIn ? (
          <Redirect to={{
              pathname: "/profile",
              state: { from: props.location }
					}}
					/>
				) : (
					<Redirect to={{
              pathname: "/login",
              state: { from: props.location }
					}}
					/>
				)
			}
		/>
	);
}
