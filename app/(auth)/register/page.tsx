import { UserRegisterForm } from '@/components/register-auth';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<div className='h-screen bg-[#18181B] p-5 flex items-center justify-center'>
			<div className='w-96 flex flex-col items-center '>
				<h1 className='text-3xl text-white mb-3'>Create Account</h1>
				<p className='text-[#B1B1B1]'>Create your data</p>
				<UserRegisterForm />
			</div>
		</div>
	);
}
