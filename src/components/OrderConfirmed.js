import React from 'react';
import './OrderConfirmed.css';
import { Header } from './Header';

const OrderConfirmed = () => {
	return (
		<div className="order-confirmed-container">
			<Header />
			<div className="orderPlaced">
				<p>Thank you!</p>
				<p>Your pizza is on its way.</p>
			</div>
		</div>
	);
};

export { OrderConfirmed };
