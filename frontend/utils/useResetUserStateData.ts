import { useDispatch } from "react-redux";
import { resetCart, resetShippingData } from "reducers/cartSlice";
import { resetOrders } from "reducers/orderSlice";

export const useResetUserStateData = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(resetOrders());
    dispatch(resetCart());
    dispatch(resetShippingData());
  };
};
