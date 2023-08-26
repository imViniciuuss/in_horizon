'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Menu } from 'lucide-react';
import Button from './Button';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const handleMenu = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<header className='shadow-md h-16 px-5'>
			<div className='container flex h-full items-center justify-between'>
				<div className='flex gap-16 items-center'>
					<Link href={'/'}>
						<div className='h-full py-3 px-8 border border-[#4F4F4F] rounded-full'>
							<Image
								src='/logo.svg'
								width={125}
								height={25}
								alt='Logo'
								className='w-auto'
							/>
						</div>
					</Link>
					<div className='hidden md:flex gap-6 text-white font-medium'>
						<Link href={'/'}>Home</Link>
						<Link href={'/'}>Posts</Link>
						<Link href={'/'}>About</Link>
					</div>
				</div>
				<div className='hidden md:block'>
					<Button />
				</div>
				<div className='md:hidden'>
					<button onClick={handleMenu}>
						<Menu
							color='#fff'
							size={28}
						/>
					</button>
				</div>
			</div>

			{isOpen && (
				<div className='container absolute right-0 p-5 h-[calc(100vh-4rem)] md:hidden transition-all bg-[#25252F]'>
					<div className='flex flex-col'>
						<div className='flex flex-col'>
							<Link
								href={'/'}
								className=' hover:bg-slate-400 p-2 rounded-md text-white text-xl transition-all'
								onClick={handleMenu}>
								Home
							</Link>
							<Link
								href={'/'}
								className='hover:bg-slate-400 p-2 rounded-md text-white text-xl transition-all'
								onClick={handleMenu}>
								Posts
							</Link>
							<Link
								href={'/'}
								className='hover:bg-slate-400 p-2 mb-5 rounded-md text-white text-xl transition-all'
								onClick={handleMenu}>
								About
							</Link>
						</div>
						<Button />
					</div>
				</div>
			)}
		</header>
	);
}
