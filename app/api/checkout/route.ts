import stripe from '@/lib/stripe';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	const { priceId } = await request.json();

	try {
		const checkout = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `http://localhost:3000/success?priceId={CHECKOUT_SESSION_ID}`,
			cancel_url: 'http://localhost:3000/',
		});

		console.log(checkout);

		return NextResponse.json({
			url: checkout.url,
		});
	} catch (error) {
		console.error('Erro ao criar sessão de checkout:', error);
	}
}
