import React, { Component } from 'react';
import './App.css';
import PlaceOrder from '../src/components/PlaceOrder';

class App extends Component {
	render() {
		return (
			<div className="App">
				<PlaceOrder />
			</div>
		);
	}
}

export default App;
