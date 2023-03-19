import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

const ACCESS_TOKEN = 'x-access-token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    serialize(ACCESS_TOKEN, '', {
      maxAge: -1,
      path: '/',
    }),
  ]);
  return res.status(200).json({
    success: 'Successfully logged out',
  });
}
