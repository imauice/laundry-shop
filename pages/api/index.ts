// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  res.status(200).send("welcome to my laundry shop api")
}
