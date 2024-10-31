import type { NextApiRequest, NextApiResponse } from "next";

import { IProduct, IResponse } from "@/lib/interface";
import data from "../../../lib/mock/data.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<IProduct | null>>,
) {
  const { slug } = req.query;
  let result: IProduct | null = null;
  if (slug) {
    result = data.products.find(product => product.slug === slug) || null;
  }

  return res.status(200).json({data: result});
  
}
