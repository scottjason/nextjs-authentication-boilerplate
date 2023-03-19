import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { SignJWT, type JWTPayload } from 'jose';
import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

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

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour

    const payload: JWTPayload = { _id: user.id, email: user.email };
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const cookie = serialize('x-access-token', token, cookieOpts);
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
