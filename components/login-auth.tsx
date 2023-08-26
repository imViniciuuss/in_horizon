'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import Link from 'next/link';

interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
	email: string;
	password: string;
}

const createUserFormSchema = z.object({
	email: z
		.string()
		.nonempty('Email is required!')
		.email('Invalid email format!')
		.toLowerCase(),
	password: z.string().min(6, 'Password must be at least 6 characters long!'),
});

type CreateUserDataForm = z.infer<typeof createUserFormSchema>;

export function UserLoginForm({ className, ...props }: UserAuthProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUserDataForm>({
		resolver: zodResolver(createUserFormSchema),
	});

	const [data, setData] = useState<IUser>({
		email: '',
		password: '',
	});

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	async function handleLogin() {
		setIsLoading(true);

		const res = await signIn<'credentials'>('credentials', {
			...data,
			redirect: false,
		});

		if (res?.error) {
			toast.error('😥 Incorrect data!', {
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
			router.push('/');
		}

		setData({
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
				onSubmit={handleSubmit(handleLogin)}
				className='flex w-full flex-col my-6 gap-2'>
				<div className='flex flex-col gap-1'>
					{errors.email && (
						<span className='text-red-400 text-xs'>{errors.email.message}</span>
					)}
					<input
						id='email'
						type='email'
						className='w-full h-12 p-4 bg-transparent placeholder:text-[#B1B1B1] outline-none border-2 rounded-lg border-[#414141] text-sm text-[#B1B1B1] transition ease-in-out delay-150 focus:border-[#666F99]'
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
						className='w-full h-12 p-4 bg-transparent placeholder:text-[#B1B1B1] outline-none border-2 rounded-lg border-[#414141] text-sm text-[#B1B1B1] transition ease-in-out delay-150 focus:border-[#666F99]'
						placeholder='Your password'
						autoCapitalize='none'
						autoComplete='off'
						disabled={isLoading}
						value={data.password}
						{...register('password')}
						onChange={handleChange}
					/>
					<div className='flex justify-end text-[#B1B1B1] text-sm'>
						<Link href={'/register'}>
							<p className='hover:underline'>Dont have an account?</p>
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
						<span className='text-white text-lg font-bold'>Entrar</span>
					)}
				</button>
			</form>
		</div>
	);
}
