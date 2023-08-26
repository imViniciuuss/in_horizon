import stripe from '@/lib/stripe';
import ButtonCheckout from '../button-checkout';
import { CircleDollarSign, Tag } from 'lucide-react';

async function LoadProducts() {
	try {
		const prices = await stripe.prices.list();
		const productsWithPrices = await Promise.all(
			prices.data.map(async (price) => {
				const product = await stripe.products.retrieve(
					price.product.toString()
				);
				return { product, price };
			})
		);

		return productsWithPrices;
	} catch (error) {
		console.error('Erro ao buscar os produtos:', error);
		return [];
	} finally {
	}
}

export default async function PlansCard() {
	const prices = await LoadProducts();
	console.log(prices);

	const formatPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return (
		<article className='flex justify-between h-96 mt-6'>
			{prices.map((item) => (
				<div
					key={item.price.id}
					className='flex w-full flex-col justify-between h-full p-5 rounded-xl bg-[#2E2E3F] md:w-[347px]'>
					<div className='flex flex-col'>
						<div className='flex justify-between items-center'>
							<div className='flex gap-3'>
								<CircleDollarSign color='#7683B0' />
								<h1 className='text-white font-medium'>
									{item.price.nickname}
								</h1>
							</div>
							<div className='flex h-5 items-center justify-center bg-[#7683B0] px-5 rounded-full'>
								<span className='text-white font-medium text-xs'>
									Premium Plan
								</span>
							</div>
						</div>
						<div className='flex flex-col gap-5'>
							<div className='flex mt-6 gap-2 items-center'>
								<span className='text-[#52FF00] font-medium text-xl'>
									{formatPrice.format(item.price.unit_amount! / 100)}
								</span>
								<span className='text-white text-sm'>
									/{item.price.recurring?.interval}
								</span>
							</div>
							<div className='border border-[#414151]'></div>
						</div>
						<div className='mt-5'>
							<p className='text-[#ADADAD] text-xs'>
								{item.product.description}
							</p>
						</div>
						<div className='flex mt-5 items-center  gap-3'>
							<Tag color='#7683B0' />
							<div className='flex flex-col'>
								<span className='font-medium text-sm text-white'>
									Access to Posts
								</span>
								<p className='font-medium text-xs text-[#848484]'>
									Have so many access for all posts
								</p>
							</div>
						</div>
					</div>
					<ButtonCheckout priceId={item.price.id} />
				</div>
			))}
		</article>
	);
}
