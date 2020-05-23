import { createMuiTheme } from '@material-ui/core/styles';

const devboatTheme = createMuiTheme({
  palette: {
    primary: {
			main: '#4B7BEC'
		},
		secondary: {
			main: '#222528',
  		vice: '#273033'
		},
		background: {
			default: '#1E1E21'
		},
    error: {
      main: '#eb4d4b'
    },
    grey: {
      800: '#1E1E21'
    },
		type: 'dark'
  },
  props: {
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiFab: {
      size: 'small',
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  spacing: factor => `${0.25 * factor}rem`,
});

console.log(devboatTheme);

export default devboatTheme;
