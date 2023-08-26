'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ButtonCheckoutProps {
	priceId: string;
}

export default function ButtonCheckout({ priceId }: ButtonCheckoutProps) {
	const router = useRouter();
	const session = useSession();

	async function handleCheckout() {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({
				priceId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		router.push(data.url);
	}

	return (
		<>
			{session.data?.user ? (
				<button
					onClick={handleCheckout}
					className='bg-[#7683B0] h-7 flex items-center justify-center rounded-full'>
					<span className='text-white text-xs font-bold'>Buy plan now</span>
				</button>
			) : (
				<Link href={'/login'}>
					<button className='bg-[#7683B0] w-full h-7 flex items-center justify-center rounded-full'>
						<span className='text-white text-xs font-bold'>Login to buy</span>
					</button>
				</Link>
			)}
		</>
	);
}
