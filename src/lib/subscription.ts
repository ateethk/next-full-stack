import { auth } from '@clerk/nextjs';

import prisma from './db';

const DAY_IN_MS = 86_400_000;

/** SUBSCRIPTION */

export const checkSubscription = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: { subscription: true }
	});

	if (user?.subscription?.planType === 'trial') {
		return false;
	}

    if (user?.subscription?.status !== 'active') {
        return false;
    }

	return true;
};

/** PLAN NAMES */

export const getPlanNameForId = (id: string) => {
    if (id === 'price_1O0FBbGriDVzZPjAbzcF2Kqs') {
        return 'basic';
    } else if (id === 'price_1O0Rp4GriDVzZPjAKXzjdcI5') {
        return 'pro';
    };
    
    return 'trial';
};

export const getPriceIdForPlan = (plan: string = '', interval: string = '') => {
    return PLANS[plan]?.[interval];
};

interface Plan {
    month: string;
    year: string;
    [key: string]: string;
}

interface Plans {
    [key: string]: Plan;
}

const PLANS: Plans = {
    basic: {
        month: 'price_1O0FBbGriDVzZPjAbzcF2Kqs',
        year: 'price_1O0FBbGriDVzZPjAbzcF2Kqs'
    },
    pro: {
        month: 'price_1O0Rp4GriDVzZPjAKXzjdcI5',
        year: 'price_1O0Rp4GriDVzZPjAKXzjdcI5'
    }
};

