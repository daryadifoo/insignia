import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface IndexProps {}

export function Index(props: IndexProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <></>;
  } else if (status === 'unauthenticated') {
    router.push('/login');
  } else {
    router.push('/user');
  }
}

export default Index;
