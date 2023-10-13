import prisma from '@/src/lib/db';

/** GET */

export async function getUserDb(id: string) {
	const user = await prisma.user.findUnique({ where: { id } });
	return user;
}

/** POST */

export async function createUserDb(
	id: string,
	email: string,
	stripeId: string
) {
	const user = await prisma.user.create({
		data: {
			id: id,
			email: email,
			stripeCustomerId: stripeId,
			subscription: {
				create: {
					status: 'active',
					planType: 'trial',
					planInterval: 'month'
				}
			}
		}
	});
	return user;
}
