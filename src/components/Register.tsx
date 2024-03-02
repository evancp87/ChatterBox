'use client';
import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SocialSignIn from './SocialSignIn';
import {
  selectIsSuccess,
  registerUser,
  selectError,
  selectLoading
} from '@/store/services/usersSlice';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHelpers';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerSchema as schema } from '@/validation/schema';

type Inputs = {
  // username?: string;
  email: string;
  password: string;
  repeatPassword: string;
  // avatar?: string | null;
};

function Register() {
  // handles setting an image
  // const [image, setImage] = useState<string | null>(null);
  const notifySuccess = () => toast('User successfully created');
  const notifyError = () => toast('User could not be created');
  const isSuccess = useAppSelector(selectIsSuccess);
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectLoading);
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
      password: '',
      repeatPassword: ''
    },
    resolver: joiResolver(schema)
  });

  const [debouncedErrors, setDebouncedErrors] = useState(errors);
  // redirects successful user to login
  useEffect(() => {
    if (isSuccess) {
      notifySuccess();
      router.push('/');
    }
  }, [isSuccess, router]);

  const watchedValues = watch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedErrors(errors);
    }, 800);

    return () => clearTimeout(timer);
  }, [watchedValues, errors]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { repeatPassword, ...dataToSubmit } = data;

    dispatch(registerUser(dataToSubmit));
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

  return (
    <div className="w-64 rounded-lg bg-darkBlue md:w-80">
      <h3 className="ms-4 mt-4 text-3xl">Sign Up</h3>
      <ToastContainer />

      <SocialSignIn provider={google} icon={fontawesomeIcons.google} />
      <SocialSignIn provider={github} icon={fontawesomeIcons.github} />

      <p>or</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            className="${errors('password') ? 'border-[#FC4747]' : ''}"
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
        <div className="relative">
          <input
            className="${errors('password') ? 'border-[#FC4747]' : ''}"
            type="password"
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.password?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            className=""
            type="password"
            placeholder="Repeat Password"
            required
            {...register('repeatPassword')}
          />
          {errors.repeatPassword && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.repeatPassword?.message}
            </p>
          )}
        </div>
        {/* <label htmlFor="upload">Choose an avatar (optional)</label>

        <input
          className="lightBlue my-4 cursor-pointer bg-transparent text-xs"
          type="file"
          {...register('avatar')}
          accept="image/png, image/jpeg, image/jpg, image/jfif"
        /> */}

        {/* handle errors here */}
        <button className="" type="submit">
          {loading ? (
            <ClipLoader color="#ffffff" size={10} />
          ) : (
            'Create an account'
          )}
        </button>

        {error && typeof error === 'object' && 'data' in error && (
          <p className="min-h-30 my-4 flex justify-center text-xs text-red ">
            {error.data && (error.data as any).message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
