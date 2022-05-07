import { FC } from "react";
import Link from "next/link";
import moment from "moment";
import { Button, Table } from "react-bootstrap";
import { IOrder } from "interfaces/orderUtils.interface";
import IUser from "interfaces/user.interface";

interface IProps {
  data: { orders: IOrder[]; user: IUser; token: boolean };
}

const OrderListScreen: FC<IProps> = ({ data: { token, user, orders } }) => {
  return (
    <>
      {orders && token && user.isAdmin && (
        <>
          <h1>Orders</h1>
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
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      moment(order.deliveredAt).format("DD/MM/YYYY")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
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
        </>
      )}
    </>
  );
};
export default OrderListScreen;
