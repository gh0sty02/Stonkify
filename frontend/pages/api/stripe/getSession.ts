import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

interface IItemData {
  name: string;
  amount: number;
  qty: number;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { itemData, orderId }: { itemData: IItemData[]; orderId: string } =
      req.body;
    const itemDetails = itemData.map((i) => ({
      name: i.name,
      currency: "inr",
      amount: Math.floor(i.amount),
      quantity: i.qty,
    }));
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.BASE_URL}/orders/${orderId}?paid=true`,
      cancel_url: `${process.env.BASE_URL}/orders/${orderId}`,
      payment_method_types: ["card"],
      line_items: itemDetails,
      mode: "payment",
    });

    res.json({ session });
  }
};
export default handler;
