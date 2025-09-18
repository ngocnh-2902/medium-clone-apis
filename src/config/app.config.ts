import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    title: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    environment: process.env.APP_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3000', 10),
    globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api',
    docsPath: process.env.APP_DOCS_PATH || 'docs',
}));