import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (email) {
       console.log("Checking role for:", email);
      axios
        .get(`https://reak-estate-server.vercel.app/users/role/${email}`)
        .then((res) => {
           console.log("Role response:", res.data);
          setRole(res.data.role);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Role fetch failed", err);
          setLoading(false);
        });
    }
  }, [email]);

  return [role, loading];
};

export default useRole;
