'use client';

import { getPriceIdForPlan } from "@/src/lib/subscription";

export const StripeButton = ({ type = '' }) => {
	const handleSubscribe = async () => {
		try {
			const response = await fetch('/api/stripe/checkout?priceId=' + getPriceIdForPlan('basic', 'month'));
			const { url } = await response.json();
			window.location.href = url;
		} catch (error) {
			console.log(error);
		}
	};

	const handleBillingPortal = async () => {
		try {
			const response = await fetch('/api/stripe/billing');
			const { url } = await response.json();
			window.location.href = url;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{type === 'subscribe' ? (
				<button onClick={handleSubscribe}>Subscribe</button>
			) : (
				<button onClick={handleBillingPortal}>Upgrade</button>
			)}
		</div>
	);
};
