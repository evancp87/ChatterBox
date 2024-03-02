'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHelpers';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialSignIn from './SocialSignIn';
import {
  loginUser,
  selectError,
  selectLoading,
  selectUser,
  otpEmail
} from '@/store/services/usersSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import styles from '@/styles/style.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema as schema } from '@/validation/schema';

function Login() {
  type Inputs = {
    email: string;
    password: string;
  };
  enum fontawesomeIcons {
    google = 'google',
    github = 'github'
  }
  const socialProviders = {
    google: 'google',
    github: 'github'
  };
  const { google, github } = socialProviders;
  const user = useAppSelector(selectUser);

  const loading: string | boolean = !!useAppSelector(selectError)!;
  const error = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: joiResolver(schema)
  });

  const [debouncedErrors, setDebouncedErrors] = useState(errors);
  const watchedValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedErrors(errors);
    }, 800);

    return () => clearTimeout(timer);
  }, [watchedValues, errors]);

  useEffect(() => {
    if (user) {
      router.push('/chats');
    }
  }, [user, router]);
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    const event = e!;
    event.preventDefault();
    dispatch(loginUser(data));
  };
  return (
    <div className={styles.parent}>
      <ToastContainer />

      <h3 className="ms-4 mt-4 text-3xl">Login</h3>
      <button>
        <Link href="/authentication/otp">One time password</Link>
      </button>

      <SocialSignIn provider={google} icon={fontawesomeIcons.google} />
      <SocialSignIn provider={github} icon={fontawesomeIcons.github} />

      <p>or</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full">
          <label htmlFor="username"></label>
          <input
            className={`field my-4 my-4 w-full border-b-2 bg-transparent p-4 text-xs opacity-75 focus:opacity-100 focus:outline-none 
            ${errors.email ? 'border-[#FC4747]' : ''}`}
            type="text"
            placeholder="email"
            required
            {...register('email')}
          />

          {errors.email && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.email?.message}
            </p>
          )}
        </div>
        <div className="relative w-full">
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder={'Password'}
            {...register('password')}
            required
          />

          {errors.password && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.password?.message}
            </p>
          )}
        </div>

        <button
          className={`mb-4 h-9 cursor-pointer rounded-lg bg-red text-[white] hover:bg-white hover:text-[black] ${
            loading && 'cursor-not-allowed'
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={10} />
          ) : (
            ' Login to your account'
          )}
        </button>
        {error && typeof error === 'object' && 'data' in error && (
          <p className="min-h-30 my-4 flex justify-center text-xs text-red ">
            {error as string}
          </p>
        )}
      </form>
      <Link href="authentication/reset">Forgot your password?</Link>
    </div>
  );
}

export default Login;
