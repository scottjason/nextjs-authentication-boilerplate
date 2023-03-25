import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ACCESS_TOKEN } from '../../constants';
import { generateToken } from '../../lib/api/jwt';

const prisma = new PrismaClient();

type Response = {
  id: string;
  email: string;
};

const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
};

const cookieOpts: Record<string, string | boolean> = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const salt = bcrypt.genSaltSync(10);
    const user = (await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
      select: userSelect,
    })) as { id: string; email: string };

    const token = await generateToken(user);
    const cookie = serialize(ACCESS_TOKEN, token, cookieOpts);
    res.setHeader('Set-Cookie', cookie);
    res.status(200).send(user);
  } catch (err) {
    console.log('err', err);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
