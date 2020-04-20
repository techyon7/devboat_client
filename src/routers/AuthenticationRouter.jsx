import React from 'react';
import Authentication from '../components/pages/Authentication';
import ProfileSetupForm from '../components/pages/ProfileSetupForm';
import ProfileRouter from './ProfileRouter';
import { BrowserRouter as Router, Route } from "react-router-dom";

// AuthenticationRouter Component

export default function AuthenticationRouter() {
	let loggedIn = true;
	let	setupComplete = false;
	// JSX Markup
	return(
		<Router>

			<Route path="/"
			render={() => {
				if (loggedIn) {
					return (setupComplete ? <ProfileRouter /> : <ProfileSetupForm />);
				}
				else {
					return <Authentication />;
				}
			}}
			/>

		</Router>
	);
}
