import React from "react";

const DeleteModel = () => {
  return (
    <>
      <div>
        <div className="w-[35%] h-44 rounded-lg mx-auto mt-64 bg-gray-500">
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
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModel;
