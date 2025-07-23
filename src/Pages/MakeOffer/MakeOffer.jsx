import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const { propertyId } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [property, setProperty] = useState(null);

  // Fetch property details
  useEffect(() => {
    axiosSecure.get(`/properties/${propertyId}`).then(res => setProperty(res.data));
  }, [propertyId, axiosSecure]);

  if (!property) return <div>Loading...</div>;

  const handleOffer = async () => {
    if (user.role !== "user") {
      Swal.fire("Only users can buy property!");
      return;
    }
    if (amount < property.priceMin || amount > property.priceMax) {
      Swal.fire("Offer must be within price range!");
      return;
    }
    const offer = {
      propertyId,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      offerAmount: amount,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: date,
      status: "pending"
    };
    await axiosSecure.post("/offers", offer);
    Swal.fire("Offer submitted!");
  };

  return (
    <div>
      <h2>Make an Offer</h2>
      <p>Title: {property.title}</p>
      <p>Location: {property.location}</p>
      <p>Agent: {property.agentName}</p>
      <p>Price Range: ${property.priceMin} - ${property.priceMax}</p>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Offer Amount" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <p>Email: {user.email}</p>
      <p>Name: {user.displayName}</p>
      <button onClick={handleOffer}>Offer</button>
    </div>
  );
};

export default MakeOffer;