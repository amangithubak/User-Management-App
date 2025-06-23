import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import AddModels from "./AddModels";
import EditModel from "./EditModel";

const Form = () => {
  const [showModel, SetShowModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    setUsers(users);
    setAllUsers(users);
  }, [showModel, showEditModel, showDeleteModal]);

  // Search filter function
  useEffect(() => {
    if (searchTerm === "") {
      setUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())
        // user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // user.phone.includes(searchTerm)
      );
      setUsers(filtered);
    }
  }, [searchTerm, allUsers]);

  const handleEditClick = (user, index) => {
    setSelectedUser(user);
    setSelectedIndex(index);
    setShowEditModel(true);
  };

  //for edit and save user
  const handleSavedUser = (savedUser, index) => {
    const savedUsers = [...allUsers];
    savedUsers[index] = savedUser;
    setAllUsers(savedUsers);
    setUsers(savedUsers);
    localStorage.setItem("Users", JSON.stringify(savedUsers));
    setShowEditModel(false);
  };

  // Handle delete confirmation
  const handleDeleteClick = (index) => {
    setUserToDelete(index);
    setShowDeleteModal(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (userToDelete !== null) {
      const updatedUsers = allUsers.filter((user, i) => i !== userToDelete);
      setAllUsers(updatedUsers);
      setUsers(updatedUsers);
      localStorage.setItem("Users", JSON.stringify(updatedUsers));
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="bg-[#FBF3FE]">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold text-[#0F7D8C]">Users</h1>
            <div className="flex bg-[#0F7D8C] rounded-md border-2">
              <button
                type="button"
                className=" p-2 text-sm  text-white font-bold"
                onClick={() => SetShowModel(true)}
              >
                Add Users
              </button>
              <MdOutlinePersonAddAlt className="text-2xl mt-1 text-white" />
            </div>
          </div>

          <div className="py-8">
            {showModel && <AddModels onClose={() => SetShowModel(false)} />}
            {showEditModel && (
              <EditModel
                userData={selectedUser}
                onClose={() => setShowEditModel(false)}
                onSave={handleSavedUser}
                index={selectedIndex}
              />
            )}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-[35%] h-44 rounded-lg bg-white">
                  <h2 className="text-xl font-bold p-4">
                    Are you sure you want to delete this{" "}
                    <span className="text-red-600">User</span>
                  </h2>
                  <p className="px-4 text-md font-normal">
                    This action cannot be undone.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-gray-200">
                    <button
                      type="button"
                      className="px-6 py-2 text-sm font-bold text-black bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="relative hidden md:flex">
              <CiSearch className="absolute left-1 text-2xl  items-start top-2" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-[30%] py-2 pl-10 rounded-lg border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sl.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((person, index) => (
                      <tr
                        key={person.Sl}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {person.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              aria-label="Edit"
                              type="button"
                              onClick={() => handleEditClick(person, index)}
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 transition-colors"
                              aria-label="Delete"
                              type="button"
                              onClick={() => handleDeleteClick(index)}
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        {searchTerm
                          ? "No matching users found"
                          : "No users available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
