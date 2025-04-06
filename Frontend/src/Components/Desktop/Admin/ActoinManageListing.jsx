import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../../store/API/ManageListing"; // Import the thunk
import { fetchCategory } from "../../../store/API/Category";
import { fetchAllCities } from "../../../store/API/Cites";
import toast, { Toaster } from "react-hot-toast";

const ActoinManageListing = ({ onCancle }) => {
  const dispatch = useDispatch();

  // Get categories from Redux state
  const { category, status } = useSelector((state) => state.Category);
  const { cities } = useSelector((state) => state.Cities);

  useEffect(() => {
    if(status === "idle"){
      dispatch(fetchAllCities()); // Fetch categories when idle
      dispatch(fetchCategory()); // Fetch categories when idle
    }
  }, [dispatch, status]);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    // price: "",
    // weight: "",
    // in_stock: "",
    // min_rate: "",
    // max_rate: "",
    // traded_quantity: "",
    // last_trading_day_rate: "",
    variety:"",
    // percentage_variation: "",
    // highest_rate: "",
    // lowest_rate: "",
    // price_date: "",
    city_id: "",
    category: "",
    city: "",
  });

  console.log(formData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Category Handel
  const handleCategoryChange = (e) => {
    const selectedCategory = JSON.parse(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      category_id: selectedCategory.category_id,
      category: selectedCategory.category_name, // Store both id and name
    }));
  };

  // city Handel
  const handleCitesChange = (e) => {
    const selectedCity = JSON.parse(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      city_id: selectedCity.city_id,
      city: selectedCity.city_name, // Store both id and name
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(AddProduct(formData))
      .then(() => {
        alert("Product added successfully!");
        toast.success("Product added successfully!");
        onCancle();
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to add product.");
        toast.error("Failed to add product.");
      });
  };

  return (
    <div className="w-full">
      <Toaster />
      <h2 className="text-[40px] font-medium mb-5">Add Listing</h2>

      <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
         {/* Product Name */}
         <div>
           <label
             htmlFor="name"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Product Name
           </label>
           <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Enter Product Name"
             required
           />
         </div>
       
         {/* Category ID */}
         <div>
           <label
             htmlFor="category_id"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Category
           </label>
           <select
             name="category_id"
             onChange={(e) => handleCategoryChange(e)}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
             required
           >
             <option value="" className="dark:bg-gray-700 dark:text-white">
               Select Category
             </option>
             {category?.map((cat) => (
               <option key={cat.category_id} value={JSON.stringify(cat)} className="dark:bg-gray-700 dark:text-white">
                 {cat.category_name}
               </option>
             ))}
           </select>
         </div>
       
         {/* Variety */}
         <div>
           <label
             htmlFor="variety"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Variety
           </label>
           <input
             type="text"
             name="variety"
             value={formData.variety}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Enter Variety"
             required
           />
         </div>
       
         {/* City ID */}
         <div>
           <label
             htmlFor="city_id"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             City
           </label>
           <select
             name="city_id"
             onChange={(e) => handleCitesChange(e)}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 
                        dark:focus:border-blue-500"
             required
           >
             <option value=""  className="dark:bg-gray-700 dark:text-white">
               Select City
             </option>
             {cities?.map((city, index) => (
               <option key={index} value={JSON.stringify(city)} className="dark:bg-gray-700 dark:text-white">
                 {city.city_name}
               </option>
             ))}
           </select>
         </div>
       
         {/* Traded Quantity */}
         {/* <div>
           <label
             htmlFor="traded_quantity"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Traded Quantity
           </label>
           <input
             type="number"
             name="traded_quantity"
             value={formData.traded_quantity}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Enter Traded Quantity"
             required
           />
         </div> */}
       
         {/* Min Rate */}
         {/* <div>
           <label
             htmlFor="min_rate"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Min Rate
           </label>
           <input
             type="number"
             name="min_rate"
             value={formData.min_rate}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Enter Min Rate"
             required
           />
         </div> */}
       
         {/* Max Rate */}
         {/* <div>
           <label
             htmlFor="max_rate"
             className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-gray-800"
           >
             Max Rate
           </label>
           <input
             type="number"
             name="max_rate"
             value={formData.max_rate}
             onChange={handleChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Enter Max Rate"
             required
           />
         </div> */}



            {/* <div>
              <label
                htmlFor="last_trading_day_rate"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Last Trading day Rate
              </label>
              <input
                type="number"
                name="last_trading_day_rate"
                value={formData.last_trading_day_rate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Last Trading Day Rate"
                required
              />
            </div>

            <div>
              <label
                htmlFor="in_stock"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                In stock
              </label>
              <input
                type="number"
                name="in_stock"
                value={formData.in_stock}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="In Stock"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price"
                required
              />
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-4">
            {/* Price */}
            {/* <div>
              <label
                htmlFor="percentage_variation"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                % Variation
              </label>
              <input
                type="number"
                name="percentage_variation"
                value={formData.percentage_variation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter % Variation"
                required
              />
            </div>
            <div>
              <label
                htmlFor="highest_rate"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Highest Rate
              </label>
              <input
                type="number"
                name="highest_rate"
                value={formData.highest_rate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Highest Rate"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lowest_rate"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Lowest Rate
              </label>
              <input
                type="number"
                name="lowest_rate"
                value={formData.lowest_rate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Lowest Rate"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block mb-2 text-[14px] font-semibold text-gray-900 dark:text-white"
              >
                Weight
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="weight"
                required
              />
            </div> */} 
          </div>
       

        {/* Action Buttons */}
        <div className="gap-4 py-[15px] flex justify-end w-full">
          <button
            type="button"
            className="border px-[50px] py-[8px] rounded-[4px] text-black cursor-pointer font-semibold text-[12px]"
            onClick={onCancle}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#047857] px-[50px] py-[8px] rounded-[4px] text-white cursor-pointer font-semibold text-[12px]"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActoinManageListing;
