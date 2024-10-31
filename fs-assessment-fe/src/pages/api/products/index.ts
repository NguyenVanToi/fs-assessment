import type { NextApiRequest, NextApiResponse } from "next";

import { IProduct, IResponse } from "@/lib/interface";
import data from "../../../lib/mock/data.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<IProduct[]>>,
) {
  const { categories = ''} = req.query;
  const listCategories = (categories as string).split(',');
  let results: IProduct[] = data.products;
  if (categories && listCategories && listCategories.length > 0) {
    results = data.products.filter(product => listCategories.includes(product.categoryId.toString()))
  }

  return res.status(200).json({
    count: results.length,
    data: results
  });
}
