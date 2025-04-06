import React from "react";

const ActionManageSubscriber = ({ onCancle }) => {
  return (
    <div>
      <div className="w-full">
        <h2 className="text-[40px] font-medium mb-5">
          Manage Subscribers Plans
        </h2>

        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-1">
            <div class="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  for="Subscription Plan"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Subscription Plan
                </label>
                <input
                  type="text"
                  id="Subscription Plan"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Subscription Plan"
                  required
                />
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="Renewal Date"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Renewal Date
                </label>
                <input
                  type="text"
                  id="Renewal Date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Renewal Date"
                  required
                />
              </div>
              <div>
                <label
                  for="Renewal Status"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Renewal Status
                </label>
                <input
                  type="text"
                  id="Renewal Status"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Renewal Status"
                  required
                />
              </div>
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

export default ActionManageSubscriber;
