import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { loginSchema as schema } from '@/validation/schema';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { resetPasswordEmail } from '@/store/services/usersSlice';
import { useAppDispatch } from '@/lib/reduxHelpers';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabaseConfig';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Props = {};
type Inputs = {
  email: string;
  // token: string;
};
export function ResetPasswordEmail({}: Props) {
  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    const event = e!;
    event.preventDefault();
    dispatch(resetPasswordEmail(data));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      email: ''
      // password: ''
    },
    resolver: joiResolver(schema)
  });

  const router = useRouter();
  const [debouncedErrors, setDebouncedErrors] = useState(errors);
  const dispatch = useAppDispatch();
  const watchedValues = watch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedErrors(errors);
    }, 800);

    return () => clearTimeout(timer);
  }, [watchedValues, errors]);

  return (
    <>
      <button onClick={() => router.back()}>Back</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            className=""
            type="email"
            placeholder="Email"
            required
            {...register('email')}
          />
          {errors.email && (
            <p className="absolute right-0 top-0 text-xs text-red md:top-[2.7em]">
              {debouncedErrors.email?.message}
            </p>
          )}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}

export default ResetPasswordEmail;
