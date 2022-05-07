import Link from "next/link";
import React, { FC } from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";

import { IOrder } from "interfaces/orderUtils.interface";

const OrderTable: FC<{ orders: IOrder[] }> = ({ orders }) => {
  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order) => {
            const deliveryDate = order.deliveredAt
              ? new Date(order.deliveredAt)
              : null;
            const deliveredAt = deliveryDate ? (
              deliveryDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            ) : (
              <i className="fas fa-times" style={{ color: "red" }}></i>
            );

            return (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.createdAt?.substring(0, 10)}</td>
                <td>{order?.totalPrice}</td>
                <td>
                  {order?.isPaid ? (
                    moment(order?.paidAt).format("DD-MM-YYYY")
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {deliveredAt ? (
                    deliveredAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link href={`/orders/${order?._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default OrderTable;
