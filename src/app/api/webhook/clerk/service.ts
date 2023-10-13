import { stripe } from '@/src/lib/stripe';
import { createUserDb } from '../../user/db';

export async function createUser(id: string, email: string) {
	const stripeCustomer = await stripe.customers.create({ email: email });
	const stripeCustomerId = stripeCustomer.id;
	const user = await createUserDb(id, email, stripeCustomerId);
	return user;
}
