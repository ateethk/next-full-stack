import { StripeButton } from '@/src/app/components/buttons/StripeButton';
import { checkSubscription } from '@/src/lib/subscription';

export default async function Page() {
	const isSubscribed = await checkSubscription();
	return (
		<div>
			<p className='text-gray-700'>Account Page</p>
			{isSubscribed ? (
				<StripeButton type='billing' />
			) : (
                <StripeButton type='subscribe' />
			)}
		</div>
	);
}
