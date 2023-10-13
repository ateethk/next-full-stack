import Stripe from 'stripe';
import prisma from '@/src/lib/db';
import { getPlanNameForId } from '@/src/lib/subscription';

export async function createSubscriptionDb(userId: string, subscription: Stripe.Subscription) {
	const updated = await prisma.subscription.update({
		where: { userId: userId },
		data: {
			planType: getPlanNameForId(subscription.items.data[0].price.id),
			planInterval: subscription.items.data[0].price.recurring?.interval!,
			status: 'active',
			stripeSubscriptionId: subscription.id,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
		}
	});
	return updated;
}

export async function recurringSubscriptionDb(subscription: Stripe.Subscription) {
	const updated = await prisma.subscription.update({
		where: { stripeSubscriptionId: subscription.id },
		data: {
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
		}
	});
	return updated;
}

export async function changeSubscriptionDb(subscription: Stripe.Subscription) {
	await prisma.subscription.update({
		where: { stripeSubscriptionId: subscription.id },
		data: {
			planType: getPlanNameForId(subscription.items.data[0].price.id),
			planInterval: subscription.items.data[0].price.recurring?.interval!,
			stripeSubscriptionId: subscription.id,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
		}
	});
	return;
}

export async function cancelSubscriptionDb(subscription: Stripe.Subscription) {
    await prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
            status: 'canceled',
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }
    });
    return;
}
