import type { NextApiRequest, NextApiResponse } from "next";

import { ICategory, IResponse } from "@/lib/interface";
import data from "../../lib/mock/data.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<ICategory[]>>,
) {
  res.status(200).json({
    count: data.categories.length,
    next: null,
    previous: null,
    data: data.categories
  });
}
