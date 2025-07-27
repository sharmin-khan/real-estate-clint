import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState("");
  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

  // Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axios.get(`https://reak-estate-server.vercel.app/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Form setup
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (property) {
      setValue("title", property.title);
      setValue("location", property.location);
      setValue("priceMin", property.priceMin);
      setValue("priceMax", property.priceMax);
      setValue("agentName", property.agentName);
      setValue("agentEmail", property.agentEmail);
      setImagePreview(property.image);
    }
  }, [property, setValue]);

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

  // Update property mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = property.image;
      if (data.image && data.image[0]) {
        imageUrl = await handleImageUpload(data.image[0]);
      }
      const updated = {
        title: data.title,
        location: data.location,
        priceMin: Number(data.priceMin),
        priceMax: Number(data.priceMax),
        image: imageUrl,
        agentImage: user?.photoURL || property.agentImage || "https://i.ibb.co/8j6c9b6/default-user.png",
      };
      await axios.patch(`https://reak-estate-server.vercel.app/properties/${id}`, updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-properties", user?.email]);
      Swal.fire("Success", "Property updated!", "success");
      navigate("/dashboard/my-properties");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update property!", "error");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form
        onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
        className="space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Property Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}
          <label htmlFor="property-image" className="input input-bordered w-full flex items-center cursor-pointer bg-white text-gray-700">
            <span className="flex-1">{imagePreview ? "Change Photo" : "Upload Photo"}</span>
            <input
              id="property-image"
              type="file"
              {...register("image")}
              accept="image/*"
              className="hidden"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>
        </div>
        <div>
          <label className="block font-semibold mb-1">Property Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Property Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Agent Name</label>
          <input
            type="text"
            {...register("agentName")}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Agent Email</label>
          <input
            type="email"
            {...register("agentEmail")}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Min Price</label>
            <input
              type="number"
              {...register("priceMin", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Max Price</label>
            <input
              type="number"
              {...register("priceMax", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty; 