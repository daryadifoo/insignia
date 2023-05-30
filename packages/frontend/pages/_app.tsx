import { AppProps } from 'next/app';
import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import './style.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) {
  const getContent = () => {
    // array of all the paths that doesn't need layout
    if ([`/login`].includes(appProps.router.pathname))
      return <Component {...pageProps} />;

    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />

        <button
          onClick={() => signOut()}
          className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Logout
        </button>
      </SessionProvider>
    );
  };

  return getContent();
}

export default CustomApp;
