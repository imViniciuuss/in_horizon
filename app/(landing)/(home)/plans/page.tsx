import PlansCard from '@/components/ui/PlansCard';

export default function PlansPage() {
	return (
		<section className='w-full px-5 h-[calc(100vh-5rem)]'>
			<div className='flex flex-col container pt-12'>
				<div className='flex justify-between items-center h-11 '>
					<h1 className='text-white text-xl font-semibold'>Plans Offers</h1>
					<div className='flex h-full w-32 items-center justify-center bg-[#2E2E3F] rounded-full'>
						<span className='text-white font-medium'>Monthly</span>
					</div>
				</div>
				<PlansCard />
			</div>
		</section>
	);
}
