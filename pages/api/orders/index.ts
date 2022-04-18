import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces";
import { Order, Product } from "../../../models";

type Data = IOrder | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }

  res.status(200).json({ message: "Example" });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  //verificar que tengamos un usuario logueado
  const session: any = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // crear array con los productos seleccionado por el usuario

  const productsIds = orderItems.map(({ _id }) => _id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Product not found");
      }

      return current.quantity * current.price + prev;
    }, 0);

    const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backTotal = subtotal * (tax + 1);

    if (backTotal !== total) {
      throw new Error("Total is not correct");
    }

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, paidAt: false, user: userId });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error: any) {
    console.log("🚀 ~ file: index.ts ~ line 63 ~ createOrder ~ error", error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: error.message || "Revise logs del error" });
  }
};
