import { auth, currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/src/lib/db';
import { stripe } from '@/src/lib/stripe';
import { createStripeCheckoutSession } from './service';

export async function GET(req: NextRequest) {
	try {
		const { userId } = auth();
		if (!userId) {
			return new Response('Unauthorized', { status: 401 });
		}

        const searchParams = req.nextUrl.searchParams;
        const priceId = searchParams.get('priceId') as string;

		const stripeSession = await createStripeCheckoutSession(userId, priceId);
		return new Response(JSON.stringify({ url: stripeSession }), {
			status: 200
		});
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
