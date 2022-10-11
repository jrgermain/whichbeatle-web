// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Song from "../../../types/song";
import * as SearchService from "../../../services/search";
import { queryToArray } from "../../../utils/query-string";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Song[]>
) {
  const { title, composer, singer, album } = req.query;
  const results = SearchService.findAll({
    album: queryToArray(album),
    composer: queryToArray(composer),
    singer: queryToArray(singer),
    title: queryToArray(title),
  });

  res.status(200).json(results);
}
