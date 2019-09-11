import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Icon";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Timeline";
import "@ui5/webcomponents/dist/Option";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Link";
//import "@ui5/webcomponents/dist/ThemePropertiesProvider"
//import "@ui5/webcomponents/dist/MessageBundleAssets.js";

import Home from "./home/Home";
import Overview from './overview/Overview';
import AppBar from './appbar/AppBar';
import Impressum from "./other/Imprint";
import Privacy from "./other/Privacy";
import Detail from "./detail/Detail";


const App = () => {
	return (
		<div className="App">
			<AppBar />
			<div role="main">
				<Switch>
					<Route path='/home' component={Home} />
					<Route path='/overview' component={Overview} />,
				<Route path='/detail/:id' component={Detail} />
					{/*<Route path='/overview' component={() => { 
					window.location.href = "https://reactjs.org/docs/refs-and-the-dom.html"; 
					return null;
				}}/>,*/}
					<Route path='/imprint' component={Impressum} />,
				<Route path='/privacy' component={Privacy} />,
				<Redirect from="/" to="/home" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
