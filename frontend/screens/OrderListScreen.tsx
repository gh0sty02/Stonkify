import Link from "next/link";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "components/Loader";
import Message from "components/Message";
import { deleteUser } from "reducers/asyncActions/userActions";
import { AppState } from "store";
import { setUserSuccessFalse } from "reducers/adminUserSlice";
import moment from "moment";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state: AppState) => state.adminOrderSlice
  );
  const { user: currentUser } = useSelector((state: AppState) => state.user);

  type data = {
    id: string;
    token: string;
  };

  return (
    <>
      {orders && currentUser?.token && currentUser?.isAdmin && (
        <>
          <h1>Orders</h1>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message varient="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        moment(order.paidAt).format("DD/MM/YYYY")
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        moment(order.deliveredAt).format("DD/MM/YYYY")
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link href={`/orders/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};
export default OrderListScreen;
