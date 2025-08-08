import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Wishlist from "../../Dashboard/user/Wishlist";
import Swal from "sweetalert2";


const WishlistPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://reak-estate-server.vercel.app/wishlist/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log("Wishlist fetched for:", user?.email, wishlist);

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`https://reak-estate-server.vercel.app/wishlist/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Removed!", "Property removed from wishlist.", "success");
        queryClient.invalidateQueries(['wishlist', user?.email]);
      } else {
        Swal.fire("Error", "Failed to remove property from wishlist.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to remove property from wishlist.", "error");
      console.error("Failed to remove wishlist item:", error);
    }
  };

  return (
    <Wishlist wishlist={wishlist} onRemove={handleRemove} />
  );
};

export default WishlistPage;
