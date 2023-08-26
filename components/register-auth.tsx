'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DotLoader } from 'react-spinners';
import Link from 'next/link';

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
	name: string;
	email: string;
	password: string;
}

const createUserRegisterFormSchema = z.object({
	name: z.string().nonempty('Name is required!'),
	email: z
		.string()
		.nonempty('Email is required!')
		.email('Invalid email format!')
		.toLowerCase(),
	password: z.string().min(6, 'Password must be at least 6 characters long!'),
});

type CreateUserDataForm = z.infer<typeof createUserRegisterFormSchema>;

export function UserRegisterForm({ className, ...props }: UserAuthProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUserDataForm>({
		resolver: zodResolver(createUserRegisterFormSchema),
	});
	const router = useRouter();

	const [data, setData] = useState<IUser>({
		name: '',
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);

	async function handleRegister() {
		setIsLoading(true);

		const request = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const response = await request.json();

		// console.log('REGISTER USER FORM', response);

		if (!request.ok) {
			toast.error('😥 E-mail already registered!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		} else {
			router.push('/login');
			toast.success('🎉 Registered in successfully!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}

		setData({
			name: '',
			email: '',
			password: '',
		});
		setIsLoading(false);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	return (
		<div
			className='w-full'
			{...props}>
			<form
				onSubmit={handleSubmit(handleRegister)}
				className='flex w-full flex-col my-6 gap-2'>
				<div className='flex flex-col gap-1'>
					{errors.name && (
						<span className='text-red-400 text-xs'>{errors.name.message}</span>
					)}
					<input
						id='name'
						type='text'
						className='w-full h-12 p-4 bg-transparent placeholder:text-[#B1B1B1] outline-none border-2 rounded-lg border-[#414141] text-sm text-[#B1B1B1] transition ease-in-out delay-150 focus:border-[#666F99]'
						placeholder='Name'
						disabled={isLoading}
						value={data.name}
						{...register('name')}
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					{errors.email && (
						<span className='text-red-400 text-xs'>{errors.email.message}</span>
					)}
					<input
						id='email'
						type='email'
						className='w-full h-12 p-4 bg-transparent placeholder:text-[#B1B1B1] outline-none border-2 rounded-lg border-[#414141] text-sm text-[#B1B1B1]'
						placeholder='email@example.com'
						autoCapitalize='none'
						autoComplete='email'
						autoCorrect='off'
						disabled={isLoading}
						value={data.email}
						{...register('email')}
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					{errors.password && (
						<span className='text-red-400 text-xs'>
							{errors.password.message}
						</span>
					)}
					<input
						id='password'
						type='password'
						className='w-full h-12 p-4 bg-transparent placeholder:text-[#B1B1B1] outline-none border-2 rounded-lg border-[#414141] text-sm text-[#B1B1B1]'
						placeholder='Password'
						autoCapitalize='none'
						autoComplete='off'
						disabled={isLoading}
						value={data.password}
						{...register('password')}
						onChange={handleChange}
					/>
					<div className='flex justify-end text-[#B1B1B1] text-sm'>
						<Link href={'/register'}>
							<p className='hover:underline'>Already have an account?</p>
						</Link>
					</div>
				</div>
				<button
					disabled={isLoading}
					className='flex items-center justify-center h-12 rounded-lg bg-[#666F99] mt-6'>
					{isLoading ? (
						<DotLoader
							color='#728cff'
							loading={isLoading}
							size={20}
						/>
					) : (
						<span className='text-white text-lg font-bold'>Criar conta</span>
					)}
				</button>
			</form>
		</div>
	);
}
