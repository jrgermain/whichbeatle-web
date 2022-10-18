// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as SearchService from "../../../services/search";
import Song from "../../../types/song";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Song>
) {
  res.status(200).json(SearchService.getRandom());
}
