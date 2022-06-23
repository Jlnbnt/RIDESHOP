import axios from "../config/axios";
import { useAuthContext } from "../contexts/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
