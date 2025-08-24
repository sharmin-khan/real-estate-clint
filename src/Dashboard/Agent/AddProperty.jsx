import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  // Image upload handler (imgbb)
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    if (!data.title || !data.location || !data.image[0] || !data.priceMin || !data.priceMax) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }
    setUploading(true);
    try {
      // 1. Image upload
      const imageUrl = await handleImageUpload(data.image[0]);

      // 2. Backend API call
      const propertyData = {
        title: data.title,
        location: data.location,
        image: imageUrl,
        agentName: user?.displayName || user?.name,
        agentEmail: user?.email,
        agentImage: user?.photoURL || "https://i.ibb.co/8j6c9b6/default-user.png",
        priceMin: Number(data.priceMin),
        priceMax: Number(data.priceMax),
        verificationStatus: "pending",
         createdAt: new Date().toISOString()  
      };
      await axios.post("https://reak-estate-server.vercel.app/properties", propertyData);
      Swal.fire("Success", "Property added successfully!", "success");
      reset();
    } catch {
      Swal.fire("Error", "Failed to add property!", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
<div className="min-h-screen flex justify-center items-center">
  <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
      Add Property
    </h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Property Title
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter property title"
          className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Property Location
        </label>
        <input
          type="text"
          {...register("location")}
          placeholder="Enter property location"
          className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Upload */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Property Image
        </label>
        <label
          htmlFor="property-image"
          className="input input-bordered w-full flex items-center cursor-pointer bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <span className="flex-1">
            {watch("image") && watch("image")[0]
              ? watch("image")[0].name
              : "Upload Photo"}
          </span>
          <input
            id="property-image"
            type="file"
            {...register("image")}
            accept="image/*"
            className="hidden"
            required
          />
        </label>
      </div>

      {/* Agent Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Agent Name
        </label>
        <input
          type="text"
          value={user?.displayName || user?.name || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Agent Email */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Agent Email
        </label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Price Range
        </label>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="number"
            {...register("priceMin")}
            placeholder="Min Price"
            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="number"
            {...register("priceMax")}
            placeholder="Max Price"
            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="btn w-full bg-green-500 text-white hover:bg-green-600"
        disabled={uploading}
      >
        {uploading ? "Adding..." : "Add Property"}
      </button>
    </form>
  </div>
</div>


  );
};

export default AddProperty;