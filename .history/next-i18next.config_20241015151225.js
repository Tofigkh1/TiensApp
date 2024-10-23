const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'az',
        locales: ['en', 'az'],
        localeDetection: true,  
    },
    localePath: path.resolve('./pages/locales'),
}