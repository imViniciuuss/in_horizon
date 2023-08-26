import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogInIcon, LogOut } from 'lucide-react';

export default function Button() {
	const session = useSession();

	return (
		<>
			{session.data?.user ? (
				<button
					onClick={() => signOut({ callbackUrl: '/login' })}
					className='flex h-full py-3 px-5 border border-[#4F4F4F] rounded-full items-center justify-center gap-2'>
					<h1 className='text-white font-semibold'>{session.data.user.name}</h1>
					<LogOut
						color='#4F4F4F'
						size={20}
					/>
				</button>
			) : (
				<Link href={'/login'}>
					<button className='flex h-full py-3 px-5 border border-[#4F4F4F] items-center justify-center rounded-full gap-2'>
						<h1 className='text-white font-semibold'>Login</h1>
						<LogInIcon
							color='#4F4F4F'
							size={20}
						/>
					</button>
				</Link>
			)}
		</>
	);
}
