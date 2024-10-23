import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'az'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/en/:path*', '/az/:path*'], // capturing group kullanılmadan basit matcher
};
