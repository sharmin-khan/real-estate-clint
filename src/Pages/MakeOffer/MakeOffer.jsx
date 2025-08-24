import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";

const MakeOffer = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const { propertyId } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [property, setProperty] = useState(null);
  const [role, roleLoading] = useRole(user?.email);

  // Fetch property details
  useEffect(() => {
    axiosSecure.get(`/properties/${propertyId}`).then(res => setProperty(res.data));
  }, [propertyId, axiosSecure]);

  if (!property || roleLoading) return <div><LoadingSpinner/></div>;

  const handleOffer = async () => {
    if (role !== "user") {
      Swal.fire({ icon: "error", title: "Only users can buy property!" });
      return;
    }
    if (!amount || amount < property.priceMin || amount > property.priceMax) {
      Swal.fire({ icon: "error", title: `Offer must be between $${property.priceMin} and $${property.priceMax}` });
      return;
    }
    if (!date) {
      Swal.fire({ icon: "error", title: "Please select a buying date." });
      return;
    }
    const offer = {
      propertyId,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.image, 
      agentName: property.agentName,
      agentEmail: property.agentEmail, 
      offerAmount: Number(amount),
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: date,
      status: "pending"
    };
    try {
      await axiosSecure.post("/offers", offer);
      Swal.fire({ icon: "success", title: "Offer submitted!" });
      setAmount("");
      setDate("");
    } catch {
      Swal.fire({ icon: "error", title: "Failed to submit offer." });
    }
  };

  return (
   <div className="max-w-lg mx-auto p-6 rounded shadow mt-8 bg-white dark:bg-gray-800 transition-colors duration-300">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
    Make an Offer
  </h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleOffer();
    }}
    className="space-y-4"
  >
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Property Title</label>
      <input
        type="text"
        value={property.title}
        readOnly
        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Location</label>
      <input
        type="text"
        value={property.location}
        readOnly
        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Agent Name</label>
      <input
        type="text"
        value={property.agentName}
        readOnly
        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Offer Amount</label>
      <input
        type="number"
        value={amount}
        min={property.priceMin}
        max={property.priceMax}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Between ${property.priceMin}BDT and ${property.priceMax}BDT`}
        className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Buying Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Buyer Email</label>
      <input
        type="email"
        value={user.email}
        readOnly
        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700 dark:text-gray-200">Buyer Name</label>
      <input
        type="text"
        value={user.displayName}
        readOnly
        className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
    <button
      type="submit"
      className="w-full cursor-pointer bg-green-500 dark:bg-green-600 text-white py-2 rounded hover:bg-green-500 dark:hover:bg-green-400 font-semibold mt-4 transition-colors duration-300"
    >
      Offer
    </button>
  </form>
</div>

  );
};

export default MakeOffer;