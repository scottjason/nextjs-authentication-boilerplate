import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from './utils/middleware/auth';

export async function middleware(req: NextRequest, res: NextResponse) {
  const {
    nextUrl: { origin, pathname },
  } = req;

  const validPaths = ['/', '/dashboard'];
  if (!validPaths.includes(pathname)) {
    return NextResponse.redirect(origin);
  } else {
    return authenticate(req, res);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
