import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema as schema } from '@/validation/schema';
import { resetPassword } from '@/store/services/usersSlice';
import { useAppDispatch } from '@/lib/reduxHelpers';
type Props = {};
type Inputs = {
  password: string;
  token: string;
};
export default function ResetPassword({}: Props) {
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    const event = e!;
    event.preventDefault();
    dispatch(resetPassword(data));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      // email: '',
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            className=""
            type="password"
            placeholder="password"
            required
            {...register('password')}
          />
          {errors.password && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.password?.message}
            </p>
          )}
        </div>
        {/* <div className="relative">
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
        </div> */}
      </form>
    </>
  );
}
