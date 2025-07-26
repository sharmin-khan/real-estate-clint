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
        priceMin: Number(data.priceMin),
        priceMax: Number(data.priceMax),
        verificationStatus: "pending"
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
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title")}
          placeholder="Property Title"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          {...register("location")}
          placeholder="Property Location"
          className="input input-bordered w-full"
        />
        <div className="w-full">
          <label htmlFor="property-image" className="input input-bordered w-full flex items-center cursor-pointer bg-white text-gray-700">
            <span className="flex-1">{watch("image") && watch("image")[0] ? watch("image")[0].name : "Upload Photo"}</span>
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
        <input
          type="text"
          value={user?.displayName || user?.name || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="Agent Name"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
          placeholder="Agent Email"
        />
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="number"
            {...register("priceMin")}
            placeholder="Min Price"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("priceMax")}
            placeholder="Max Price"
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;