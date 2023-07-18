import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { authStateChanged } from "../redux/auth/authOperations";

import { NavigationApp } from "./navigation/NavigationApp";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  console.log("перевірка онлайн чи ні", stateChange);

  const routing = NavigationApp(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
