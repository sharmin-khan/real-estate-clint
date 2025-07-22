import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (email) {
      axios
        .get(`https://your-server-url.com/users/role/${email}`)
        .then((res) => {
          setRole(res.data.role);
        })
        .catch((err) => {
          console.error("Role fetch failed", err);
        });
    }
  }, [email]);

  return [role];
};

export default useRole;
