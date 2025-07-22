import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { use } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const AddProperty = () => {
  const { user } =use(AuthContext);

  const { register, handleSubmit, reset } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:3000/properties", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Property Added Successfully!");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = (data) => {
    data.agentName = user?.displayName;
    data.agentEmail = user?.email;
    data.verificationStatus = "pending";
    data.isAdvertised = false;
    mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Property Title" className="input" required />
        <input {...register("location")} placeholder="Location" className="input" required />
        <input {...register("image")} placeholder="Image URL" className="input" required />
        <input value={user?.displayName} readOnly className="input bg-gray-100" />
        <input value={user?.email} readOnly className="input bg-gray-100" />
        <input {...register("priceMin")} type="number" placeholder="Min Price" className="input" required />
        <input {...register("priceMax")} type="number" placeholder="Max Price" className="input" required />
        <button
          type="submit"
          className="btn bg-green-500 text-white hover:bg-green-600 w-full"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
