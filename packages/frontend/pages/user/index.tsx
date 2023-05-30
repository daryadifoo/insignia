import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

/* eslint-disable-next-line */
export interface UserProps {}

export function User(props: UserProps) {
  const { data: session, status } = useSession();
  const [usersData, setUsersData] = useState(null);
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const fetchUser = async () => {
    if (session) {
      await axios
        .get('http://localhost:8080/api/users/', {
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

  useEffect(() => {
    fetchUser();
  }, [!session]);

  return (
    <section>
      <div className="container mx-auto my-5">
        <h2 className="text-2xl font-extrabold dark:text-white mb-4">
          User List
        </h2>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData
              ? usersData.map((item) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.id}
                    </th>
                    <td className="px-6 py-4"> {item.email}</td>
                    <td className="px-6 py-4"> {item.name}</td>
                    <td className="px-6 py-4">
                      <a href={`/user/edit/${item.id}`}>Edit</a>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default User;
