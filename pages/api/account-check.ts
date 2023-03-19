import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Data = {
  view: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(200).json({ view: 'create-account' });
    } else {
      res.status(200).json({ view: 'login' });
    }
  } catch (err) {
    console.log('err', err);
  }
}
