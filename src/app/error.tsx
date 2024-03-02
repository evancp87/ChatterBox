'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/reduxHelpers';
import { selectUser } from '@/store/services/usersSlice';

export default function Error() {
  const user = useAppSelector(selectUser);

  return (
    <div className="">
      <div className="">
        <h2 className="">Error</h2>
        <p className=""> Something went wrong</p>
        <div>
          {/* <Image
            className="mb-4 aspect-[5/5] w-full"
            height="300"
            width="300"
            src="https://reelhub.s3.eu-west-2.amazonaws.com/not-found.jpg"
            alt="not-found"
          /> */}
          {user ? (
            <Link href="/chats/feed">
              <button className="">Return Home</button>
            </Link>
          ) : (
            <Link href="/">
              <button className="">Go to login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
