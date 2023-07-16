import { useSelector } from "react-redux";
import { login } from "../redux/auth/Selectors";

export function useAuth() {
  const selLogin = useSelector(login);

  return {
    selLogin,
  };
}
