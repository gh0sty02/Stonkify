import RequestError from "interfaces/requestError.interface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "reducers/authSlice";
import { useTokenLoginMutation } from "services/userApi";

export const useTokenLogin = async (token: string) => {
  const dispatch = useDispatch();
  const [tokenLogin] = useTokenLoginMutation();

  const user = await tokenLogin({ token });

  if ("data" in user) {
    dispatch(
      setCredentials({
        token,
        user: user.data,
      })
    );
  }
};
