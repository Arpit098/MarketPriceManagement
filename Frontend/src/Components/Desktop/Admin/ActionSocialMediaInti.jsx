import React from "react";

const ActionSocialMediaInti = ({ onCancle }) => {
  return (
    <div>
      <div className="w-full">
        <h2 className="text-[40px] font-medium mb-5">Add Social Media Post</h2>

        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-1">
            <div>
              <label
                for="Post Title"
                class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Post Title
              </label>
              <input
                type="text"
                id="Post Title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Post Title"
                required
              />
            </div>
            <div>
              <label
                for="Share Link"
                class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Share Link
              </label>
              <input
                type="text"
                id="Share Link"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Share Link"
                required
              />
            </div>
            <div>
              <label
                for="Platform Name"
                class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Platform Name
              </label>
              <input
                type="text"
                id="Platform Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Platform Name"
                required
              />
            </div>
          </div>
        </form>

        <div className="gap-4 py-[15px] flex justify-end w-full">
          <span
            className="border px-[50px] py-[8px] rounded-[4px] text-black cursor-pointer font-semibold text-[12px]"
            onClick={onCancle}
          >
            Cancle
          </span>
          <span
            className="bg-[#047857] px-[50px] py-[8px] rounded-[4px] text-white cursor-pointer font-semibold text-[12px]"
            onClick={onCancle}
          >
            Done
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionSocialMediaInti;
