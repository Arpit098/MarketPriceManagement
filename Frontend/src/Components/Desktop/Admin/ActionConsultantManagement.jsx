import React from "react";

const ActionConsultantManagement = ({ onCancle }) => {
  return (
    <div>
      <div className="w-full">
        <h2 className="text-[40px] font-medium mb-5">Consultant Management</h2>

        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-1">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="Name"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label
                  for="Mobile Number"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="Mobile Number"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="City/Village"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  City/Village
                </label>
                <input
                  type="text"
                  id="City/Village"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City/Village"
                  required
                />
              </div>
              <div>
                <label
                  for="District"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  District
                </label>
                <input
                  type="text"
                  id="District"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="District"
                  required
                />
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="Pin Code"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  id="Pin Code"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pin Code"
                  required
                />
              </div>
              <div>
                <label
                  for="State"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="State"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                  required
                />
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="Taluka"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Taluka
                </label>
                <input
                  type="text"
                  id="Taluka"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Taluka"
                  required
                />
              </div>
              <div>
                <label
                  for="Address"
                  class="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address"
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

export default ActionConsultantManagement;
