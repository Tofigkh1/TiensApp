import createMiddleware from 'next-intl/middleware';
import {routing} from './i';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};