import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";

const MakeOffer = () => {
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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Make an Offer</h2>
      <form onSubmit={e => { e.preventDefault(); handleOffer(); }} className="space-y-4">
        <div>
          <label className="block font-semibold">Property Title</label>
          <input type="text" value={property.title} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Location</label>
          <input type="text" value={property.location} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Agent Name</label>
          <input type="text" value={property.agentName} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Offer Amount</label>
          <input
            type="number"
            value={amount}
            min={property.priceMin}
            max={property.priceMax}
            onChange={e => setAmount(e.target.value)}
            placeholder={`Between $${property.priceMin} and $${property.priceMax}`}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Buying Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Buyer Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Buyer Name</label>
          <input type="text" value={user.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold mt-4"
        >
          Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;