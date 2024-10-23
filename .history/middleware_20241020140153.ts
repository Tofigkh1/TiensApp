import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ['en', 'az'], // Direk array olarak yaz
    defaultLocale: 'en'
});

export const config = {
    matcher: ['/((en|az)|)'], // Daha basit matcher kullan
};