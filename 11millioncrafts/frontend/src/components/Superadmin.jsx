import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handledelete = async (_id) => {
    const del = await axios.delete(`http://localhost:5000/${_id}`);
    if (del.data.message) {
      toast.success('User deleted successfully');
      fetchData();
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/superadmin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
        setError(null);
      } else {
        throw new Error('Expected array of users from API');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg font-medium">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen mt-[40vh] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Super Admin Panel</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 w-full sm:w-auto"
            >
              Add Admin
            </button>
            <button
              onClick={() => navigate('/addsuper')}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition-colors duration-200 w-full sm:w-auto"
            >
              Add SuperAdmin
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="hover:bg-gray-50  transition-colors duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      {user.username || 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900">
                      {user.email || 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handledelete(user._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuperAdmin;