import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
	return (
		<section className='w-full p-5 h-[calc(100vh-4rem)] '>
			<div className='flex container h-full items-center justify-between '>
				<div className='w-[34.375rem] '>
					<div className='flex flex-col gap-6'>
						<h1 className='text-white text-6xl font-black '>
							All news about <span className='text-[#FFD337]'>cars</span> in the
							world
						</h1>
						<div className='w-80'>
							<p className='text-[#AAA] text-xl'>
								Get acess to all the publications
								<br />
								<span className='text-[#FFD337] font-bold'>
									for $9,90 month
								</span>
							</p>
						</div>
					</div>
					<Link href={'/plans'}>
						<button className='w-64 h-16 mt-14 rounded-full bg-[#FFD337]'>
							<span className='text-white font-bold text-xl'>
								View all plans
							</span>
						</button>
					</Link>
				</div>
				<div className='hidden md:flex'>
					<Image
						src='/car.png'
						width={580}
						height={394}
						alt='Car'
						className='object-contain h-auto'
					/>
				</div>
			</div>
		</section>
	);
}

