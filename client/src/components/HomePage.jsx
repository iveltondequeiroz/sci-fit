import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SciliftLanding from "./SciliftLanding";


const HomePage = () => (
	<MuiThemeProvider>
		<SciliftLanding/>
	</MuiThemeProvider>
);

export default HomePage;