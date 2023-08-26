import Link from 'next/link';

export default function SuccessPage() {
	return (
		<div className='flex justify-center h-[calc(100vh-4rem)]'>
			<div className='flex flex-col mt-20 gap-5 w-full h-80 text-center items-center '>
				<h1 className='text-3xl text-white'>PURCHASE MADE!</h1>
				<p className='text-[#838383] text-lg'>
					Uhull! Your purchase was successful!
				</p>
				<Link href={'/plans'}>
					<button className='flex items-center justify-center w-64 p-5 border border-[#4F4F4F] rounded-full transition-all  hover:border-[#777777]'>
						<span className='text-white font-medium'>Back to plans</span>
					</button>
				</Link>
			</div>
		</div>
	);
}
