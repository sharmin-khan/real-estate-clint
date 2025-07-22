import axios from "axios";
import { useEffect } from "react";
import { auth } from "../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";


const SaveUserToDB = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.displayName,
        email: user.email,
        role: "user", // Default role "user"
      };

      axios.post("http://localhost:3000/users", userData)
        .then(res => {
          console.log("User saved to DB:", res.data);
        })
        .catch(err => {
          console.error("Failed to save user:", err);
        });
    }
  }, [user]);

  return null;
};

export default SaveUserToDB;
