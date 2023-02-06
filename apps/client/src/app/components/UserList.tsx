import React from "react";
import {useUsers} from "../lib/services/useFetchedData";
import {LoadingSpinner} from "./LoadingSpinner";
import {useLocation, useNavigate} from "react-router-dom";

const Pill: React.FC<{children: React.ReactNode, color: string}> = ({children, color}) => {
//  className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
  return <div
    className={`inline-flex items-center bg-${color}-100 text-${color}-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor"
         aria-hidden="true">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
    </svg>
    {children}
  </div>;
};

export const UserList: React.FC = () => {
  const {result: users, isLoading} = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  return <section className="bg-gray-50 dark:bg-gray-900 p-5 relative">
  <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="px-4 divide-y dark:divide-gray-700">
              <div className="flex flex-col py-3 space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
                  <div className="flex items-center flex-1 space-x-4">
                      <h5>
                          <span className="text-gray-500">All Users:</span>
                        &nbsp;
                          <span className="dark:text-white">{users?.length}</span>
                      </h5>
                      <h5>
                          <span className="text-gray-500"></span>
                          <span className="dark:text-white"></span>
                      </h5>
                  </div>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-4 py-3">User</th>
                          <th scope="col" className="px-4 py-3">User Roles</th>
{/*
                          <th scope="col" className="px-4 py-3 whitespace-nowrap">Last Login</th>
*/}
                      </tr>
                  </thead>
                  <tbody>
                  {users?.map(user => {
                    return <tr key={user.id}
                               className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
                               onClick={() => navigate({pathname: `/user/${user.id}`, search: location.search})}

                    >
                      <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {user.picture ? <img src={user.picture} alt="" className="w-auto h-8 mr-3 rounded-full"/> : null}
                          {user.name || user.email}
                        </div>
                      </th>
                      <td className="px-4 py-2">
                        { user.isAdmin ? <Pill color={'red'}>Admin</Pill> : null}
                        { user.isStudent ? <Pill color={'primary'}>Student</Pill> : null}
                        { user.isTeacher ? <Pill color={'green'}>Teacher</Pill> : null}
                      </td>
{/*
                      <td className="px-4 py-2">20 Nov 2022</td>
*/}
                    </tr>
                  })}
                  </tbody>
              </table>
          </div>
          <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
              <div className="flex items-center space-x-3">
                  <label htmlFor="rows" className="text-xs font-normal text-gray-500 dark:text-gray-400">Rows per page</label><select id="rows" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block py-1.5 pl-3.5 pr-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>
                  <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    &nbsp;
                      of
                    &nbsp;
                      <span className="font-semibold text-gray-900 dark:text-white">100</span>
                  </div>
              </div>
              <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                      <a href="#" className="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                  </li>
                  <li>
                      <a href="#" className="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                  </li>
              </ul>
          </nav>
      </div>
  </div>
    {isLoading ? <LoadingSpinner/> : null}
</section>
};

