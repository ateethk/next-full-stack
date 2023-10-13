import Stripe from 'stripe';
import { headers } from 'next/headers';

import { stripe } from '@/src/lib/stripe';
import { cancelSubscriptionDb, changeSubscriptionDb, createSubscriptionDb, recurringSubscriptionDb } from './db';

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const signature = headers().get('Stripe-Signature') as string;

		let event: Stripe.Event;
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

		const session = event.data.object as Stripe.Checkout.Session;

		// EVENT: Checkout Session Completed
		if (event.type === 'checkout.session.completed') {
			console.log('checkout.session.completed');
			const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

			if (!session?.metadata?.userId) {
				return new Response('User not found', { status: 400 });
			}

			await createSubscriptionDb(session.metadata.userId, subscription);
		}

		// EVENT: Subscription Paid / Recurring Payment
		if (event.type === 'invoice.paid') {
			console.log('invoice.paid');
			const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

			await recurringSubscriptionDb(subscription);
		}

		// EVENT: Subscription Plan Changed
		if (event.type === 'customer.subscription.updated') {
			console.log('customer.subscription.updated');
			const subscription = await stripe.subscriptions.retrieve(session.id as string);

			await changeSubscriptionDb(subscription);
		}

		// EVENT: Subscription Canceled
		if (event.type === 'customer.subscription.deleted') {
			console.log('customer.subscription.deleted');
			const subscription = await stripe.subscriptions.retrieve(session.id as string);

			await cancelSubscriptionDb(subscription);
		}

		return new Response(null, { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
