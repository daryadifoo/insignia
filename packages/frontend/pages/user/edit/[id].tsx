import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

/* eslint-disable-next-line */
export interface UserProps {}

export function User(props: UserProps) {
  const { data: session, status } = useSession();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
  });
  const [error, setError] = useState('');

  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const { id } = router.query;

  const fetchUser = async () => {
    if (session) {
      await axios
        .get('http://localhost:8080/api/users/' + id, {
          headers: {
            Authorization: 'Bearer ' + session?.user?.token,
          },
        })
        .then(function (response) {
          setUsersData(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response) {
            if (error.response.status === 401) {
              signOut();
            }
          }
        });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        email: formValues.email,
        name: formValues.name,
      };

      if (session) {
        await axios
          .patch('http://localhost:8080/api/users/' + id, data, {
            headers: {
              Authorization: 'Bearer ' + session?.user?.token,
            },
          })
          .then(function (response) {
            setLoading(false);
            setTimeout(function () {
              window.location.replace('/user/edit/' + id);
            }, 200);
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status === 401) {
                signOut();
              }
            }
            setLoading(false);
          });
      }

      // signIn('credentials', {
      //   email: formValues.email,
      //   password: formValues.password,
      //   redirect: false,
      // })
      //   .then((res) => {
      //     if (res?.ok) {
      //       setTimeout(function () {
      //         window.location.replace('/user');
      //       }, 200);
      //     } else {
      //       setError('invalid email or password');
      //     }
      //   })
      //   .catch((err) => {
      //     setError('invalid email or password');
      //   });
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [!session]);

  return (
    <section>
      <div className="container mx-auto my-5">
        <h2 className="text-2xl font-extrabold dark:text-white mb-4">
          Edit User
        </h2>

        <form action="#" onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              defaultValue={usersData ? usersData.email : ''}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              defaultValue={usersData ? usersData.name : ''}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default User;
