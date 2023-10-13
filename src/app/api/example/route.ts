import { auth } from '@clerk/nextjs';

export async function GET(req: Request) {
	try {
        const { userId } = auth();
        if (!userId) {
            return new Response('Unauthorized', { status: 401 });
        };

		return Response.json([
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]);
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

export async function POST(req: Request) {    
	try {
        const { userId } = auth();
        if (!userId) {
            return new Response('Unauthorized', { status: 401 });
        };

		const body = await req.json();
		return Response.json([
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]);
	} catch (error) {
		console.log(error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
