import React, { Component } from 'react';
// Moment used to make time-stamp more readable
import Moment from 'react-moment';
import axios from 'axios';
import { Header } from './Header';
import { OrderConfirmed } from './OrderConfirmed';
import './PlaceOrder.css';

class PlaceOrder extends Component {
	constructor() {
		super();
		this.state = {
			order_id: Number,
			order_date: '',
			size: '',
			crust: '',
			toppings: [],
			showThankYou: false,
		};
	}

	componentDidMount() {
		// inserted https://cors.io/? because API is not configured with Access-Control-Allow-Origin header.
		// See StackOverflow https://stackoverflow.com/questions/46785318/the-cors-header-access-control-allow-origin-is-missing?rq=1

		return axios
			.get('https://cors.io/?https://59b6v76zci.execute-api.us-west-2.amazonaws.com/nr/example', {
				method: 'GET',
				mode: 'cors',
			})
			.then(response => {
				const { order_date, order_id, size, crust, toppings } = response.data;
				this.setState({
					order_id: order_id,
					order_date: order_date,
					size: size,
					crust: crust,
					toppings: toppings,
				});
			})
			.catch(err => console.log('err', err));
	}

	handleClick() {
		this.setState({ showThankYou: true });
	}

	render() {
		if (this.state.showThankYou === true) {
			return <OrderConfirmed />;
		}

		let toppings = this.state.toppings.map((topping, key) => (
			// key required by react when mapping to identify changes
			<div className="topping-container" key={key}>
				<ul className="topping-list">
					<li className="pizza-topping">
						<span>{topping.name}</span>
					</li>
				</ul>
			</div>
		));

		let amount = this.state.toppings.map((topping, key) => (
			<div className="amount-container" key={key}>
				<ul className="amount-list">
					<li className="topping-amount">
						<span>{topping.amount}</span>
					</li>
				</ul>
			</div>
		));

		let price = Math.floor(Math.random() * 10) + 20;

		return (
			<div className="container">
				<Header />
				<div className="order-container">
					<div className="order-container-header">
						<h3>Your Order</h3>
					</div>
					<div className="price">$ {price}</div>
					<div className="order_date">
						<h3 className="order-placed-text">Time</h3>
						<Moment className="order-date-time" format="MM/DD/YYYY HH:mm" />
					</div>
					<div className="crust-size-container">
						<div className="crust-wrapper">
							<h3 className="crust-text">Crust </h3>
							{this.state.crust}
						</div>
						<div className="size-wrapper">
							<h3 className="size-text">Size </h3>
							{this.state.size}
						</div>
					</div>
					<div className="topping-amount-wrapper">
						<div className="topping-wrapper">
							<h3 className="topping-text">Toppings</h3>
							{toppings}
						</div>
						<div className="amount-wrapper">
							<h3 className="amount-text">Amount</h3>
							{amount}
						</div>
					</div>
				</div>
				<button className="button" onClick={this.handleClick.bind(this)}>
					Confirm Order
				</button>
			</div>
		);
	}
}

export default PlaceOrder;
