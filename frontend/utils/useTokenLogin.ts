import RequestError from "interfaces/requestError.interface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "reducers/authSlice";
import { tokenLogin, useTokenLoginMutation } from "services/userApi";

export const useTokenLogin = async (token: string) => {
  const [tokenLogin] = useTokenLoginMutation();
  useEffect(() => {
    if (token) {
      tokenLogin({ token });
    }
  }, [token]);
};
