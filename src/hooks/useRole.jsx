import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (email) {
      axios
        .get(`https://your-server-url.com/users/role/${email}`)
        .then((res) => {
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
