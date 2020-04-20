import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import devboatTheme from './devboatTheme';
import { Provider } from 'react-redux';
import store from './store';



ReactDOM.render(
	<MuiThemeProvider theme={ devboatTheme }>
		<CssBaseline />
		<Provider store={ store }>
      <App />
    </Provider>
	</MuiThemeProvider>,
	document.getElementById('root'));
