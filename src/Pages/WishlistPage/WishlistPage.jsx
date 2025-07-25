import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Wishlist from "../../Dashboard/user/Wishlist";


const WishlistPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/wishlist/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log("Wishlist fetched for:", user?.email, wishlist);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      queryClient.invalidateQueries(['wishlist', user?.email]); 
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
    }
  };

  return (
    <Wishlist wishlist={wishlist} onRemove={handleRemove} />
  );
};

export default WishlistPage;
