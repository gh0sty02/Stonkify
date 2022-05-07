import { CURRENCY } from "config";
import { ICartItem, ICartItemDetails } from "interfaces/cart.interface";
import { IOrder } from "interfaces/orderUtils.interface";
import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { formatAmountForStripe } from "utils/stripe-utils";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: "2020-08-27",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const order: IOrder = req.body.order;
    const lineItems: ICartItemDetails[] = order.orderItems;

    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],

        line_items: lineItems.map((item) => ({
          name: item.name,
          amount: formatAmountForStripe(item.price, CURRENCY) * 76,
          currency: CURRENCY,
          quantity: item.qty,
        })),
        success_url: `${req.headers.origin}/orders/${order._id}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/orders/${order._id}`,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
