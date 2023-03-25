import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { SignJWT, type JWTPayload } from 'jose';
import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ACCESS_TOKEN } from '../../constants';

const prisma = new PrismaClient();

type Response = {
  id: string;
  email: string;
};

const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  password: true,
};

const cookieOpts: Record<string, string | boolean> = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | Error>
): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Find user by email, return email and id
    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
      select: userSelect,
    })) as { id: string; email: string; password: string };

    // Account for presence of user
    if (!user) {
      const err = new Error('Internal server error');
      return res.status(404).send(err);
    }

    // Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid Credientials');
      return res.status(401).send(err);
    }

    // Sign the JWT
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour
    const payload: JWTPayload = { _id: user.id, email: user.email };
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Set Header
    const cookie = serialize(ACCESS_TOKEN, token, cookieOpts);
    res.setHeader('Set-Cookie', cookie);

    // Repond to the client
    res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch (_err) {
    const err = new Error('Internal server error');
    return res.status(500).send(err);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
