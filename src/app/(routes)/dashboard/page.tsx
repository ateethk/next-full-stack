import { UserButton } from '@clerk/nextjs';

export default function Page() {
	return (
		<div>
			<p className='text-gray-700'>Dashboard Page</p>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}
