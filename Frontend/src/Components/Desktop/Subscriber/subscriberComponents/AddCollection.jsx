import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../../../store/API/Collection";
import { X, Loader2 } from "lucide-react";

const AddCollection = ({
  addCollectionIsActive,
  setAddCollection,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector(
    (state) => state.GetCollection
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim()
        ? ""
        : "Title is required",
      description: formData.description.trim()
        ? ""
        : "Description is required",
    };

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(addCollection(formData))
      .then((res) => {
        toast.success(
          res.payload || "collection added successfully",
          {
            position: "top-right",
            duration: 3000,
          }
        );

        setFormData({ title: "", description: "" });
        setAddCollection(false);
      })
      .catch((error) =>
        toast.error(
          error.message || "failed to add collection"
        )
      );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  if (!addCollectionIsActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Toaster />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setAddCollection(false)}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Add Collection
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter collection title"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter collection description"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {status === "loading" ? (
            <Loader2
              className="mr-2 animate-spin"
              size={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
