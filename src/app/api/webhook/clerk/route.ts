import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser } from './service';

export async function POST(req: Request) {
	const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
	if (!CLERK_WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		);
	}

	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400
		});
	}

	const payload = await req.json();
	const wh = new Webhook(CLERK_WEBHOOK_SECRET);
	let evt: WebhookEvent;

	try {
		evt = wh.verify(JSON.stringify(payload), {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400
		});
	}

	const eventType = evt.type;
	const id = payload.data.id;
	const email = payload.data.email_addresses[0].email_address;

	switch (eventType) {
		case 'user.created':
			await createUser(id, email);
			return new Response('Successfully created user', { status: 201 });
		default:
			return new Response('', { status: 201 });
	}
}
