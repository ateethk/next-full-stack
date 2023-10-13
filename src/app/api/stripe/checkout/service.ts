import { stripe } from '@/src/lib/stripe';
import { getUserDb } from '../../user/db';

export async function createStripeCheckoutSession(userId: string, priceId: string) {
	const user = await getUserDb(userId);
	const stripeCheckoutSession = await stripe.checkout.sessions.create({
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
		customer: user?.stripeCustomerId,
		payment_method_types: ['card'],
		mode: 'subscription',
		billing_address_collection: 'auto',
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		metadata: { userId: userId }
	});
	return stripeCheckoutSession.url;
}
