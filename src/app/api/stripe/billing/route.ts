import { auth } from '@clerk/nextjs';

import { stripe } from '@/src/lib/stripe';
import { getUserDb } from '../../user/db';

export async function GET() {
	try {
		const { userId } = auth();
		if (!userId) {
			return new Response('Unauthorized', { status: 401 });
		}

		const user = await getUserDb(userId);
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: user?.stripeCustomerId!,
			return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`
		});

		return new Response(JSON.stringify({ url: stripeSession.url }), {
			status: 200
		});
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
