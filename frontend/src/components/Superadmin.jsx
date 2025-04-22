import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteUser = async (_id) => {
    const areyasure = window.confirm(
      "Do you want to delete these crendentials"
    );
    if (areyasure) {
      try {
        const del = await axios.delete(`http://localhost:5000/${_id}`);
        if (del.data.message) {
          toast.success("User deleted successfully");
          fetchData();
        }
      } catch (err) {
        toast.error("Error deleting user");
      }
    }
  };

  const handleDeleteAdmin = async (_id) => {
    const areyasure = window.confirm(
      "Do you want to delete these credentials?"
    );
    if (areyasure) {
      try {
        const del = await axios.delete(`http://localhost:5000/admin/${_id}`);
        if (del.data.message) {
          toast.success("Admin deleted successfully");
          fetchAdminData();
        }
      } catch (err) {
        toast.error("Error deleting admin");
      }
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/superadmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
        setError(null);
      } else {
        throw new Error("Expected array of users from API");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/superdetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setAdmins(response.data);
        setError(null);
      } else {
        throw new Error("Expected array of admins from API");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAdminData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mt-[40vh]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Super Admin Panel</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
            >
              Add Admin
            </button>
            <button
              onClick={() => navigate("/addsuper")}
              className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
            >
              Add SuperAdmin
            </button>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Admins</h2>
        {users.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-gray-400 text-lg">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow mb-8">
            <table className="w-full bg-gray-800">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-100">
                      {user.username || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-100">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-400 hover:text-red-500 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          SuperAdmins
        </h2>
        {admins.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-gray-400 text-lg">No admins found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-gray-800">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-100">
                      {admin.username || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-md text-gray-100">
                      {admin.email || "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="text-red-400 hover:text-red-500 transition-colors duration-200"
                      >
                        Delete
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
