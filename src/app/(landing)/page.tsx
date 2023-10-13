import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<p className='text-gray-700'>Landing Page</p>
			<Link href={'/sign-up'}>
				<p>Sign Up</p>
			</Link>
			<Link href={'/sign-in'}>
				<p>Sign In</p>
			</Link>
		</div>
	);
}
