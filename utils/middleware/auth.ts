import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const deleteCookie = (res: NextResponse, key: string) => {
  res.cookies?.set(key, '', { expires: new Date(Date.now()) });
};

export const authenticate = async (req: NextRequest, res: NextResponse) => {
  const {
    nextUrl: { origin, pathname },
  } = req;

  const cookieName = 'x-access-token';
  const isHomePage = pathname === '/';
  const token = req.cookies.get(cookieName)?.value;

  if (token) {
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      if (isHomePage) {
        return NextResponse.redirect(`${origin}/dashboard`);
      } else {
        return NextResponse.next();
      }
    } catch (err) {
      deleteCookie(res, cookieName);
      if (isHomePage) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(origin);
      }
    }
  } else if (isHomePage) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(origin);
  }
};
