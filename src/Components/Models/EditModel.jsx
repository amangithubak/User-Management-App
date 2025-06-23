import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditModel = ({ userData, onClose, onSave, index }) => {
  const [isData, setIsData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    state: "",
    city: "",
  });

  // change user data
  useEffect(() => {
    if (userData) {
      setIsData({
        Sl: userData.Sl || "",
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        phone: userData.phone || "",
        state: userData.state || "",
        city: userData.city || "",
      });
    }
  }, [userData]);

  //handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setIsData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  //handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(isData, index);
    onClose();
  };

  //handle form reset
  const handleReset = () => {
    if (userData) {
      setIsData({
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        phone: userData.phone || "",
        state: userData.state || "",
        city: userData.city || "",
      });
    } else {
      setIsData({
        name: "",
        email: "",
        address: "",
        phone: "",
        state: "",
        city: "",
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <form className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Close modal"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Your Name"
                  required
                  value={isData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="user@example.com"
                  required
                  value={isData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Address Field */}
              <div className="md:col-span-1">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="123 Main St, Apt 4B"
                  required
                  value={isData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="+91 (123) 456-7890"
                  required
                  value={isData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  value={isData.state}
                  onChange={handleChange}
                >
                  <option value="">Select your state</option>
                  <option value="BR">Bihar</option>
                  <option value="OD">Odisha</option>
                  <option value="UP">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter city"
                  required
                  value={isData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModel;
