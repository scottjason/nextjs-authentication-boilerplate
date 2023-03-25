import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from './lib/middleware/auth';

export async function middleware(req: NextRequest, res: NextResponse) {
  return authenticate(req, res);
}

export const config = {
  matcher: ['/', '/dashboard'],
};
